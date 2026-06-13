import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ContractDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <button type="button" onClick={() => navigate('/contracts')}>
        Back to Contracts
      </button>
      <h1>{contract.title}</h1>
      <p>{contract.difficulty} / {contract.type}</p>
      <p>{contract.description}</p>
    </main>
  );
}

export default ContractDetailsPage;
