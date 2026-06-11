function ItemCard({ item, onViewDetails, onReserve, onWatch }) {
  const isAvailable = item.stockQuantity > 0;

  return (
    <div className="card">
      <div className="card-image">
        <img src={item.imageUrl || '/icons.svg'} alt={item.name} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-category">{item.category}</p>
        <p className="card-price">Price: {item.price} Gold</p>
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
          {isAvailable ? 'Available' : 'Currently Unavailable'}
        </span>
        <div className="card-actions">
          <button type="button" onClick={() => onViewDetails(item._id)}>
            View Details
          </button>
          {isAvailable ? (
            <button type="button" onClick={() => onReserve(item._id)}>
              Reserve
            </button>
          ) : (
            <button type="button" onClick={() => onWatch(item._id)}>
              Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;