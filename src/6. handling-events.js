import React from 'react';
import ReactDOM from 'react-dom'

// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }

//   return (
//     <a href="#" onClick={handleClick}>
//       Click me
//     </a>
//   )
// }

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    
    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 렌더링 시 마다 다른 콜백이 생성되므로 추천하지 않음.
// class LoggingButton extends React.Component {
  // handleClick() {
  //   console.log('this is:', this);
  // }

//   render() {
//     // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
//     return (
//       <button onClick={() => this.handleClick()}>
//         Click me
//       </button>
//     );
//   }
// }

ReactDOM.render(
  <LoggingButton />,
  document.getElementById('root')
)