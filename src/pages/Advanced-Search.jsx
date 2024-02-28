import React, { useEffect, useState } from 'react';

function AdvancedSearch() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
    const [noResults, setNoResults] = useState(false); // Added state for no results message

    const fetchData = async () => {
        try {
            setIsLoading(true); // Set loading state to true
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
                setResults(data.docs);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetching data
        }
    };

    const handleSearch = () => {
        setResults([]); // Clear previous results
        fetchData();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <h1>Advanced Search</h1>
            <label htmlFor="searchTerm">Search Term:</label>
            <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
            {isLoading && <p>Loading...</p>} {/* Display loading indicator if isLoading is true */}
            {noResults && <p>No results found.</p>} {/* Display no results message if noResults is true */}
            <ul>
                {results.map((result) => (
                    <li key={result.key}>
                        <img src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`} alt={result.title} />
                        {result.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdvancedSearch;
