function ContractCard({ contract }) {
  const isAvailable = contract.isAvailable;

  return (
    <div className="card">
      <div className="card-image">
        <img src={contract.imageUrl || '/icons.svg'} alt={contract.title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{contract.title}</h3>
        <p className="card-category">{contract.difficulty} / {contract.type}</p>
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-upcoming'}`}>
          {isAvailable ? 'Available' : 'Upcoming'}
        </span>
        <p className="card-date">
          {isAvailable ? `Closes: ${contract.endAt}` : `Opens: ${contract.startAt}`}
        </p>
        <p className="card-reward">Reward: {contract.rewardAmount} Gold</p>
      </div>
    </div>
  );
}

export default ContractCard;