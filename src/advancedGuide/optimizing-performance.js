import React from 'react';
import ReactDOM from 'react-dom'

// 성능 최적화는 build를 이용하여 minify를 하는 방법과 코드 동작을 효율적으로 하는 방법이 있음.
class CountButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      count: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  
  // return 값이 true인 경우에만 렌더링을 동작한다.
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate", nextProps);
    // console.log("shouldComponentUpdate", nextState);

    return nextState.count % 2 === 0;
  }

  handleClick() {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    });
  }

  render() {
    // const count = this.state.count;

    return (
      <>
        <TestData count={this.state.count} />

        <TestButton handleClick={this.handleClick}>
          {this.props.children}
        </TestButton>
      </>
    );
  }
}

function TestData(props) {
    return <div>{props.count}</div>;
}

class TestButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>{this.props.children}</button>
    );
  }
}

class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }

    if (this.state.count !== nextState.count) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count +1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      words: ['marklar']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>버튼</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

// 이렇게 쓰지 말고(전체 항목 변경)
// handleClick() {
//   this.setState(state => ({
//     words: state.words.concat(['marklar']);
//   }))
// }

// 이렇게 쓰자 (추가된 항목만 변경)
// handleClick() {
//   this.setState(state => ({
//     words: [...state.words, 'marklar']
//   }));
// }

// mutation을 피하기 위해 객체를 변경하는 코드를 다시 쓸 수 있음.
// 이 경우 원본 객체(colormap의 상태가 변경되므로 colormap을 이용하는 경우 상태가 전달될 수 있음.)
function updateColorMap(colormap) {
  colormap.right = 'blue';
}

// ES6
// 위 코드에서 객체를 변경하지 않고 작성을 하려면 Object.assign 메서드를 사용하면 된다.
// 이렇게 사용하는 경우 colormap 자체는 상태가 그대로이므로 상태가 전달되지 않아 의미없는 전파가 일어나지 않음.
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}

// ES2018
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}

ReactDOM.render(
  <>
    <CountButton>
      버튼입니당!
    </CountButton>
    <hr />
    <CounterButton />
    <hr />
    <WordAdder />
  </>,
  document.getElementById('root')
)