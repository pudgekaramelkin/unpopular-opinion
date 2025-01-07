import { useFormik } from 'formik'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewOpinionPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info(values)
    },
  })

  return (
    <Segment title="new opinion.">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="name" formik={formik} />
        <Input name="nick" label="nick" formik={formik} />
        <Input name="description" label="description" formik={formik} />
        <Textarea name="text" label="text" formik={formik} />
        <button type="submit">create opinion</button>
      </form>
    </Segment>
  )
}
