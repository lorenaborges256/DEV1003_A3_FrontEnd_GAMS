import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import ContractCard from '../components/ContractCard';
import styles from './WatchlistPage.module.scss';

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/watchlist')
      .then((response) => {
        setWatchlist(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load watchlist.');
        setLoading(false);
      });
  }, []);

  const handleUnwatch = (id) => {
    api.delete(`/watchlist/${id}`).then(() => {
      setWatchlist((previous) => previous.filter((entry) => entry._id !== id));
    });
  };

  const watchedItems = watchlist.filter((entry) => entry.targetType === 'Item');
  const watchedContracts = watchlist.filter((entry) => entry.targetType === 'Contract');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Watchlist</h1>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Items watching ({watchedItems.length})</h2>
        {watchedItems.length === 0 ? (
          <p className={styles.empty}>You are not watching any items.</p>
        ) : (
          <div className={styles.cardGrid}>
            {watchedItems.map((entry) => (
              <ItemCard
                key={entry._id}
                item={entry.targetId}
                isWatched
                onUnwatch={() => handleUnwatch(entry._id)}
                onViewDetails={(id) => navigate(`/items/${id}`)}
              />
            ))}
          </div>
        )}
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contracts watching ({watchedContracts.length})</h2>
        {watchedContracts.length === 0 ? (
          <p className={styles.empty}>You are not watching any contracts.</p>
        ) : (
          <div className={styles.cardGrid}>
            {watchedContracts.map((entry) => (
              <ContractCard
                key={entry._id}
                contract={entry.targetId}
                isWatched
                onUnwatch={() => handleUnwatch(entry._id)}
                onViewDetails={(id) => navigate(`/contracts/${id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default WatchlistPage;
