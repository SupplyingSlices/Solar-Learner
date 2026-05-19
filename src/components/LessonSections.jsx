import styles from './LessonSections.module.css'

export default function LessonSections({ sections, diagramComponents = {} }) {
  return (
    <div className={styles.sections}>
      {sections.map((section, i) => {
        const DiagramComponent = section.diagram ? diagramComponents[section.diagram] : null
        return (
          <div key={i} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {DiagramComponent && (
              <div className={styles.diagramBlock}>
                <DiagramComponent />
              </div>
            )}
            {section.image && (
              <figure className={styles.figure}>
                <img src={section.image.url} alt={section.image.alt || section.heading} className={styles.image} />
                {section.image.caption && (
                  <figcaption className={styles.caption}>{section.image.caption}</figcaption>
                )}
              </figure>
            )}
            <p className={styles.body}>{section.body}</p>
          </div>
        )
      })}
    </div>
  )
}
