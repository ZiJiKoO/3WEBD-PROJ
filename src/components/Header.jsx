import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/Header.css';
import { FaSearch } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { GrSearchAdvanced } from "react-icons/gr";

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    checkScreenWidth();

    const handleResize = () => {
      checkScreenWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          {!isMobile ? (
            <h1><Link to="/">BibliOnline</Link></h1>
          ) : (
            <h1><Link to="/">BIBLI</Link></h1>
          )}
        </div>
        <div className="Header-Nav">
          <nav>
            <ul>
              {!isMobile && (
                <li className="Header-li">
                  <Link to="/"><FaHouseUser size="0.9em"/> Homepage</Link>
                </li>
              )}
              <li className="Header-li">
                <Link to="/AdvancedSearch">
                  {!isMobile ? <GrSearchAdvanced size="0.9em"/> : <GrSearchAdvanced size="1.2em"/>}  {!isMobile ? "Advanced Search" : "AS"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="Header-Search">
          <form onSubmit={handleSearchSubmit} className="search-form">
              <a type="search-bouton"><FaSearch size="1.2em"/></a>
            {!isMobile ? (
            <input
              className="searchbar"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for books..."/>
              ) : (
                <input
                className='searchbar-mobile'
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for books..."/>
              )}
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
