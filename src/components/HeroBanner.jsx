import styles from './HeroBanner.module.css'

const HOME_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80'
const TOPIC_IMAGE =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80'

export default function HeroBanner({ variant = 'home', title, subtitle, breadcrumb, ctaText, onCtaClick }) {
  const image = variant === 'home' ? HOME_IMAGE : TOPIC_IMAGE

  return (
    <div
      className={variant === 'home' ? styles.heroHome : styles.heroTopic}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {ctaText && (
          <button className={styles.cta} onClick={onCtaClick}>
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )
}
