import styles from './ContractCard.module.scss';
import Button from './forms/Button';

function ContractCard({ contract, onViewDetails, onAccept, onWatch, onUnwatch, isWatched }) {
  const isAvailable = contract.isAvailable;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <img
          src={contract.imageUrl || '/icons.svg'}
          alt={contract.title}
          className={styles.cardImage}
        />
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{contract.title}</h3>
            {isWatched && (
              <Button type="button" onClick={() => onUnwatch(contract._id)}>
                Unwatch
              </Button>
            )}
          </div>
          <p className={styles.cardCategory}>
            {contract.difficulty} / {contract.type}
          </p>
          <span
            className={`${styles.badge} ${isAvailable ? styles.badgeAvailable : styles.badgeUpcoming}`}
          >
            {isAvailable ? 'Available' : 'Upcoming'}
          </span>
          <p className={styles.cardDate}>
            {isAvailable
              ? `Closes: ${new Date(contract.endAt).toLocaleDateString()}`
              : `Opens: ${new Date(contract.startAt).toLocaleDateString()}`}
          </p>
          <p className={styles.cardDate}>Reward: {contract.rewardAmount} Gold</p>
          <div className={styles.cardActions}>
            <Button type="button" onClick={() => onViewDetails(contract._id)}>
              View Details
            </Button>
            {isAvailable ? (
              <Button type="button" onClick={() => onAccept(contract._id)}>
                Accept
              </Button>
            ) : (
              !isWatched && (
                <Button type="button" onClick={() => onWatch(contract._id)}>
                  Watch
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
