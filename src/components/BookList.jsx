import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../services/img/404-img.jpg';
import '../assets/css/Search.css';

function BookList({ loading, noResults, searchQuery, numFound, displayedResults, handlePageChange, currentPage, totalPages }) {
    return (
        <>
            {loading ? (
                <div className="loading">Loading&#8230;</div>
            ) : (
                <>
                    {noResults ? (
                        <div className="no-results-message"><center>No results found.</center></div>
                    ) : (
                        <>
                            <h1><center>{numFound} result(s) found</center></h1>
                            <ul className='Result-Book'>
                                {displayedResults.map((book, index) => (
                                    <li className='Result-Book-Unity' key={index}>
                                        <Link to={`/book/${book.key.split("/").pop()}`}>
                                            <img className="Result-Book-Cover" src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : NotFoundImage} alt={book.title} />
                                            <div className='Result-Book-Statistic'>
                                                <div className="title"><strong>{book.title}</strong></div>
                                                <div className="author">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</div>
                                                <div className="published">First Published: {book.first_publish_year}</div>
                                                <div className="rating">Rating: {book.ratings_sortable ? book.ratings_sortable + "/5" : "No rating"}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Pagination */}
                            <div className="pagination"><center>
                                <button onClick={() => handlePageChange(1)}>First Page</button>
                                <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>Previous Page</button>
                                <span> Page {currentPage} of {totalPages} </span>
                                <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>Next Page</button>
                                <button onClick={() => handlePageChange(totalPages)}>Last Page</button></center>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default BookList;
