import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header-container">
      <h1>Book Search</h1>
      <nav>
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/search">Book</Link></li>
          <li><Link to="/author">Author</Link></li>
        </ul>
      </nav>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
