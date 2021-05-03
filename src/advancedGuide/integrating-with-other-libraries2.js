import ReactDOM from 'react-dom'

const $ = window.$;

// jQuery를 이용한 구현
// $('#container').html('<button id="btn">Say Hello</button>');
// $('#btn').click(function() {
//   alert('Hello!');
// });

function Button() {
  return <button id="btn">Say Hello</button>;
}

function App() {
  return (
    <div id="container"></div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

ReactDOM.render(
  <Button />,
  document.getElementById('container'),
  function() {
    $('#btn').click(function() {
      alert('Hello');
    })
  }
)