import _ from 'lodash'

export const opinions = _.times(50, (x) => ({
  nick: `opinion-nick-${x}`,
  name: `opinion-${x}.`,
  description: `Description of opinion ${x}..`,
  text: _.times(10, (i) => `<p>text of paragraph ${i} of opinion ${x}</p>`).join(''),
}))
