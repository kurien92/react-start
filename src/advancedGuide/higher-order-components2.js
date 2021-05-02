import React from 'react';
import ReactDOM from 'react-dom'

// function logProps(InputComponent) {
//   InputComponent.prototype.componentDidUpdate = function(prevProps) {
//     console.log('Current props: ', this.props);
//     console.log('Previous props: ', prevProps);
//     console.log('state, ' + this.state.text);
//   };

//   // 원본의 입력을 반환한다는 것은 이미 변형되었다는 점을 시사합니다.
//   return InputComponent;
// }

function logProps(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: ''
      }

      this.focusHandler = this.focusHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }

    focusHandler(input) {
      console.log(input);
    }
    
    render() {
      const { dataHocDataInject, ...pathThroughProps } = this.props;

      const injectedProp = this.focusHandler;

      // 들어온 component를 변경하지 않는 container입니다. 좋아요!
      return <WrappedComponent injectedProp={injectedProp} {...pathThroughProps} />
    }
  }
}

class InputText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.changeHandle = this.changeHandle.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
  }

  changeHandle(e) {
    this.setState({
      text: e.target.value
    });
  }

  focusHandler(e) {
    this.props.injectedProp(e.target.value);
  }

  render() {
    const text = this.state.text;

    const {injectedProp, ...props} = this.props;

    return <input onFocus={this.focusHandler} {...props} data-text={text} type="text" onChange={this.changeHandle} />
  }
}

InputText.prototype.componentDidUpdate = function(prevProps) {
  console.log('Previous props: ', prevProps);
}

// EnhancedComponent는 props를 받을 때 마다 log를 남깁니다.
const EnhancedComponent = logProps(InputText);

ReactDOM.render(
  <EnhancedComponent dataHocDataInject="hocData" />,
  document.getElementById('root')
)