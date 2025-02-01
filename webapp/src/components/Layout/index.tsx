import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import * as routes from '../../lib/routes'
import { useMe } from '../../lib/сtx'
import styles from './index.module.scss'

export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <Link to={routes.getAllOpinionsRoute()}>
          <Logo className={styles.logo} />
        </Link>
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
      <div className={styles.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
