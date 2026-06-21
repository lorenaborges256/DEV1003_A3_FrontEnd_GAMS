import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './ContractDetailsPage.module.scss';
import Button from '../components/forms/Button';
import AcceptModal from '../components/AcceptModal';

function ContractDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .get(`/contracts/${id}`)
      .then((response) => {
        setContract(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load contract.');
        setLoading(false);
      });
  }, [id]);

  const handleAccept = () => {
    api
      .post(`/contracts/${id}/accept`)
      .then(() => {
        setShowModal(true);
      })
      .catch(() => {
        alert('Failed to accept contract.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.page}>
      {showModal && <AcceptModal contract={contract} onClose={() => setShowModal(false)} />}
      <button type="button" className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className={styles.pageTitle}>Contract Details</h2>
      <div className={styles.card}>
        <img src={contract.imageUrl || ''} alt={contract.title} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h1 className={styles.title}>{contract.title}</h1>
          <p className={styles.meta}>
            {contract.difficulty} / {contract.type}
          </p>
          <span
            className={`${styles.badge} ${contract.isAvailable ? styles.badgeAvailable : styles.badgeUpcoming}`}
          >
            {contract.isAvailable ? 'Available' : 'Upcoming'}
          </span>
          <div className={styles.details}>
            <p>Opens: {new Date(contract.startAt).toLocaleDateString()}</p>
            <p>Closes: {new Date(contract.endAt).toLocaleDateString()}</p>
            <p>Reward: {contract.rewardAmount} Gold</p>
            <p>Places Remaining: {contract.placesRemaining}</p>
          </div>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.description}>{contract.description}</p>
          <div className={styles.actions}>
            {contract.isAvailable ? (
              <Button type="button" onClick={handleAccept}>
                Accept
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

export default ContractDetailsPage;
