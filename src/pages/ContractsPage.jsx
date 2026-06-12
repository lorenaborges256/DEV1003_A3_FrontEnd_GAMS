import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContractCard from '../components/ContractCard';

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/contracts')
      .then((response) => {
        setContracts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load contracts.');
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/contracts/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Contracts</h1>
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
