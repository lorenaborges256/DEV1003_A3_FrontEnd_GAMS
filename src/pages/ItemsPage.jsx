import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import styles from './ItemsPage.module.scss';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [watchedIds, setWatchedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get('/items'), api.get('/watchlist')])
      .then(([itemsResponse, watchlistResponse]) => {
        setItems(itemsResponse.data);
        setWatchedIds(
          watchlistResponse.data
            .filter((entry) => entry.targetType === 'Item')
            .map((entry) => entry.targetId)
        );
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load items.');
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/items/${id}`);
  };

  const handleReserve = (id) => {
    api
      .post(`/items/${id}/reserve`)
      .then((response) => {
        setItems((previous) =>
          previous.map((i) => (i._id === id ? { ...i, stockQuantity: i.stockQuantity - 1 } : i))
        );
        alert(`Item reserved! Your reservation number is ${response.data.reservationNumber}.`);
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'Failed to reserve item.');
      });
  };

  const handleWatch = (id) => {
    api
      .post('/watchlist', { targetId: id, targetType: 'Item' })
      .then(() => {
        setWatchedIds((previous) => [...previous, id]);
        alert('Added to watchlist!');
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'Failed to add to watchlist.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.page}>
      <h1 className={styles.pageHeader}>Items</h1>
      <p className={styles.count}>Items ({items.length})</p>
      <div className={styles.cardGrid}>
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            isWatched={watchedIds.includes(item._id)}
            onViewDetails={handleViewDetails}
            onReserve={handleReserve}
            onWatch={handleWatch}
          />
        ))}
      </div>
    </main>
  );
}

export default ItemsPage;
