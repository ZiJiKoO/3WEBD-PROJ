import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import '../assets/css/AdvancedSearch.css';

function AdvancedSearch() {
    const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de recherche
    const [searchTerm, setSearchTerm] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const resultsPerPage = 30; // Nombre de résultats par page
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false); // Added state for loading indicator
    const [noResults, setNoResults] = useState(false); // Added state for no results message
    const [numFound, setNumFound] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle

    const fetchData = async () => {
        try {
            setLoading(true); // Set loading state to true
            setNoResults(false); // Reset no results message
            let url = 'https://openlibrary.org/search.json?';
            if (searchTerm) {
                url += `q=${searchTerm}&`;
            }
            if (author) {
                url += `author=${author}&`;
            }
            if (title) {
                url += `title=${title}&`;
            }
            if (subject) {
                url += `subject=${subject}&`;
            }
            const response = await fetch(url);
            const data = await response.json();
            if (data.numFound === 0) {
                setNoResults(true); // Set no results message to true if no results found
            } else {
                setSearchResults(data.docs);
                setNumFound(data.numFound);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading state to false after fetching data
        }
    };

    const handleSearch = () => {
        setSearchResults([]); // Clear previous results
        fetchData();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        // Faire défiler l'utilisateur en haut de la page lorsque la page change
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Mettre à jour la page actuelle lors du changement de page
    };


    const totalResults = searchResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Déterminer les résultats à afficher pour la page actuelle
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, totalResults);
    const displayedResults = searchResults.slice(startIndex, endIndex);
    return (
        <div className='search-container'><center>
            <h1>Advanced Search</h1>
            <div className='form-group'>
            <div className='form-input'>
                <label htmlFor="searchTerm">Search Term</label>
                <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            /></div>
            <div className='form-input'>
                <label htmlFor="author">Author</label>
                <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                onKeyPress={handleKeyPress}
            /></div>
            <div className='form-input'>
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
            /></div>
            <div className='form-input'>
                <label htmlFor="subject">Subject</label>
                <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyPress={handleKeyPress}
            /></div>
            <div className='form-input'>
                <button onClick={handleSearch}>Search</button>
            </div>
            </div>
            {loading}
            {noResults}
            <BookList loading={loading} noResults={noResults} searchQuery={searchTerm} numFound={numFound} displayedResults={displayedResults} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />

            </center></div>
    );
}

export default AdvancedSearch;
