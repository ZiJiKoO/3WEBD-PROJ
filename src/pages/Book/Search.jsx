import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../assets/css/Search.css';
import NotFoundImage from '../../services/img/404-img.jpg';
import '../../assets/css/loading.css';
import BookList from '../../components/BookList';
const Search = () => {
    document.title = "Book Search"; // Mettre à jour le titre de la page

    const location = useLocation(); // Récupérer la location actuelle
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q'); // Récupérer la valeur du paramètre 'q'

    const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de recherche
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [noResults, setNoResults] = useState(false); // État pour indiquer l'absence de résultats
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const resultsPerPage = 30; // Nombre de résultats par page
    const [sortOption, setSortOption] = useState('editions'); // Option de tri par défaut
    const [numFound, setNumFound] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Début du chargement

            try {
                // Effectuer une requête à l'API Open Library avec le terme de recherche 'q' et l'option de tri sélectionnée
                const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&sort=${sortOption}`);
                const data = await response.json();
                setSearchResults(data.docs); // Mettre à jour les résultats de recherche avec les données reçues

                if (data.docs.length === 0) {
                    setNoResults(true); // Définir aucun résultat trouvé si aucun résultat n'est retourné
                } else {
                    setNoResults(false);
                    setNumFound(data.numFound);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }

            setLoading(false); // Fin du chargement
        };

        // Vérifier si le terme de recherche est présent
        if (searchQuery) {
            fetchData(); // Effectuer la recherche si le terme de recherche est présent
        }
    }, [searchQuery, sortOption]); // Exécuter l'effet lorsque le terme de recherche ou l'option de tri changent

    useEffect(() => {
        // Faire défiler l'utilisateur en haut de la page lorsque la page change
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Mettre à jour la page actuelle lors du changement de page
    };

    const handleSortChange = (option) => {
        setSortOption(option); // Mettre à jour l'option de tri lorsqu'elle change
    };

    const totalResults = searchResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Déterminer les résultats à afficher pour la page actuelle
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, totalResults);
    const displayedResults = searchResults.slice(startIndex, endIndex);

    return (
        <div className="search-container">
            <div className="sort-options">
                <label>
                    <input
                        type="radio"
                        name="sortOption"
                        value="editions"
                        checked={sortOption === 'editions'}
                        onChange={() => handleSortChange('editions')}
                    />
                    Editions
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortOption"
                        value="old"
                        checked={sortOption === 'old'}
                        onChange={() => handleSortChange('old')}
                    />
                    Old
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortOption"
                        value="new"
                        checked={sortOption === 'new'}
                        onChange={() => handleSortChange('new')}
                    />
                    New
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortOption"
                        value="rating"
                        checked={sortOption === 'rating'}
                        onChange={() => handleSortChange('rating')}
                    />
                    Rating
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortOption"
                        value="readinglog"
                        checked={sortOption === 'readinglog'}
                        onChange={() => handleSortChange('readinglog')}
                    />
                    Reading Log
                </label>
            </div>
            <BookList loading={loading} noResults={noResults} searchQuery={searchQuery} numFound={numFound} displayedResults={displayedResults} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Search;
