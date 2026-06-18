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

  const handleReserve = () => {
    api
      .post(`/items/${id}/reserve`)
      .then(() => {
        alert('Item reserved successfully!');
      })
      .catch(() => {
        alert('Failed to reserve item.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const isAvailable = item.stockQuantity > 0;

  return (
    <main>
      <button type="button" onClick={() => navigate('/items')}>
        Back to Items
      </button>
      <h1>{item.name}</h1>
      <p>{item.category}</p>
      <span>{isAvailable ? 'Available' : 'Currently Unavailable'}</span>
      <p>Price: {item.price} Gold</p>
      <p>{item.description}</p>
      {isAvailable ? (
        <button type="button" onClick={handleReserve}>
          Reserve
        </button>
      ) : (
        <button type="button" onClick={() => alert('Watch coming soon!')}>
          Watch
        </button>
      )}
    </main>
  );
}

export default ItemDetailsPage;
