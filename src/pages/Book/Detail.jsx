import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundImage from '../../services/img/404-img.jpg';

function SearchResultPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [wikipediaInfo, setWikipediaInfo] = useState(null);
  const [wikiError, setWikiError] = useState(false);

  useEffect(() => {
    document.title = 'Search Results';
  }, []);

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await response.json();
        setBook(data);

        const authorKey = data?.authors?.[0]?.author?.key;
        if (authorKey) {
          const authorResponse = await fetch(`https://openlibrary.org${authorKey}.json`);
          const authorData = await authorResponse.json();
          setAuthor(authorData);
        }
      } catch (error) {
        console.error('Error fetching result details:', error);
      }
    };

    fetchResultDetails();
  }, [id]);

  useEffect(() => {
    const fetchWikipediaInfo = async () => {
      if (book) {
        try {
          const title = book.title.replace(/ /g, '_');
          const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=1&origin=*`);
          const data = await response.json();
          if (data.query.pages['-1']) {
            setWikiError(true);
          } else {
            setWikipediaInfo(data);
          }
        } catch (error) {
          console.error('Error fetching Wikipedia info:', error);
        }
      }
    };

    fetchWikipediaInfo();
  }, [book]);

  if (!book || !author || (!wikipediaInfo && !wikiError)) {
    return <div>Loading...</div>;
  }

  let extract = '';
  if (wikipediaInfo && !wikiError) {
    extract = wikipediaInfo.query.pages[Object.keys(wikipediaInfo.query.pages)[0]].extract;
  }

  const plainTextExtract = extract ? extract.replace(/<\/?[^>]+(>|$)/g, "") : '';

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <img src={book.covers ? `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` : NotFoundImage} alt="Book Cover" style={{ maxWidth: '300px', maxHeight: '400px', margin: '15px' }} />
      </div>
      <div style={{ flex: 2, paddingLeft: '20px' }}>
        <h2>{book.title}</h2>
        <p><strong>Auteur(s):</strong> <a href={`https://en.wikipedia.org/wiki/${author.name}`} target="_blank" rel="noreferrer">{author.name ? author.name : "N/A"}</a></p>
        <p><strong>Informations supplémentaires:</strong> {wikiError ? "Aucun résumé Wikipedia disponible, veuillez nous excuser." : plainTextExtract}</p>
        <p><a href={`https://en.wikipedia.org/wiki/${book.title.replace(/ /g, '_')}`} target="_blank" rel="noreferrer">Voir sur Wikipedia</a></p>
      </div>
    </div>
  );
}

export default SearchResultPage;
