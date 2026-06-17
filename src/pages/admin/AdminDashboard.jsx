import { Link, Outlet, useLocation } from 'react-router-dom';

function AdminDashboard() {
  const location = useLocation();
  const isAdminHome = location.pathname === '/admin';

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
                  <p>51 Total</p>
                  <p>18 Out of Stock</p>
                  <p>Manage Items</p>
                </div>
              </article>
            </Link>
            <Link to="/admin/contracts" className="admin-card-link">
              <article className="admin-summary-card">
                <div className="admin-card-image" aria-hidden="true"></div>
                <div>
                  <h2>Contracts</h2>
                  <p>6 Active</p>
                  <p>2 Opening Soon</p>
                  <p>Manage Contracts</p>
                </div>
              </article>
            </Link>

            <article className="admin-summary-card">
              <div className="admin-card-image" aria-hidden="true"></div>
              <div>
                <h2>Watch Activity</h2>
                <p>14 Watched Items</p>
                <p>7 Watched Contracts</p>
              </div>
            </article>

            <Link to="/admin/users" className="admin-card-link">
              <article className="admin-summary-card">
                <div className="admin-card-image" aria-hidden="true"></div>
                <div>
                  <h2>Guild Members</h2>
                  <p>38 Members</p>
                  <p>3 Admin</p>
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
