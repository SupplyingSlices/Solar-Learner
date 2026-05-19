import TopicCard from './TopicCard'
import styles from './TopicGrid.module.css'

export default function TopicGrid({ topics, getTopicStatus }) {
  return (
    <div className={styles.grid}>
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} status={getTopicStatus(topic.id)} />
      ))}
    </div>
  )
}
