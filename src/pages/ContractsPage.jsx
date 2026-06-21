import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContractCard from '../components/ContractCard';
import styles from './ContractsPage.module.scss';
import AcceptModal from '../components/AcceptModal';

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(null);

  useEffect(() => {
    const params = {};
    if (typeFilter) params.type = typeFilter;
    if (statusFilter) params.status = statusFilter;

    api
      .get('/contracts', { params })
      .then((response) => {
        setContracts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load contracts.');
        setLoading(false);
      });
  }, [typeFilter, statusFilter]);

  const handleViewDetails = (id) => {
    navigate(`/contracts/${id}`);
  };

  const handleWatch = (id) => {
    api
      .post('/watchlist', { targetId: id, targetType: 'Contract' })
      .then(() => {
        alert('Added to watchlist!');
      })
      .catch(() => {
        alert('Failed to add to watchlist.');
      });
  };

  const handleAccept = (id) => {
    const contract = contracts.find((c) => c._id === id);
    api
      .post(`/contracts/${id}/accept`)
      .then(() => {
        setAcceptedContract(contract);
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
      {showModal && <AcceptModal contract={acceptedContract} onClose={() => setShowModal(false)} />}
      <h1 className={styles.pageHeader}>Contracts</h1>
      <div className={styles.filters}>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Combat">Combat</option>
          <option value="Delivery">Delivery</option>
          <option value="Escort">Escort</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <p className={styles.count}>Contracts ({contracts.length})</p>
      <div className={styles.cardGrid}>
        {contracts.map((contract) => (
          <ContractCard
            key={contract._id}
            contract={contract}
            onViewDetails={handleViewDetails}
            onAccept={handleAccept}
            onWatch={handleWatch}
          />
        ))}
      </div>
    </main>
  );
}

export default ContractsPage;
