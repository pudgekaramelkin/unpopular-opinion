import image404 from '../../../assets/images/404.png'
import { ErrorPageComponent } from '../../../components/ErrorPageComponent'
import styles from './index.module.scss'

export const NotFoundPage = ({ title = 'not found', message }: { title?: string; message?: string }) => (
  <ErrorPageComponent title={title} message={message}>
    <img src={image404} className={styles.image} alt="" width="800" height="600" />
  </ErrorPageComponent>
)
