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

  const handleAccept = () => {
    api
      .post(`/contracts/${id}/accept`)
      .then(() => {
        alert('Contract accepted successfully!');
      })
      .catch(() => {
        alert('Failed to accept contract.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <button type="button" onClick={() => navigate('/contracts')}>
        Back to Contracts
      </button>
      <h1>{contract.title}</h1>
      <p>
        {contract.difficulty} / {contract.type}
      </p>
      <span>{contract.isAvailable ? 'Available' : 'Upcoming'}</span>
      <p>Opens: {new Date(contract.startAt).toLocaleDateString()}</p>
      <p>Closes: {new Date(contract.endAt).toLocaleDateString()}</p>
      <p>Reward: {contract.rewardAmount} Gold</p>
      <p>Places Remaining: {contract.placesRemaining}</p>
      <p>{contract.description}</p>
      {contract.isAvailable ? (
        <button type="button" onClick={handleAccept}>
          Accept
        </button>
      ) : (
        <button type="button" onClick={() => alert('Watch coming soon!')}>
          Watch
        </button>
      )}
    </main>
  );
}

export default ContractDetailsPage;
