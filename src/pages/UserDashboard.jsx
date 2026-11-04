import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ContractCard from '../components/ContractCard';
import api from '../services/api'; // Import your API service
import styles from '../pages/UserDashboard.module.scss';

function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reserved');
  const [reservedItems, setReservedItems] = useState([]);
  const [acceptedContracts, setAcceptedContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleItemDetails = (itemId) => {
    navigate(`/items/${itemId}`, {
      state: { readOnly: true },
    });
  };

  const handleContractDetails = (contractId) => {
    navigate(`/contracts/${contractId}`, {
      state: { readOnly: true },
    });
  };


  // 2. Fetch data from the backend on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // We use Promise.all to fetch both at the same time efficiently
        const [itemsRes, contractsRes] = await Promise.all([
          api.get('/reservations'),
          api.get('/acceptances'),
        ]);

        setReservedItems(itemsRes.data);
        setAcceptedContracts(contractsRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Could not load your dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading your dashboard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Dashboard</h1>
          <p className={styles.subtitle}>Manage your guild activities</p>
        </div>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'reserved' ? styles.active : ''}`}
          onClick={() => setActiveTab('reserved')}
        >
          Reserved Items
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'accepted' ? styles.active : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted Contracts
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'reserved' ? (
          <div className={styles.section}>
            <h2>Reserved Items ({reservedItems.length})</h2>
            {reservedItems.length === 0 ? (
              <p className={styles.empty}>You haven&apos;t reserved any items yet.</p>
            ) : (
              <div className={styles.grid}>
                {reservedItems.map((reservation) => (
                  <ItemCard
                    key={reservation._id}
                    item={reservation.item}
                    onViewDetails={handleItemDetails}
                    showSecondaryAction={false}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.section}>
            <h2>Accepted Contracts ({acceptedContracts.length})</h2>
            {acceptedContracts.length === 0 ? (
              <p className={styles.empty}>You haven&apos;t accepted any contracts yet.</p>
            ) : (
              <div className={styles.grid}>
                {acceptedContracts.map((acceptance) => (
                  <ContractCard
                      key={acceptance._id}
                      contract={acceptance.contract}
                      onViewDetails={handleContractDetails}
                      showSecondaryAction={false}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
