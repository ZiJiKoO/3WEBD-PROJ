import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Carousel } from 'react-bootstrap';
import Cherub from '../services/img/Cherub.jpg';
import LappelDeLaForêt from '../services/img/lappel-de-la-foret.jpg';
import UnHivernageDansLesGlaces from '../services/img/Un-hivernage-dans-les-glaces.jpg';
import '../assets/css/Homepage.css';

const HomePage = () => {
  const [recentChanges, setRecentChanges] = useState([]);

  useEffect(() => {
    const fetchRecentChanges = async () => {
      try {
        const response = await fetch('https://openlibrary.org/recentchanges.json');
        const data = await response.json();
        setRecentChanges(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching recent changes:', error);
      }
    };

    fetchRecentChanges();
  }, []);


  const images = [
    { url: Cherub, key: 1 },
    { url: LappelDeLaForêt, key: 2 },
    { url: UnHivernageDansLesGlaces, key: 3 }
  ];

  return (
    <Container className='root-div'>
      <h1 className="my-4 text-center">Welcome to Our Website</h1>
      <br />
      <Carousel>
        {images.map(image => (
          <Carousel.Item key={image.key}>
            <img
              className="d-block mx-auto"
              style={{ width: '400px', height: '600px' }}
              src={image.url}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 className="mb-4 text-center">Recent Changes</h2>
      <ListGroup>
        {recentChanges.map((change, index) => (
          <ListGroup.Item key={index}>
            <p>{change.comment}</p>
            <p>Timestamp: {change.timestamp}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />
    </Container>
  );
};

export default HomePage;
