import { data, timers } from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'

{/* <DataProvider render={data => {
  <h1>Hello {data.target}</h1>
}} /> */}

class MouseTracker1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0};
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '10vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class Mouse1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0};
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '10vh' }} onMouseMove={this.handleMouseMove}>
        {/* 기존의 h1을 렌더링 하려면...? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker2 extends React.Component {
  render() {
    return (
      <>
        {/* MouseTracker1과 동일하게 입력할 수 없음. */}
        <h1>Move the mouse around!</h1>
        <Mouse1 />
      </>
    )
  }
}

class Cat1 extends React.Component {
  render() {
    const mouse = this.props.mouse;

    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '10vh' }} onMouseMove={this.handleMouseMove}>
        {/* 
          여기서 <p>를 Cat으로 바꿀 수 있지만 그럴 때 마다 별도의 MouseWithSomethingElse와 같은 컴포넌트를 만들어야 하므로 재사용이 불가능 함.
        */}
        <Cat1 mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker3 extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat1 />
      </div>
    );
  }
}

class Cat2 extends React.Component {
  render() {
    const mouse = this.props.mouse;

    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '10vh' }} onMouseMove={this.handleMouseMove}>
        {/* 
          <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신 `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있습니다.
        */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker4 extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the moouse around!</h1>
        <Mouse2 render={mouse => (
          <Cat2 mouse={mouse} />
        )} />
      </div>
    );
  }
}

// 만약 어떤 이유 때문에 HOC를 만들기 원한다면, 쉽게 구현할 수 있습니다.
// render prop을 이용해서 일반적인 컴포넌트를 만드세요!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse2 render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )} />
      );
    }
  }
}

// 반드시 redner를 사용할 필요는 없음.
{/* <Mouse3 children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)} />

<Mouse3>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse3> */}

// Mouse.propTypes = {
//   children: PropType.func.isRequired
// };

class Mouse4 extends React.PureComponent {
  // 위와 같은 구현체...
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '10vh' }} onMouseMove={this.handleMouseMove}>
        {/* 
          <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신 `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있습니다.
        */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker5 extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/* 
          이것은 좋지 않습니다! `render` prop이 가지고 있는 값은
          각각 다른 컴포넌트를 렌더링 할 것입니다.
        */}
        <Mouse4 render={mouse => (
          <Cat2 mouse={mouse} />
        )} />
      </div>
    )
  }
}

class MouseTracker6 extends React.Component {
  // `this.renderTheCat`을 항상 생성하는 메서드를 정의합니다.
  // 이것은 render를 사용할 때 마다 *같은* 함수를 참조합니다.
  renderTheCat(mouse) {
    return <Cat2 mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse4 render={this.renderTheCat} />
      </div>
    );
  }
}

ReactDOM.render(
  <>
    <MouseTracker1 />
    <hr />
    <MouseTracker2 />
    <hr />
    <MouseTracker3 />
    <hr />
    <MouseTracker4 />
    <hr />
    <MouseTracker5 />
    <hr />
    <MouseTracker6 />
  </>,
  document.getElementById('root')
)