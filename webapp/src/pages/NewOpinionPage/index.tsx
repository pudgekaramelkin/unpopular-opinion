import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import z from 'zod'
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
    validate: withZodSchema(
      z.object({
        name: z.string().min(1).regex(/^[a-z0-9].*\.$/, 'name first letter must be in lower case and last letter must be a dot.'),
        nick: z.string().min(1).regex(/^[a-z0-9-]+$/, 'nick may contain only lowercase letters, numbers and dashes.'),
        description: z.string().min(1, 'description should be at least 1 characters long.'),
        text: z.string().min(100, 'text should be at least 100 characters long.'),
      })
    ),
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
