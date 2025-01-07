import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewOpinionPage = () => {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })

  return (
    <Segment title="new opinion.">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info(state)
        }}
      >
        <Input name="name" label="name" state={state} setState={setState} />
        <Input name="nick" label="nick" state={state} setState={setState} />
        <Input name="description" label="description" state={state} setState={setState} />
        <Textarea name="text" label="text" state={state} setState={setState} />
        <button type="submit">create opinion</button>
      </form>
    </Segment>
  )
}
