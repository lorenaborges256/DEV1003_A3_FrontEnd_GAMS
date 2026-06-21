import styles from './ItemCard.module.scss';

function ItemCard({ item, onViewDetails, onReserve, onWatch, onUnwatch, isWatched }) {
  const isAvailable = item.stockQuantity > 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <img className={styles.cardImage} src={item.imageUrl || '/icons.svg'} alt={item.name} />
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            {isWatched && (
              <button type="button" onClick={() => onUnwatch(item._id)}>
                Unwatch
              </button>
            )}
          </div>
          <p className={styles.cardCategory}>{item.category}</p>
          <p className={styles.cardPrice}>Price: {item.price} Gold</p>
          <span
            className={`${styles.badge} ${isAvailable ? styles.badgeAvailable : styles.badgeUnavailable}`}
          >
            {isAvailable ? 'Available' : 'Currently Unavailable'}
          </span>
          <div className={styles.cardActions}>
            <button type="button" onClick={() => onViewDetails(item._id)}>
              View Details
            </button>
            {isAvailable ? (
              <button type="button" onClick={() => onReserve(item._id)}>
                Reserve
              </button>
            ) : (
              !isWatched && (
                <button type="button" onClick={() => onWatch(item._id)}>
                  Watch
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
