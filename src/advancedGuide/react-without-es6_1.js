import React from 'react';
import ReactDOM, { render } from 'react-dom'

// ES6 사용
class Greeting1 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// ES6 사용 안함, create-react-class
var createReactClass = require('create-react-class');

var Greeting2 = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});

class Greeting3 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting3.defaultProps = {
  name: 'Mary'
};

var Greeting4 = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
});

class Counter1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    });
  }

  render() {
    return <button type="button" onClick={this.handleClick}>{this.state.count}</button>
  }
}

var Counter2 = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  handleClick: function() {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    });
  },
  render: function() {
    return <button type="button" onClick={this.handleClick}>{this.state.count}</button>;
  }
});


// ES6의 클래스를 사용하면 createReactClass보다 코드가 더 많아지지만, class를 사용하면 대규모 애플리케이션에서의 성능이 조금 더 좋아짐.
class SayHello1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // `this.handleClick`이 바인딩 되었기 때문에, 이를 이벤트 핸들러로 사용할 수 있습니다.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    )
  }
}

// 이 경우 bind(this)를 하지 않아도 createReactClass가 알아서 모든 메서드를 바인딩 해줌.
var SayHello2 = createReactClass({
  getInitialState: function() {
    return {
      message: 'Hello'
    };
  },
  handleClick: function() {
    alert(this.state.message);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    )
  }
});

// 보일러플레이트 코드를 쓰지 않는 방법, 실험적인 상태이므로 추후 반영되지 않을 수 있음.
class SayHello3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello'};
  }

  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return <button onClick={this.handleClick}>
      Say hello
    </button>
  }
}

// 안전한 방법으로 화살표 함수를 사용할 수 있음.
class SayHello4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello'}
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    return <button onClick={e => this.handleClick(e)}>
      Say hello
    </button>
  }
}

ReactDOM.render(
  <>
    <Greeting1 name="test1" />
    <Greeting2 name="test2" />
    <Greeting3 name="test3" />
    <Greeting4 name="test4" />
    <hr />
    <Counter1 initialCount={1} /><br />
    <Counter2 initialCount={2} />
    <hr />
    <SayHello1 /><br />
    <SayHello2 /><br />
    <SayHello3 /><br />
    <SayHello4 /><br />
  </>,
  document.getElementById('root')
)