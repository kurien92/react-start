import React from 'react';
import ReactDOM from 'react-dom'

// 정적 함수를 정의합니다.
WrappedComponent.staticMethod = function() {};

// HOC를 적용합니다.
const EnhancedComponent = enhance(WrappedComponent);

// 향상된 컴포넌트에는 정적 메서드가 없습니다.
typeof EnhancedComponent.staticMethod === 'undefined'; // true


// 이 문제를 해결하려면 메서드를 반환하기 전에 컨테이너에 복사를 해야 함.
function enhance(WrappedComponent) {
  class Enhance extends React.Component { }

  // 복사 할 메서드를 정확히 알아야 함.
  Enhance.staticMethod = WrappedComponent.staticMethod;

  return Enhance;
}

// 위와 같은 방법으로 메서드 복사가 가능하지만, 메서드명을 정확히 알아야 할 필요가 있음.
// hoist-non-react-statics를 사용하면 모든 non-React 정적 메서드를 자동으로 복사할 수 있음.

import hoistNonReactStatic from 'hoist-non-react-statics';

function enhance(WrappedComponent) {
  class Enhance extends React.Component { }
  hoistNonReactStatic(Enhance, WrappedComponent);

  return Enhance;
}

// 또 다른 해결방법은 정적 메서드를 컴포넌트와 별도로 내보내는 것임.
// 컴포넌트와 메서드를 각각 내보낸 후...
MyComponent.someFunction = somFunction;
export default MyComponent;

export { someFunction };

// 불러오는 쪽에서 두개를 모두 import 처리한다.
import MyComponent, { someFunction } from './MyComponent.js';


// 고차 컴포넌트에서 모든 props를 래핑된 컴포넌트에 전달하는 것이 원칙이지만, refs에서는 작동하지 않음.
// 리액트에서 ref를 key처럼 특별 취급 하기 때문.
// 이 경우 React.forwardRef API를 사용하면 됨.

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)