import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import React from 'react';
import HelloWorldComponent from './advancedGuide/HelloWorldComponent'

class Greeting1 extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting1.propTypes = {
  name: PropTypes.string
};

class MyComponent1 extends React.Component {
  render() {
    return (
      <h2>Hello, {this.props.name}</h2>
    );
  }
}

MyComponent1.propTypes = {
  // prop이 특정 JS형식임을 선언할 수 있습니다.
  // 이것들은 기본적으로 모두 선택사항입니다.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 렌더링 될 수 있는 것들은 다음과 같습니다.
  // 숫자(numbers), 문자(strings), 엘리먼트(elements), 또는 이러한 타입들(types)을 포함하고 있는 배열(array) (혹은 배열의 fragment)
  optionalNode: PropTypes.node,

  // React 엘리먼트
  optionalElement: PropTypes.element,

  // React 엘리먼트 타입 (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  // prop가 클래스의 인스턴스임을 선언할 수 있습니다.
  // 이 경우 JavaScript의 instanceof 연산자를 사용합니다.
  // optionalMessage: PropTypes.instanceOf(Message),

  // 열거형(enum)으로 처리하여 prop가 특정 값들로 제한되도록 할 수 있습니다.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 여러 종류 중 하나의 종류가 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    // PropTypes.instanceOf(Message)
  ]),

  // 특정 타입의 행렬
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 특정 타입의 프로퍼티 값들을 갖는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 특정 형태를 갖는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 위에 있는 것 모두 `isRequired`와 연결하여 prop가 제공되지 않았을 때 경고가 보이도록 할 수 있습니다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입이 가능한 필수값
  requiredAny: PropTypes.any.isRequired,

  // 사용자 정의 유효성 검사기를 지정할 수도 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // `oneOfType` 안에서는 작동하지 않으므로 `console.warn` 혹은 throw 하지 마세요.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // `arrayOf` 와 `objectOf`에 사용자 정의 유효성 검사기를 적용할 수 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // 유효성 검사기는 배열(array) 혹은 객체의 각 키(key)에 대하여 호출될 것입니다.
  // 유효성 검사기의 첫 두 개의 변수는 배열 혹은 객체 자신과 현재 아이템의 키입니다.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
}

class MyComponent2 extends React.Component {
  render() {
    // 이것은 반드시 하나의 엘리먼트여야 합니다. 아니라면, 경고(warn)가 일어날 것입니다.
    const children = this.props.children;

    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent2.propTypes = {
  children: PropTypes.element.isRequired
};

class Greeting2 extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting2.defaultProps = {
  name: 'Stranger'
};

// transform-class-properties와 같은 Babel 변환(transform)을 사용하고 있다면,
// defuaultProps를 React 컴포넌트 클래스 내의 정적 프로퍼티로 선언할 수도 있습니다.
class Greeting3 extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}

ReactDOM.render(
  <>
    <Greeting1 name={123} />
    <MyComponent1 name={321} />
    <MyComponent2>
      Test
    </MyComponent2>
    <Greeting2 />
    <Greeting3 />
    <HelloWorldComponent name={"test"}/>
  </>,
  document.getElementById('root')
)