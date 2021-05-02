import React from 'react';
import ReactDOM from 'react-dom'


// 단일 인수로 래핑된 컴포넌트
const NavbarWithRouter = withRouter(Navbar);


// 추가 인수를 허용하는 컴포넌트.
// Relay 예제에서 config객체는 컴포넌트의 데이터 의존성을 지정하기 위해 사용함.
const CommentWithRelay = Relay.createContainer(Comment, config);

// 고차 컴포넌트에 대한 가장 일반적인 사용
const ConnectedComment = connect(commentSelector, commentActions)(CommenctList);


// 위의 일반적인 사용 방법을 단계별로 구분해놓은 방법
// connect는 고차 컴포넌트(enhance)를 반환하는 고차 함수임.
const enhance = connect(commentListSelector, commentListActions);
const ConnectedComment = enhance(CommentList);


// 이렇게 사용하는 대신
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent));

// 이렇게 사용하면 편하다.
// compose(f, g, h)는 (...args) => f(g(h(...args)))와 같다.
const enhance = compose(
  withRouter,
  connect(commentSelector)
);

const EnhancedComponent = enchance(WrappedComponent);


// HOC 컨테이너도 React Developer Tools에 표시 됨.
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    
  }

  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

class HocComponentTest extends React.Component {
  render() {
    // render가 호출될 때마다 새로운 버전의 EnhancedComponent가 생성됩니다.
    // EnhancedComponent1 !== EnhancedComponent2
    const EnhancedComponent = enhance(MyComponent);

    // 때문에 매번 전체 서브트리가 마운트 해제 후 다시 마운트 됩니다!
    return <EnhancedComponent />;
  }
}

// 다시 마운트 되기 때문에 state와 컴포넌트 하위 항목이 손실되며,
// 이전 항목이 모두 마운트 해제 되므로 성능적으로도 문제가 발생함.
// 그러므로 컴포넌트의 정의 바깥에 HOC를 적용하여 컴포넌트가 한 번만 생성되도록 해야 함.
// 만약 HOC를 동적으로 적용해야 할 경우에는 컴포넌트의 생명주기 메서드 또는 생성자 내에 작성 할 수 있음(1회만 실행되는 부분...)



ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)