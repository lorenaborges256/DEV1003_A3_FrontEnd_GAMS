import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// User pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import ItemsPage from './pages/ItemsPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import ContractsPage from './pages/ContractsPage';
import ContractDetailsPage from './pages/ContractDetailsPage';
import WatchlistPage from './pages/WatchlistPage';
import NotificationsPage from './pages/NotificationsPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminItemsPage from './pages/admin/AdminItemsPage';
import AdminContractsPage from './pages/admin/AdminContractsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* --- Auth routes --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- User routes --- */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contracts/:id" element={<ContractDetailsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* --- Admin routes (nested under /admin with Outlet) --- */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="items" element={<AdminItemsPage />} />
          <Route path="contracts" element={<AdminContractsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

        {/* --- Redirect root to login --- */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
