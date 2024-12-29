export const App = () => {
  const opinions = [
    { nick: 'cool-idea-nick-1', name: 'Opinion 1', description: 'Description of opinion 1...' },
    { nick: 'cool-opinion-nick-2', name: 'Opinion 2', description: 'Description of opinion 2...' },
    { nick: 'cool-opinion-nick-3', name: 'Opinion 3', description: 'Description of opinion 3...' },
    { nick: 'cool-opinion-nick-4', name: 'Opinion 4', description: 'Description of opinion 4...' },
    { nick: 'cool-opinion-nick-5', name: 'Opinion 5', description: 'Description of opinion 5...' },
  ]
  return (
    <div>
      <h1>unpopular opinion.</h1>
      {opinions.map((opinion) => (
        <div key={opinion.nick}>
          <h2>{opinion.name}</h2>
          <p>{opinion.description}</p>
        </div>
      ))}
    </div>
  )
}
