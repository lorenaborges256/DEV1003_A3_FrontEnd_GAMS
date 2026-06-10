import { Outlet } from 'react-router-dom';

function AdminDashboard( ) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Child admin routes render here */}
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
