import React from 'react';
import ReactDOM from 'react-dom'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function formatDate(date = new Date()) {
  return date.toLocaleTimeString();
}

// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>
//   }
// }

// const element = <Welcome name="Sara" />;

// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           src={props.author.avatarUrl}
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}

/**
 * props는 읽기전용이므로 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됨.
 * 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.
 */

// 순수 함수 => 입력된 값에 따라 항상 같은 리턴이 반환 됨.
function sum(a, b) {
  return a + b;
}

// 순수 함수가 아님 => 입력된 값이 동일하더라도 같은 값이 리턴되지 않음.
function withdraw(account, amount) {
  account.total -= amount;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)