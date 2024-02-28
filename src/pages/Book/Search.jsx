import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../assets/css/Search.css';
import NotFoundImage from '../../services/img/404-img.jpg';

const Search = () => {
    document.title = "Book Search"; // Mettre à jour le titre de la page

    const location = useLocation(); // Récupérer la location actuelle
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q'); // Récupérer la valeur du paramètre 'q'

    const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de recherche
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [noResults, setNoResults] = useState(false); // État pour indiquer l'absence de résultats
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const [resultsPerPage] = useState(10); // Nombre de résultats par page
    const [displayedResults, setDisplayedResults] = useState([]); // Résultats affichés actuellement
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
        // Calculer l'indice de début et de fin pour les résultats à afficher en fonction de la page actuelle
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        // Extraire les résultats à afficher à partir des résultats complets en fonction de l'indice de début et de fin
        const displayedResults = searchResults.slice(startIndex, endIndex);
        setDisplayedResults(displayedResults); // Mettre à jour les résultats affichés
        window.scrollTo(0, 0); // Faire défiler l'utilisateur en haut de la page
    }, [currentPage, searchResults, resultsPerPage]); // Exécuter l'effet lorsque la page actuelle ou les résultats complets changent

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Mettre à jour la page actuelle lors du changement de page
    };

    const handleSortChange = (option) => {
        setSortOption(option); // Mettre à jour l'option de tri lorsqu'elle change
    };

    return (
        <div className="search-container">
            <h1>Search Results for "{searchQuery}". {numFound} result(s) found</h1>
            {/* Cases à cocher pour choisir les options de tri */}
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
                {/* Ajoutez les autres options de tri ici */}
            </div>
            {loading ? (
                <>
                    <div className="loading-message">Loading...</div>
                </>
            ) : (
                <>
                    {noResults ? (
                        <div className="no-results-message">No results found.</div>
                    ) : (
                        <>
                            <ul>
                                {displayedResults.map((book, index) => (
                                    <li key={index}>
                                        <Link to={`/book/${book.key.split("/").pop()}`}>
                                        <img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : NotFoundImage} alt={book.title} />
                                            <div>
                                                <div className="title">Title: {book.title}</div>
                                                <div className="author">Author: {book.author_name}</div>
                                                <div className="published">First Published: {book.first_publish_year}</div>                             
                                                <div className="rating">Rating: {book.ratings_sortable ? book.ratings_sortable+"/5" : "No rating"}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Pagination */}
                            <div className="pagination">
                                {[...Array(Math.ceil(searchResults.length / resultsPerPage)).keys()].map((pageNumber) => (
                                    <button key={pageNumber + 1} onClick={() => handlePageChange(pageNumber + 1)}>
                                        {pageNumber + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;