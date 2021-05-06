import React from 'react'
import ReactDOM from 'react-dom'
import "./portals.css";

// ReactDOM.createPortal(child, container);

// class Test1 extends React.Component {
//   render() {
//     // React는 새로운 div를 마운트하고 그 안에 자식을 렌더링합니다.
//     return (
//       <div>
//         {this.props.chilren}
//       </div>
//     );
//   }
// }

// class Test2 extends React.Component {
//   render() {
//     // React는 새로운 div를 생성하지 않고, `domNode` 안에 자식을 렌더링합니다.
//     // `domNode`는 DOM 노드라면 어떠한 것이든 유효하고, 그것은 DOM 내부의 어디에 있든지 상관없습니다.
//     return ReactDOM.createPortal(
//       this.props.children,
//       domNode
//     );
//   }
// }

const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('other-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    /*
      Portal 엘리먼트는 Modal의 자식이 마운트된 후 DOM 트리에 삽입됩니다.
      요컨대, 자식은 어디에도 연결되지 않은 DOM 노드로 마운트됩니다.
      만약 자식 컴포넌트가 마운트될 때 그것을 즉시 DOM 트리에 연결해야만 한다면,
      예를 들어, DOM 노드를 계산한다든지 자식 노드에서 'autoFocus'를 사용한다든지 하는 경우에,
      Modal에 state를 추가하고 Modal이 DOM 트리에 삽입되어 있을 때만 자식을 렌더링하십시오.
    */
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 이것은 Child에 있는 버튼이 클릭 되었을 때 발생하고 Parent의 state를 갱신합니다.
    // 버튼이 DOM 상에서 직계 자식이 아니더라도 동작 합니다.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>

        {/* Modal 하위 엘리먼트는 먼저 생성된 이후 modalRoot 하위로 이동된다. */}
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // 이 버튼에서의 클릭 이벤트는 'onClick' 속성이 정의되지 않았기 때문에 부모로 버블링됩니다.
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(
  <Parent />,
  appRoot
)