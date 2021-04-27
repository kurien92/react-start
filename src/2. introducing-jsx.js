import ReactDOM from 'react-dom'

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}</h1>;
  }

  return <h1>Hello, Stranger.</h1>
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avattarUrl: 'https://i.ytimg.com/vi/MhrkcQE_430/maxresdefault.jpg'
};

const element = (
  <h1>
    {getGreeting(user)}
  </h1>
);

const element2 = (
  <div tabIndex="0">
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
    <img src={user.avattarUrl} />
  </div>
);

ReactDOM.render(
  element2,
  document.getElementById('root')
)