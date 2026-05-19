import { Link } from 'react-router-dom'
import ProgressBadge from './ProgressBadge'
import styles from './TopicCard.module.css'

export default function TopicCard({ topic, status }) {
  return (
    <Link to={`/topics/${topic.id}`} className={styles.cardLink}>
      <article
        className={`${styles.card} ${status === 'in-progress' ? styles.inProgress : ''} ${
          status === 'complete' ? styles.complete : ''
        }`}
      >
        <div className={styles.header}>
          <span className={styles.icon}>{topic.icon}</span>
          <ProgressBadge status={status} />
        </div>
        <h3 className={styles.title}>{topic.title}</h3>
        <p className={styles.summary}>{topic.summary}</p>
        <div className={styles.meta}>
          <span className={styles.tag}>{topic.tag}</span>
          <span className={styles.level}>{topic.level}</span>
          <span className={styles.time}>⏱ {topic.estimatedMinutes} min</span>
        </div>
        {status === 'complete' && <div className={styles.progressBar} />}
      </article>
    </Link>
  )
}
