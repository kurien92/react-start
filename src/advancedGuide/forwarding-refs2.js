import React from 'react';
import ReactDOM from 'react-dom'
import FancyButton from './FancyButton';

const ref = React.createRef();

// 가져온 FancyButton 컴포넌트는 LogProps HOC입니다.
// 렌더링된 결과가 동일하다고 하더라도,
// ref는 내부 FancyButton 컴포넌트 대신 LogProps를 가리킵니다!
// 이것은 우리가 예를 들어 ref.current.focus()를 호출할 수 없다는 것을 의미합니다.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(ref);
    ref.current.focus();
  }

  render() {
    return (
      <FancyButton
        label="Click Me"
        onClick={this.handleClick}
        ref={ref}
      />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)