import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load item.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <button type="button" onClick={() => navigate('/items')}>
        Back to Items
      </button>
      <h1>{item.name}</h1>
      <p>{item.category}</p>
      <p>{item.description}</p>
    </main>
  );
}

export default ItemDetailsPage;
