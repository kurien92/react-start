import React from 'react';
import ReactDOM, { render } from 'react-dom'

class Hello1 extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

class Hello2 extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

// 짧게 쓰기 위해서는 변수에 할당하는 방법이 있음.
const e = React.createElement;

function ShortTest(props) {
  return e('div', null, 'Hello World');
}

ReactDOM.render(
  <>
    <Hello1 toWhat="World" />
    <Hello2 toWhat="World" />
    <ShortTest />
  </>,
  document.getElementById('root')
)