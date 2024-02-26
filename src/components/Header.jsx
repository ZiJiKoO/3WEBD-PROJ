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
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <h1>Book Search</h1>
          </div>
          <div className="col-lg-9 col-md-6 col-sm-12">
            <nav>
              <ul>
                <li><Link to="/">Homepage</Link></li>
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
