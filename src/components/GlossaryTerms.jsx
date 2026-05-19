import styles from './GlossaryTerms.module.css'

export default function GlossaryTerms({ terms }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Good to Know Terms</h2>
      <dl className={styles.list}>
        {terms.map((item, i) => (
          <div key={i} className={styles.entry}>
            <dt className={styles.term}>{item.term}</dt>
            <dd className={styles.definition}>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
