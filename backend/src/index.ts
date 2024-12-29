import express from 'express'

const opinions = [
  { nick: 'bad-guy-1', name: 'Opinion 1', description: 'Description of opinion 1...' },
  { nick: 'bad-guy-2', name: 'Opinion 2', description: 'Description of opinion 2...' },
  { nick: 'bad-guy-3', name: 'Opinion 3', description: 'Description of opinion 3...' },
  { nick: 'bad-guy-4', name: 'Opinion 4', description: 'Description of opinion 4...' },
  { nick: 'bad-guy-5', name: 'Opinion 5', description: 'Description of opinion 5...' },
]

const expressApp = express()
expressApp.get('/ping', (req, res) => {
  res.send('pong')
})
expressApp.get('/opinions', (req, res) => {
  res.send(opinions)
})
expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
