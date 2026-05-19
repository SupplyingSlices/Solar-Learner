import styles from './MarkComplete.module.css'

export default function MarkComplete({ quizPassed, alreadyComplete, onComplete }) {
  if (alreadyComplete) {
    return (
      <div className={styles.completedState}>
        <span className={styles.checkIcon}>✓</span>
        <span>Topic Completed</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        disabled={!quizPassed}
        onClick={onComplete}
        title={!quizPassed ? 'Pass the Knowledge Check above to unlock' : undefined}
      >
        Mark as Complete
      </button>
      {!quizPassed && (
        <p className={styles.hint}>Pass the Knowledge Check above to unlock this button.</p>
      )}
    </div>
  )
}
