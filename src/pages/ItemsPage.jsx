import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const items = [
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
    stockQuantity: 0,
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

function ItemsPage() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Items</h1>

      <div className="dashboard-controls">
        <div className="dashboard-tabs">
          <button type="button" className="dashboard-tab active">
            All Categories
          </button>

          <button type="button" className="dashboard-tab">
            All Status
          </button>
        </div>

        <input className="dashboard-search" type="search" placeholder="Search items..." />
      </div>

      <h2>Items ({items.length})</h2>

      <div className="card-grid">
        {items.map((item) => (
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
    </section>
  );
}

export default ItemsPage;
