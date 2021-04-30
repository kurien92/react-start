import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'

// function FancyButton(props) {
//   return (
//     <button classNae="FancyButton">
//       {props.children}
//     </button>
//   );
// }

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} onClick={props.onClick} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();

class App extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const fancyButton = document.getElementsByClassName("FancyButton");
    console.log(ref);
    console.log(ref.current === fancyButton[0]);
    console.log(ref.current === fancyButton[1]);
    ref.current.style.display = "none";
  }

  render() {
    return (
      <>
        {/* 하나의 참조에 두개 이상의 참조를 거는 경우 마지막에 걸린 참조가 설정된다. */}
        <FancyButton ref={ref} onClick={this.clickHandler}>Click me!</FancyButton>
        <FancyButton ref={ref} onClick={this.clickHandler}>Click me!</FancyButton>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)