import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export type ButtonProps = { children: React.ReactNode; loading?: boolean }
export const Button = ({ children, loading = false }: ButtonProps) => {
  return (
    <button
      className={cn({ [styles.button]: true, [styles.disabled]: loading, [styles.loading]: loading })}
      type="submit"
      disabled={loading}
    >
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export const LinkButton = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <Link className={cn({ [styles.button]: true })} to={to}>
      {children}
    </Link>
  )
}
