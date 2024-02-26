import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recentChanges, setRecentChanges] = useState([]);

  useEffect(() => {
    const fetchRecentChanges = async () => {
      try {
        const response = await fetch('http://openlibrary.org/recentchanges.json');
        const data = await response.json();
        setRecentChanges(data.slice(0, 10)); // Extraire les 10 premiers résultats
      } catch (error) {
        console.error('Error fetching recent changes:', error);
      }
    };

    fetchRecentChanges();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <h2>Recent Changes</h2>
      <ul>
        {recentChanges.map((change, index) => (
          <li key={index}>
            {/* Affichez les détails de chaque changement */}
            <p>{change.comment}</p>
            <p>Timestamp: {change.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
