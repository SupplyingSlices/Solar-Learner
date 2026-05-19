import { NavLink } from 'react-router-dom'
import styles from './AppNavigation.module.css'

export default function AppNavigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandName}>FTI Consulting</span>
          <span className={styles.brandSub}>Power, Renewables &amp; Energy Transition</span>
        </NavLink>
        <div className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end
          >
            Solar Learning
          </NavLink>
          <NavLink
            to="/sources"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Sources
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
