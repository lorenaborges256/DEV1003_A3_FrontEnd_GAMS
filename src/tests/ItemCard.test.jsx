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

const mockItemUnavailable = {
  ...mockItem,
  stockQuantity: 0,
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

test('shows Currently Unavailable badge when stock is 0', () => {
  render(
    <ItemCard
      item={mockItemUnavailable}
      onViewDetails={() => {}}
      onReserve={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Currently Unavailable')).toBeInTheDocument();
});

test('calls onViewDetails when View Details is clicked', () => {
  const onViewDetails = vi.fn();

  render(
    <ItemCard
      item={mockItem}
      onViewDetails={onViewDetails}
      onReserve={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  fireEvent.click(screen.getByText('View Details'));
  expect(onViewDetails).toHaveBeenCalledWith('1');
});

test('calls onReserve when Reserve is clicked', () => {
  const onReserve = vi.fn();

  render(
    <ItemCard
      item={mockItem}
      onViewDetails={() => {}}
      onReserve={onReserve}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  fireEvent.click(screen.getByText('Reserve'));
  expect(onReserve).toHaveBeenCalledWith('1');
});

test('calls onWatch when Watch is clicked for unavailable item', () => {
  const onWatch = vi.fn();

  render(
    <ItemCard
      item={mockItemUnavailable}
      onViewDetails={() => {}}
      onReserve={() => {}}
      onWatch={onWatch}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  fireEvent.click(screen.getByText('Watch'));
  expect(onWatch).toHaveBeenCalledWith('1');
});

test('calls onUnwatch when Unwatch is clicked', () => {
  const onUnwatch = vi.fn();

  render(
    <ItemCard
      item={mockItemUnavailable}
      onViewDetails={() => {}}
      onReserve={() => {}}
      onWatch={() => {}}
      onUnwatch={onUnwatch}
      isWatched={true}
    />
  );

  fireEvent.click(screen.getByText('Unwatch'));
  expect(onUnwatch).toHaveBeenCalledWith('1');
});
