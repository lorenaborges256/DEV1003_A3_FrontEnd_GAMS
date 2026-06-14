import { useState, useEffect } from 'react';
import api from '../services/api';

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (watchlist.length === 0) {
    return (
      <main>
        <h1>Watchlist</h1>
        <p>You are not watching any items or contracts.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Watchlist</h1>
      <p>Watching ({watchlist.length})</p>
    </main>
  );
}

export default WatchlistPage;
