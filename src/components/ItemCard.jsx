import styles from './ItemCard.module.scss';
import Button from './forms/Button';

function ItemCard({
  item,
  onViewDetails,
  onReserve,
  onWatch,
  onUnwatch,
  isWatched,
  showSecondaryAction = true,
}) {
  const isAvailable = item.stockQuantity > 0;

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <img
          className={styles.cardImage}
          src={item.imageUrl || '/icons.svg'}
          alt={item.name}
        />

        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{item.name}</h3>

            {showSecondaryAction && isWatched && (
              <Button type="button" onClick={() => onUnwatch(item._id)}>
                Unwatch
              </Button>
            )}
          </div>

          <p className={styles.cardCategory}>{item.category}</p>
          <p className={styles.cardPrice}>Price: {item.price} Gold</p>

          <span
            className={`${styles.badge} ${
              isAvailable ? styles.badgeAvailable : styles.badgeUnavailable
            }`}
          >
            {isAvailable ? 'Available' : 'Currently Unavailable'}
          </span>

          <div className={styles.cardActions}>
            <Button type="button" onClick={() => onViewDetails(item._id)}>
              View Details
            </Button>

            {showSecondaryAction &&
              (isAvailable ? (
                <Button type="button" onClick={() => onReserve(item._id)}>
                  Reserve
                </Button>
              ) : (
                !isWatched && (
                  <Button type="button" onClick={() => onWatch(item._id)}>
                    Watch
                  </Button>
                )
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;