import styles from './AcceptModal.module.scss';
import Button from './forms/Button';

function AcceptModal({ contract, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Contract Accepted!</h2>
        <p className={styles.contractTitle}>{contract.title}</p>
        <p className={styles.instructions}>
          Present yourself to the Guild Reception on completion of this contract to collect your
          reward of {contract.rewardAmount} Gold.
        </p>
        <div className={styles.actions}>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AcceptModal;
