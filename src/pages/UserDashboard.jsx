import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ContractCard from '../components/ContractCard';

const reservedItems = [
  {
    _id: '1',
    name: 'Item Name',
    category: 'Category',
    price: 50,
    stockQuantity: 1,
    imageUrl: '',
  },
  {
    _id: '2',
    name: 'Item Name',
    category: 'Category',
    price: 80,
    stockQuantity: 1,
    imageUrl: '',
  },
  {
    _id: '3',
    name: 'Item Name',
    category: 'Category',
    price: 100,
    stockQuantity: 1,
    imageUrl: '',
  },
];

const acceptedContracts = [
  {
    _id: '1',
    title: 'Contract Title',
    difficulty: 'Difficulty',
    type: 'Type',
    isAvailable: true,
    endAt: '20 Mar',
    rewardAmount: 200,
    imageUrl: '',
  },
  {
    _id: '2',
    title: 'Contract Title',
    difficulty: 'Difficulty',
    type: 'Type',
    isAvailable: true,
    endAt: '25 Mar',
    rewardAmount: 500,
    imageUrl: '',
  },
];

function UserDashboard() {
  const [activeSection, setActiveSection] = useState('items');
  const navigate = useNavigate();

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