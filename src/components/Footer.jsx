import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>FTI Consulting</span>
        <span className={styles.divider}>|</span>
        <span className={styles.sub}>Power, Renewables &amp; Energy Transition</span>
        <Link to="/sources" className={styles.sourcesLink}>Sources &amp; Data Notes</Link>
        <span className={styles.copy}>© {new Date().getFullYear()} FTI Consulting, Inc.</span>
      </div>
    </footer>
  )
}
