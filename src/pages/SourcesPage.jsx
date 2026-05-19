import AppNavigation from '../components/AppNavigation'
import Footer from '../components/Footer'
import sources from '../data/sources.json'
import topics from '../data/topics.json'
import styles from './SourcesPage.module.css'

const topicOrder = ['general', ...topics.map((t) => t.id)]

const sorted = [...sources].sort(
  (a, b) => topicOrder.indexOf(a.topicId) - topicOrder.indexOf(b.topicId)
)

export default function SourcesPage() {
  return (
    <div className={styles.page}>
      <AppNavigation />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.breadcrumb}>Coverage › Solar › Sources &amp; Methodology</p>
          <h1 className={styles.title}>Sources &amp; Data Notes</h1>
          <p className={styles.subtitle}>
            All data, statistics, cost figures, and market claims in this learning module are drawn
            from the primary sources listed below. Where a figure represents a range or estimate,
            the underlying source is noted.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.inner}>

          <div className={styles.disclaimer}>
            <strong>A note on currency:</strong> Solar markets move quickly. Cost benchmarks,
            technology market shares, and policy details are sourced from the most recent available
            publications at the time of module creation (primarily 2024–2025 data). Readers should
            verify current figures against the primary sources linked below, particularly for
            rapidly-changing items like module prices, BESS pack costs, and ITC bonus credit
            guidance.
          </div>

          {sorted.map((group) => (
            <section key={group.topicId} className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {group.topicTitle === 'General / Cross-Cutting' ? (
                  group.topicTitle
                ) : (
                  <>
                    <span className={styles.topicTag}>
                      {topics.find((t) => t.id === group.topicId)?.tag ?? ''}
                    </span>
                    {group.topicTitle}
                  </>
                )}
              </h2>
              <div className={styles.citationList}>
                {group.sources.map((src) => (
                  <div key={src.id} className={styles.citation}>
                    <div className={styles.citTop}>
                      <div className={styles.citMeta}>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.citTitle}
                        >
                          {src.title}
                        </a>
                        <span className={styles.citPublisher}>
                          {src.publisher} — {src.year}
                        </span>
                      </div>
                    </div>
                    <p className={styles.citNotes}>{src.notes}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Methodology Notes</h2>
            <div className={styles.methodNotes}>
              <div className={styles.methodItem}>
                <h3 className={styles.methodHeading}>Cost figures</h3>
                <p>
                  Installed cost benchmarks ($/W for solar, $/kWh for storage) follow NREL's cost
                  benchmark methodology: they represent installed system costs at the point of
                  commercial operation before any tax incentives, and reflect median observed
                  figures rather than minimums. Actual project costs vary significantly by market,
                  scale, equipment selection, and labor conditions.
                </p>
              </div>
              <div className={styles.methodItem}>
                <h3 className={styles.methodHeading}>Market share and installation data</h3>
                <p>
                  US annual installation figures are DC capacity (megawatts-direct-current) unless
                  otherwise noted. Global manufacturing share figures reflect production capacity
                  and may differ from shipment share in any given year.
                </p>
              </div>
              <div className={styles.methodItem}>
                <h3 className={styles.methodHeading}>Efficiency figures</h3>
                <p>
                  Cell efficiency figures cite NREL-certified research records. Module efficiency
                  (typically 2–3 percentage points below cell efficiency) is what applies in
                  commercial projects. All efficiency figures are at Standard Test Conditions (STC).
                </p>
              </div>
              <div className={styles.methodItem}>
                <h3 className={styles.methodHeading}>Tax and policy references</h3>
                <p>
                  Tax credit rates, adder percentages, and qualification requirements are based on
                  statutory text and IRS guidance available as of early 2025. Treasury and IRS
                  guidance continues to evolve; readers should consult qualified tax counsel for
                  project-specific determinations.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
