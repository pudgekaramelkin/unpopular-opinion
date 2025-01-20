import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { useMe } from '../../lib/сtx'
import styles from './index.module.scss'

export const Layout = () => {
  const me = useMe()

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>unpopularopinion.</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={routes.getAllOpinionsRoute()}>
              all opinions.
            </Link>
          </li>
          {me ? (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.getNewOpinionRoute()}>
                  add opinion.
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.getEditProfilePage()}>
                  edit profile.
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.getSignOutRoute()}>
                  log out ({me.nick}).
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.getSignUpRoute()}>
                  sign up.
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.getSignInRoute()}>
                  sign in.
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
