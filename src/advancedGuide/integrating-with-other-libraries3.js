import ReactDOM from 'react-dom'

function Button(props) {
  return <button onClick={props.onClick}>Say Hello</button>;
}

function HelloButton() {
  function handleClick() {
    alert('Hello');
  }

  return <Button onClick={handleClick} />
}

function App() {
  return <div id="container"></div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

ReactDOM.render(
  <HelloButton />,
  document.getElementById('container')
)