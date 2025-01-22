import cn from 'classnames'
import styles from './index.module.scss'

export const Loader = ({ type }: { type: 'page' | 'section' }) => (
  <span
    className={cn({
      [styles.loader]: true,
      [styles[`type-${type}`]]: true,
    })}
  />
)
