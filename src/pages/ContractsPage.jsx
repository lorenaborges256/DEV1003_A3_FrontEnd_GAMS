import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContractCard from '../components/ContractCard';

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Contracts</h1>
      <div className="filters">
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
      <p>Contracts ({contracts.length})</p>
      <div className="card-grid">
        {contracts.map((contract) => (
          <ContractCard key={contract._id} contract={contract} onViewDetails={handleViewDetails} />
        ))}
      </div>
    </main>
  );
}

export default ContractsPage;
