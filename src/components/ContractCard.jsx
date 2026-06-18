import styles from './ContractCard.module.scss';

function ContractCard({ contract, onViewDetails, onAccept, onWatch, onUnwatch, isWatched }) {
  const isAvailable = contract.isAvailable;

  return (
    <div className={styles.card}>
      <div className="card-image">
        <img src={contract.imageUrl || '/icons.svg'} alt={contract.title} />
      </div>
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{contract.title}</h3>
          {isWatched && (
            <button type="button" onClick={() => onUnwatch(contract._id)}>
              Unwatch
            </button>
          )}
        </div>
        <p className="card-category">
          {contract.difficulty} / {contract.type}
        </p>
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-upcoming'}`}>
          {isAvailable ? 'Available' : 'Upcoming'}
        </span>
        <p className="card-date">
          {isAvailable ? `Closes: ${contract.endAt}` : `Opens: ${contract.startAt}`}
        </p>
        <p className="card-reward">Reward: {contract.rewardAmount} Gold</p>
        <div className="card-actions">
          <button type="button" onClick={() => onViewDetails(contract._id)}>
            View Details
          </button>
          {isAvailable ? (
            <button type="button" onClick={() => onAccept(contract._id)}>
              Accept
            </button>
          ) : (
            !isWatched && (
              <button type="button" onClick={() => onWatch(contract._id)}>
                Watch
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
