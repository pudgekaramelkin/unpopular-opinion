import cn from 'classnames'
import styles from './index.module.scss'

export const Alert = ({ color, children }: { color: 'red' | 'green'; children: React.ReactNode }) => {
  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>
}
