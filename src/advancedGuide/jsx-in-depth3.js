import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
  return <div>{props.children}</div>
}

class ArrayTest extends React.Component {
  render() {
    // 리스트 아이템들을 추가적인 엘리먼트로 둘러쌀 필요가 없음.
    return [
      // key 지정을 해야 함.
      <li key="A">First item</li>,
      <li key="B">Second item</li>,
      <li key="C">Third item</li>,
    ];
  }
}

function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];

  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}

function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}

// 자식 콜백인 numTimes를 호출하여 반복되는 컴포넌트를 생성합니다.
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }

  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

function Header() {
  return <div>Header</div>;
}

function Content() {
  return <div>Content</div>;
}

function MessageList(props) {
  const messages = [];

  for (let i = 0; i < props.messages.length; i++) {
    messages.push(<li>{props.messages[i]}</li>);
  }

  return messages;
}

const myVariable = undefined;

class App extends React.Component {
  render() {
    const showHeader = false; // falsy 값은 렌더링이 된다...

    return (
      <>
        {/* 여닫는 태그 사이에 문자열 리터럴을 넣을 수 있고 때 이 문자열은 props.children으로 전달된다. */}
        <MyComponent>Hello world!</MyComponent>
        <hr />
        {/* HTML은 이스케이프 처리되지 않는다. */}
        <div>This is valid HTML &amp; JSX at the same time.</div>
        <hr />
        {/* 아래의 Hello World는 전부 동일하게 표시된다. */}
        <div>Hello World</div>
        <div>
          Hello World
        </div>
        <div>
          Hello
          World
        </div>
        <div>
          
          Hello World
        </div>
        <hr/>
        <MyComponent>
          <MyComponent>
            First Component
          </MyComponent>
          <MyComponent>
            Second Component
          </MyComponent>
        </MyComponent>
        <hr />
        <div>
          Here is a list:
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
        <hr />
        <ArrayTest />
        <hr />
        <MyComponent>foo</MyComponent>
        <MyComponent>{'foo'}</MyComponent>
        <hr />
        <TodoList />
        <hr />
        <Hello addressee="주소..." />
        <hr />
        <ListOfTenThings />
        <hr />
        {/* 아래의 내용은 모두 값이 렌더링이 되지 않을 뿐임. */}
        <div />
        <div></div>
        <div>{false}</div>
        <div>{null}</div>
        <div>{undefined}</div>
        <div>{true}</div>
        <hr />
        <div>
          {showHeader && <Header />}
          <Content />
        </div>
        <hr />
        {/* 이 경우 0을 렌더링 해버리므로 문제가 발생 */}
        <div>
          {
            this.props.messages.length &&
            <MessageList messages={this.props.messages} />
          }
        </div>
        <hr />
        {/* 이렇게 진리값(true,false)를 이용하여 써야함 */}
        <div>
          {
            this.props.messages.length > 0 &&
            <MessageList messages={this.props.messages} />
          }
        </div>
        <hr />
        {/* false, true, null, undefined는 문자열로 전환한 후 출력한다. */}
        <div>
          My JavaScript variable is {String(myVariable)}.
        </div>
      </>
    );
  }
}

const messages = ['test1', 'test2', 'test3', 'test4', 'test4'];

ReactDOM.render(
  <App messages={messages}/>,
  document.getElementById('root')
)