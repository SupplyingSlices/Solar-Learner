import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppNavigation from '../components/AppNavigation'
import HeroBanner from '../components/HeroBanner'
import KeyTakeaways from '../components/KeyTakeaways'
import LessonSections from '../components/LessonSections'
import WhyItMatters from '../components/WhyItMatters'
import GlossaryTerms from '../components/GlossaryTerms'
import QuizModule from '../components/QuizModule'
import MarkComplete from '../components/MarkComplete'
import ComparisonTable from '../components/ComparisonTable'
import ProcessTimeline from '../components/ProcessTimeline'
import PNJunctionDiagram from '../components/diagrams/PNJunctionDiagram'
import SystemArchitectureDiagram from '../components/diagrams/SystemArchitectureDiagram'
import HomeSystemDiagram from '../components/diagrams/HomeSystemDiagram'
import PanelTypesDiagram from '../components/diagrams/PanelTypesDiagram'
import BTMFTMDiagram from '../components/diagrams/BTMFTMDiagram'
import DemandChargeDiagram from '../components/diagrams/DemandChargeDiagram'
import CommunitySolarDiagram from '../components/diagrams/CommunitySolarDiagram'
import SupplyChainDiagram from '../components/diagrams/SupplyChainDiagram'
import ChinaShareChart from '../components/diagrams/ChinaShareChart'
import USInstallationsPieChart from '../components/diagrams/USInstallationsPieChart'
import IncentiveValueChart from '../components/diagrams/IncentiveValueChart'

const SECTION_DIAGRAMS = {
  'btm-ftm': BTMFTMDiagram,
  'demand-charge': DemandChargeDiagram,
  'community-solar-flow': CommunitySolarDiagram,
  'supply-chain': SupplyChainDiagram,
  'china-share': ChinaShareChart,
  'us-installations-pie': USInstallationsPieChart,
  'incentive-value': IncentiveValueChart,
}
import Footer from '../components/Footer'
import { useProgress } from '../hooks/useProgress'
import topics from '../data/topics.json'
import styles from './TopicPage.module.css'

function TopicDiagram({ topic }) {
  if (topic.diagramImage) {
    return (
      <div className={styles.diagramImageWrapper}>
        {topic.diagramImage.title && <h2 className={styles.diagramImageTitle}>{topic.diagramImage.title}</h2>}
        <img
          src={topic.diagramImage.url}
          alt={topic.diagramImage.title || ''}
          className={styles.diagramImage}
        />
        {topic.diagramImage.caption && (
          <p className={styles.diagramCaption}>{topic.diagramImage.caption}</p>
        )}
      </div>
    )
  }
  const id = topic.diagram
  if (id === 'pn-junction') return <PNJunctionDiagram />
  if (id === 'system-architecture') return <SystemArchitectureDiagram />
  if (id === 'home-system-diagram') return <HomeSystemDiagram />
  if (id === 'panel-types-diagram') return <PanelTypesDiagram />
  return null
}

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = topics.find((t) => t.id === topicId)
  const { progress, markVisited, recordQuizResult, markComplete } = useProgress()

  useEffect(() => {
    if (topic) markVisited(topic.id)
  }, [topic, markVisited])

  if (!topic) {
    return (
      <div className={styles.notFound}>
        <AppNavigation />
        <div className={styles.notFoundContent}>
          <h1>Topic not found</h1>
          <Link to="/" className={styles.backLink}>← Back to Topics</Link>
        </div>
      </div>
    )
  }

  const topicIndex = topics.findIndex((t) => t.id === topicId)
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null

  const topicProgress = progress[topic.id] || {}
  const quizPassed = topicProgress.quizPassed || false
  const alreadyComplete = topicProgress.complete || false

  const handleQuizPass = (score, total, passed) => {
    recordQuizResult(topic.id, score, total, passed)
    if (passed) {
      markComplete(topic.id)
    }
  }

  const handleMarkComplete = () => {
    markComplete(topic.id)
  }

  return (
    <div className={styles.page}>
      <AppNavigation />
      <HeroBanner
        variant="topic"
        breadcrumb={`Coverage › Solar › ${topic.tag}`}
        title={topic.title}
      />

      <main className={styles.main}>
        <div className={styles.inner}>

          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{topic.title}</span>
          </nav>

          <div className={styles.metaRow}>
            <span className={styles.tag}>{topic.tag}</span>
            <span className={styles.level}>{topic.level}</span>
            <span className={styles.time}>⏱ {topic.estimatedMinutes} min read</span>
          </div>

          <div className={styles.content}>
            <KeyTakeaways items={topic.keyTakeaways} />

            {(topic.diagram || topic.diagramImage) && <TopicDiagram topic={topic} />}

            <LessonSections sections={topic.sections} diagramComponents={SECTION_DIAGRAMS} />

            {topic.comparison && <ComparisonTable comparison={topic.comparison} />}

            {topic.timeline && <ProcessTimeline timeline={topic.timeline} />}

            <WhyItMatters text={topic.whyItMatters} />
            <GlossaryTerms terms={topic.terms} />
            <QuizModule
              questions={topic.quiz}
              onPass={handleQuizPass}
              alreadyPassed={quizPassed}
              initialScore={topicProgress.quizScore}
            />
            <MarkComplete
              quizPassed={quizPassed}
              alreadyComplete={alreadyComplete}
              onComplete={handleMarkComplete}
            />
          </div>

          <nav className={styles.topicNav} aria-label="Topic navigation">
            <div className={styles.topicNavPrev}>
              {prevTopic && (
                <Link to={`/topics/${prevTopic.id}`} className={styles.topicNavLink}>
                  <span className={styles.topicNavDir}>← Previous</span>
                  <span className={styles.topicNavTitle}>{prevTopic.title}</span>
                </Link>
              )}
            </div>
            <Link to="/" className={styles.topicNavHome}>All Topics</Link>
            <div className={styles.topicNavNext}>
              {nextTopic && (
                <Link to={`/topics/${nextTopic.id}`} className={styles.topicNavLink}>
                  <span className={styles.topicNavDir}>Next →</span>
                  <span className={styles.topicNavTitle}>{nextTopic.title}</span>
                </Link>
              )}
            </div>
          </nav>

        </div>
      </main>
      <Footer />
    </div>
  )
}
