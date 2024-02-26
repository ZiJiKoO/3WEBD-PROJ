import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/Search.css';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Début du chargement

            try {
                // Effectuer une requête à l'API Open Library avec le terme de recherche 'q'
                const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data.docs); // Mettre à jour les résultats de recherche avec les données reçues

                if (data.docs.length === 0) {
                    setNoResults(true); // Définir aucun résultat trouvé si aucun résultat n'est retourné
                } else {
                    setNoResults(false);
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
    }, [searchQuery]); // Exécuter l'effet lorsque le terme de recherche change

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

    return (
        <div className="search-container">
            <h1>Search Results for "{searchQuery}"</h1>
            {loading ? (
                <div className="loading-message">Loading...</div>
            ) : (
                <>
                    {noResults ? (
                        <div className="no-results-message">No results found.</div>
                    ) : (
                        <>
                            <ul>
                                {displayedResults.map((book, index) => (
                                    <li key={index}>
                                        <div>Title: {book.title}</div>
                                        <div>Author: {book.author_name}</div>
                                        <div>First Published: {book.first_publish_year}</div>
                                        {/* Ajoutez d'autres informations que vous souhaitez afficher */}
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
