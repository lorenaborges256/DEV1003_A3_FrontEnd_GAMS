import { useState, useEffect } from 'react';
import api from '../services/api';

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Contracts</h1>
      <p>Contracts ({contracts.length})</p>
    </main>
  );
}

export default ContractsPage;
