import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import styles from './ItemsPage.module.scss';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [watchedIds, setWatchedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get('/items'), api.get('/watchlist')])
      .then(([itemsResponse, watchlistResponse]) => {
        setItems(itemsResponse.data);
        setWatchedIds(
          watchlistResponse.data
            .filter((entry) => entry.targetType === 'Item')
            .map((entry) => entry.targetId)
        );
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load items.');
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/items/${id}`);
  };

  const handleReserve = (id) => {
    api
      .post(`/items/${id}/reserve`)
      .then((response) => {
        setItems((previous) =>
          previous.map((i) => (i._id === id ? { ...i, stockQuantity: i.stockQuantity - 1 } : i))
        );
        alert(`Item reserved! Your reservation number is ${response.data.reservationNumber}.`);
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'Failed to reserve item.');
      });
  };

  const handleWatch = (id) => {
    api
      .post('/watchlist', { targetId: id, targetType: 'Item' })
      .then(() => {
        setWatchedIds((previous) => [...previous, id]);
        alert('Added to watchlist!');
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'Failed to add to watchlist.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const categories = [...new Set(items.map((item) => item.category))].sort();

  const visibleItems = items.filter((item) => {
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (statusFilter === 'available' && item.stockQuantity <= 0) return false;
    if (statusFilter === 'unavailable' && item.stockQuantity > 0) return false;
    if (search && !item.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <main className={styles.page}>
      <h1 className={styles.pageHeader}>Items</h1>
      <div className={styles.filters}>
        <select
          aria-label="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by availability"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Currently Unavailable</option>
        </select>
        <input
          className={styles.search}
          type="search"
          aria-label="Search items"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <p className={styles.count}>Items ({visibleItems.length})</p>
      <div className={styles.cardGrid}>
        {visibleItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            isWatched={watchedIds.includes(item._id)}
            onViewDetails={handleViewDetails}
            onReserve={handleReserve}
            onWatch={handleWatch}
          />
        ))}
      </div>
    </main>
  );
}

export default ItemsPage;
