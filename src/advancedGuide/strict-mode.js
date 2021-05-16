import React from 'react'
import ReactDOM from 'react-dom'

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <MyComponent1 />
          <MyComponent2>
            MyComponent2
          </MyComponent2>
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}

function Header() {
  return <header>header</header>;
}

function Footer() {
  return <footer>footer</footer>;
}

class MyComponent1 extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}

class MyComponent2 extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  render() {
    return <div ref={this.wrapper} style={{'display': 'contents'}}>{this.props.children}</div>;
  }
}

class TopLevelRoute extends React.Component {
  constructor(props) {
    super(props);

    // 해당 연산의 결과가 계속 달라진다면, 이 컴포넌트를 인스턴스화 했을 때 애플리케이션의 상태를 잘못된 방향으로 이끌 수 있음.
    SharedApplicationState.recordEvent('ExampleComponent');
  }
}

ReactDOM.render(
  <ExampleApplication />,
  document.getElementById('root')
)