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
    validate: (values) => {
      const errors: Partial<typeof values> = {}

      if (!values.name) {
        errors.name = 'name is required.'
      } else if (!values.name.match(/^[a-z0-9].*\.$/)) {
        errors.name = 'name first letter must be in lower case and last letter must be a dot.'
      }

      if (!values.nick) {
        errors.nick = 'nick is required.'
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        errors.nick = 'nick may contain only lowercase letters, numbers and dashes.'
      }

      if (!values.description) {
        errors.description = 'description is required.'
      }

      if (!values.text) {
        errors.text = 'text is required.'
      } else if (values.text.length < 100) {
        errors.text = 'text should be at least 100 characters long'
      }

      return errors
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
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>some fields are invalid.</div>}
        <button type="submit">create opinion</button>
      </form>
    </Segment>
  )
}
