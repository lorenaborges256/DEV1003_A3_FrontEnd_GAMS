import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';

function AdminDashboard() {
  const location = useLocation();
  const isAdminHome = location.pathname === '/admin';
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [watchStats, setWatchStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdminHome) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/admin/users');
        setUsers(response.data.users);
        const itemsResponse = await api.get('/items');
        setItems(itemsResponse.data);
        const contractsResponse = await api.get('/contracts');
        setContracts(contractsResponse.data);

        const watchResponse = await api.get('/admin/watch-stats');
        setWatchStats(watchResponse.data);
      } catch (err) {
        console.error('Failed to load users:', err);
        setError('Unable to load member data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdminHome]);


  return (
    <>
      {isAdminHome && (
        <section>
          <h1>Admin Dashboard</h1>

          <div className="admin-dashboard-grid">
            <Link to="/admin/items" className="admin-card-link">
              <article className="admin-summary-card">
                <div className="admin-card-image" aria-hidden="true"></div>
                <div>
                  
<h2>Items</h2>
{loading ? (
  <p>Loading items...</p>
) : error ? (
  <p>{error}</p>
) : (
  <>
    <p>{items.length} Total</p>
    <p>{items.filter((item) => item.stockQuantity === 0).length} Out of Stock</p>
  </>
)}
<p>Manage Items</p>

                </div>
              </article>
            </Link>
            <Link to="/admin/contracts" className="admin-card-link">
              <article className="admin-summary-card">
                <div className="admin-card-image" aria-hidden="true"></div>
                <div>
                  
<h2>Contracts</h2>
{loading ? (
  <p>Loading contracts...</p>
) : error ? (
  <p>{error}</p>
) : (
  <>
    <p>
      {contracts.filter((contract) => {
        const now = new Date();
        return (
          new Date(contract.startAt) <= now &&
          new Date(contract.endAt) >= now &&
          contract.currentAcceptances < contract.maxAcceptances
        );
      }).length} Active
    </p>
    <p>
      {contracts.filter(
        (contract) => new Date(contract.startAt) > new Date()
      ).length} Opening Soon
    </p>
  </>
)}
<p>Manage Contracts</p>

                </div>
              </article>
            </Link>

            <article className="admin-summary-card">
              <div className="admin-card-image" aria-hidden="true"></div>
              <div>
                
<h2>Watch Activity</h2>
{loading ? (
  <p>Loading watch activity...</p>
) : error ? (
  <p>{error}</p>
) : watchStats ? (
  <>
    <p>{watchStats.watchedItems} Watched Items</p>
    <p>{watchStats.watchedContracts} Watched Contracts</p>
  </>
) : (
  <p>Watch activity unavailable.</p>
)}

              </div>
            </article>

            <Link to="/admin/users" className="admin-card-link">
              <article className="admin-summary-card">
                <div className="admin-card-image" aria-hidden="true"></div>
                <div>
                  
<h2>Guild Members</h2>
{loading ? (
  <p>Loading members...</p>
) : error ? (
  <p>{error}</p>
) : (
  <>
    <p>{users.length} Members</p>
    <p>{users.filter((user) => user.role === 'admin').length} Admin</p>
  </>
)}
<p>View Members</p>

                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      <Outlet />
    </>
  );
}

export default AdminDashboard;
