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
