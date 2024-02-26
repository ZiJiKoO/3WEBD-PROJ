import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    document.title = "Author Search"; // Mettre à jour le titre de la page  

    const location = useLocation(); // Récupérer la location actuelle
    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = searchParams.get('q'); // Récupérer la valeur du paramètre 'q'

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery || ''); // État pour le terme de recherche
    const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de recherche
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [noResults, setNoResults] = useState(false); // État pour indiquer l'absence de résultats
    const [typingTimeout, setTypingTimeout] = useState(0); // État pour le délai de frappe

    useEffect(() => {
        let timer; // Variable pour stocker le timer

        const fetchData = async () => {
            setLoading(true); // Début du chargement

            try {
                // Effectuer une requête à l'API Open Library avec le terme de recherche 'q'
                const response = await fetch(`https://openlibrary.org/search/authors.json?q=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data.docs); // Mettre à jour les résultats de recherche avec les données reçues
            } catch (error) {
                console.error('Error fetching search results:', error);
            }

            setLoading(false); // Fin du chargement
        };

        // Vérifier si le terme de recherche est présent
        if (searchQuery) {
            setSearchResults([]); // Réinitialiser les résultats de recherche
            setLoading(true); // Début du chargement
            setNoResults(false); // Réinitialiser l'état des résultats

            timer = setTimeout(() => {
                fetchData(); // Effectuer la recherche après le délai de frappe
            }, 2000); // Attendre 2 secondes avant de déclencher la recherche
        }

        return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
    }, [searchQuery]); // Exécuter l'effet lorsque le terme de recherche change

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query); // Mettre à jour le terme de recherche lors de la saisie

        clearTimeout(typingTimeout); // Réinitialiser le délai de frappe
        setTypingTimeout(setTimeout(() => {
            setSearchQuery(query); // Mettre à jour le terme de recherche après le délai de frappe
        }, 2000)); // Attendre 2 secondes avant de déclencher la recherche
    };

    // Rendu du composant
    return (
        <div>
            <h1>Author Search</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by author..."
                />
            </form>
            <h2>Search Results for "{searchQuery}"</h2>
            {loading ? (
                <div>Loading...</div> // Afficher un message de chargement pendant le chargement
            ) : (
                <>
                    {noResults ? (
                        <div>No results found.</div> // Afficher "Aucun résultat trouvé" s'il n'y a pas de résultats
                    ) : (
                        <ul>
                            {searchResults.map((author, index) => (
                                <li key={index}>
                                    <div>Name: {author.name}</div>
                                    {/* Ajoutez d'autres informations que vous souhaitez afficher */}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;

