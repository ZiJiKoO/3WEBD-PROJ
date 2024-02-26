import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SearchResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Ici, vous pouvez effectuer une requête pour récupérer les détails du résultat de recherche en utilisant l'ID
    // Par exemple, une requête à l'API de l'Open Library pour obtenir les détails du livre
    // Vous pouvez utiliser Axios ou fetch pour effectuer la requête

    // Exemple fictif pour illustrer la récupération des détails du résultat
    const fetchResultDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/api/books/${id}.json`);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching result details:', error);
      }
    };

    fetchResultDetails();
  }, [id]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{result.title}</h2>
      {/* Afficher d'autres détails du résultat */}
    </div>
  );
}

export default SearchResultPage;
