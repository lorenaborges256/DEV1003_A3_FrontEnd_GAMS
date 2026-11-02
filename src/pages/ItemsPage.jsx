import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import styles from './ItemsPage.module.scss';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/items')
      .then((response) => {
        setItems(response.data);
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
            onViewDetails={handleViewDetails}
            onReserve={() => {}}
            onWatch={() => {}}
          />
        ))}
      </div>
    </main>
  );
}

export default ItemsPage;
