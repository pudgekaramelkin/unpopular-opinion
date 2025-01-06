import { Link, Outlet } from 'react-router-dom'
import { getAllOpinionsRoute } from '../../lib/routes'
import styles from './index.module.scss'

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>unpopularopinion.</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={getAllOpinionsRoute()}>
              all opinions.
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
