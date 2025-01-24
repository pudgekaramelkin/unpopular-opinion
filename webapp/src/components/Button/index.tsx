import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

type ButtonColor = 'red' | 'green'
export type ButtonProps = { children: React.ReactNode; loading?: boolean; color?: ButtonColor }
export const Button = ({ children, loading = false, color = 'green' }: ButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles[`color-${color}`]]: true,
        [styles.disabled]: loading,
        [styles.loading]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export const LinkButton = ({
  children,
  to,
  color = 'green',
}: {
  children: React.ReactNode
  to: string
  color?: ButtonColor
}) => {
  return (
    <Link className={cn({ [styles.button]: true, [styles[`color-${color}`]]: true })} to={to}>
      {' '}
      {children}
    </Link>
  )
}
