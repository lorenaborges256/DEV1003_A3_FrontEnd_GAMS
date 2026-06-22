import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './ItemDetailsPage.module.scss';
import Button from '../components/forms/Button';

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
    <main className={styles.page}>
      <button type="button" className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className={styles.pageTitle}>Item Details</h2>
      <div className={styles.card}>
        <img src={item.imageUrl || ''} alt={item.name} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.category}>{item.category}</p>
          <p className={styles.price}>Price: {item.price} Gold</p>
          <span
            className={`${styles.badge} ${isAvailable ? styles.badgeAvailable : styles.badgeUnavailable}`}
          >
            {isAvailable ? 'Available' : 'Currently Unavailable'}
          </span>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.actions}>
            {isAvailable ? (
              <Button type="button" onClick={handleReserve}>
                Reserve
              </Button>
            ) : (
              <Button type="button" onClick={() => alert('Watch coming soon!')}>
                Watch
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemDetailsPage;
