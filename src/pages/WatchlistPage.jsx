import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import ContractCard from '../components/ContractCard';
import styles from './WatchlistPage.module.scss';
import AcceptModal from '../components/AcceptModal';

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(null);

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

  const handleAccept = (id) => {
    const entry = watchlist.find((e) => e._id === id || e.targetId._id === id);
    api
      .post(`/contracts/${id}/accept`)
      .then(() => {
        setAcceptedContract(entry.targetId);
        setShowModal(true);
      })
      .catch(() => {
        alert('Failed to accept contract.');
      });
  };

  useEffect(() => {
    api
      .get('/watchlist')
      .then(async (response) => {
        const entries = response.data;

        const populated = await Promise.all(
          entries.map(async (entry) => {
            const endpoint =
              entry.targetType === 'Item'
                ? `/items/${entry.targetId}`
                : `/contracts/${entry.targetId}`;
            const targetResponse = await api.get(endpoint);
            return { ...entry, targetId: targetResponse.data };
          })
        );

        setWatchlist(populated);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load watchlist.');
        setLoading(false);
      });
  }, []);

  const watchedItems = watchlist.filter((entry) => entry.targetType === 'Item');
  const watchedContracts = watchlist.filter((entry) => entry.targetType === 'Contract');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.page}>
      {showModal && <AcceptModal contract={acceptedContract} onClose={() => setShowModal(false)} />}
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
                onAccept={handleAccept}
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
