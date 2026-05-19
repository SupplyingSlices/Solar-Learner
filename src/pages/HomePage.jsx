import { useNavigate } from 'react-router-dom'
import AppNavigation from '../components/AppNavigation'
import HeroBanner from '../components/HeroBanner'
import TopicGrid from '../components/TopicGrid'
import Footer from '../components/Footer'
import { useProgress } from '../hooks/useProgress'
import topics from '../data/topics.json'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  const { getTopicStatus } = useProgress()

  const completed = topics.filter((t) => getTopicStatus(t.id) === 'complete').length
  const total = topics.length

  return (
    <div className={styles.page}>
      <AppNavigation />
      <HeroBanner
        variant="home"
        title="Solar Energy — Sector Learning Module"
        subtitle="Build the foundational knowledge you need to work confidently on solar advisory and diligence mandates."
        ctaText="Start Learning"
        onCtaClick={() => navigate(`/topics/${topics[0].id}`)}
      />
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Topics</h2>
              <p className={styles.sectionSub}>
                Ten modules covering the physics, products, markets, and economics of solar energy.
              </p>
            </div>
            <div className={styles.progressSummary}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                />
              </div>
              <p className={styles.progressText}>
                {completed} of {total} completed
              </p>
            </div>
          </div>
          <TopicGrid topics={topics} getTopicStatus={getTopicStatus} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
