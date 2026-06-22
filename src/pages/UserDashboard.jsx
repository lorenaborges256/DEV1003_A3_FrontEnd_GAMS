import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ContractCard from '../components/ContractCard';
import api from '../services/api';


function UserDashboard() {
  const [reservedItems, setReservedItems] = useState([]);
  const [acceptedContracts, setAcceptedContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('items');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 4. Fetch the real data from your backend
        const [itemsRes, contractsRes] = await Promise.all([
          api.get('/items/reserved'),
          api.get('/contracts/accepted')
        ]);
        setReservedItems(itemsRes.data);
        setAcceptedContracts(contractsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <h1>Dashboard</h1>

      <div className="dashboard-controls">
        <div className="dashboard-tabs">
          <button
            type="button"
            className={activeSection === 'items' ? 'dashboard-tab active' : 'dashboard-tab'}
            onClick={() => setActiveSection('items')}
          >
            Reserved Items
          </button>

          <button
            type="button"
            className={activeSection === 'contracts' ? 'dashboard-tab active' : 'dashboard-tab'}
            onClick={() => setActiveSection('contracts')}
          >
            Accepted Contracts
          </button>
        </div>

        <input className="dashboard-search" type="search" placeholder="Search items..." />
      </div>

      {activeSection === 'items' && (
        <>
          <h2>Reserved Items ({reservedItems.length})</h2>

          <div className="card-grid">
            {reservedItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onViewDetails={(id) => navigate(`/items/${id}`)}
                onReserve={() => {}}
                onWatch={() => {}}
                onUnwatch={() => {}}
              />
            ))}
          </div>
        </>
      )}

      {activeSection === 'contracts' && (
        <>
          <h2>Accepted Contracts ({acceptedContracts.length})</h2>

          <div className="card-grid">
            {acceptedContracts.map((contract) => (
              <ContractCard
                key={contract._id}
                contract={contract}
                onViewDetails={(id) => navigate(`/contracts/${id}`)}
                onAccept={() => {}}
                onWatch={() => {}}
                onUnwatch={() => {}}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default UserDashboard;