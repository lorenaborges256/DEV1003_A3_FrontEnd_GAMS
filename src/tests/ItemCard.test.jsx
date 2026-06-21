import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '../components/ItemCard';

const mockItem = {
  _id: '1',
  name: 'Iron Sword',
  category: 'Weapons',
  price: 50,
  stockQuantity: 5,
  imageUrl: '/sword.png',
};

test('renders item name, category and price', () => {
  render(
    <ItemCard
      item={mockItem}
      onViewDetails={() => {}}
      onReserve={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Iron Sword')).toBeInTheDocument();
  expect(screen.getByText('Weapons')).toBeInTheDocument();
  expect(screen.getByText('Price: 50 Gold')).toBeInTheDocument();
});

test('shows Available badge when stock is greater than 0', () => {
  render(
    <ItemCard
      item={mockItem}
      onViewDetails={() => {}}
      onReserve={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Available')).toBeInTheDocument();
});
