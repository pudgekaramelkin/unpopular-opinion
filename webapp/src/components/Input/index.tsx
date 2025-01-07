import { type FormikProps } from 'formik'
import styles from './index.module.scss'

export const Input = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const value = formik.values[name]
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        name={name}
        id={name}
      />
    </div>
  )
}
