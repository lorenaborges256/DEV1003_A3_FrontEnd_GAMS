import { render, screen, fireEvent } from '@testing-library/react';
import ContractCard from '../components/ContractCard';

const now = new Date();
const yesterday = new Date(now - 86400000).toISOString();
const tomorrow = new Date(now.getTime() + 86400000).toISOString();
const nextWeek = new Date(now.getTime() + 7 * 86400000).toISOString();

const mockContract = {
  _id: '1',
  title: 'Slay the Dragon',
  difficulty: 'Hard',
  type: 'Combat',
  rewardAmount: 200,
  imageUrl: '/dragon.png',
  startAt: yesterday,
  endAt: tomorrow,
  currentAcceptances: 1,
  maxAcceptances: 5,
};

const mockContractUpcoming = {
  ...mockContract,
  startAt: tomorrow,
  endAt: nextWeek,
};

test('renders contract title, difficulty and type', () => {
  render(
    <ContractCard
      contract={mockContract}
      onViewDetails={() => {}}
      onAccept={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Slay the Dragon')).toBeInTheDocument();
  expect(screen.getByText('Hard / Combat')).toBeInTheDocument();
});

test('shows Available badge when contract is active', () => {
  render(
    <ContractCard
      contract={mockContract}
      onViewDetails={() => {}}
      onAccept={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Available')).toBeInTheDocument();
});

test('shows Upcoming badge when contract has not started', () => {
  render(
    <ContractCard
      contract={mockContractUpcoming}
      onViewDetails={() => {}}
      onAccept={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  expect(screen.getByText('Upcoming')).toBeInTheDocument();
});

test('calls onViewDetails when View Details is clicked', () => {
  const onViewDetails = vi.fn();

  render(
    <ContractCard
      contract={mockContract}
      onViewDetails={onViewDetails}
      onAccept={() => {}}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  fireEvent.click(screen.getByText('View Details'));
  expect(onViewDetails).toHaveBeenCalledWith('1');
});

test('calls onAccept when Accept is clicked', () => {
  const onAccept = vi.fn();

  render(
    <ContractCard
      contract={mockContract}
      onViewDetails={() => {}}
      onAccept={onAccept}
      onWatch={() => {}}
      onUnwatch={() => {}}
      isWatched={false}
    />
  );

  fireEvent.click(screen.getByText('Accept'));
  expect(onAccept).toHaveBeenCalledWith('1');
});

test('calls onWatch when Watch is clicked for upcoming contract', () => {
  const onWatch = vi.fn();

  render(
    <ContractCard
      contract={mockContractUpcoming}
      onViewDetails={() => {}}
      onAccept={() => {}}
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
    <ContractCard
      contract={mockContractUpcoming}
      onViewDetails={() => {}}
      onAccept={() => {}}
      onWatch={() => {}}
      onUnwatch={onUnwatch}
      isWatched={true}
    />
  );

  fireEvent.click(screen.getByText('Unwatch'));
  expect(onUnwatch).toHaveBeenCalledWith('1');
});
