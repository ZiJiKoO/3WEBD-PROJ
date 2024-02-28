import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/Header.css';
import { FaSearch } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { GrSearchAdvanced } from "react-icons/gr";

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
    <header className="Header-container">
      <div className="Header-row">
        <div className="Header-Title">
          <h1>BibliOnline</h1>
        </div>
        <div className="Header-Nav">
          <nav>
            <ul>
              <li className="Header-li"><Link to="/"><FaHouseUser size="0.9em"/> Homepage</Link></li>
              <li className="Header-li"><Link to="/AdvancedSearch"><GrSearchAdvanced size="0.9em"/> Advanced Search</Link></li>
            </ul>
          </nav>
        </div>
        <div className="Header-Search">
          <form onSubmit={handleSearchSubmit} className="search-form">
          <a type="search-bouton"><FaSearch size="1.2em"/></a>
            <input
              className="searchbar"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for books..."
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
