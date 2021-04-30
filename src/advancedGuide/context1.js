import React from 'react';
import ReactDOM from 'react-dom'

// context를 사용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있습니다.
// light를 기본값으로 하는 테마 context를 만들어 봅시다.
const ThemeContext = React.createContext('light');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      color: "dark"
    }
  }

  handleClick(e) {
    let color = "dark";

    if(this.state.color === "dark") {
      color = "light";
    }

    this.setState({color});
  }

  render() {
    // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
    const user = {
      name: "kurien",
      permalink: "https://www.kurien.net"
    };

    const avatarSize = "123,456,789";


    return (
      <ThemeContext.Provider value={this.state.color}>
        <Toolbar onClick={this.handleClick} />
        <hr/>
        <Page user={user} avatarSize={avatarSize} />
      </ThemeContext.Provider>
    )
  }
}

// 이젠 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없습니다.
function Toolbar(props) {
  // Toolbar 컴포넌트는 불필요한 테마 prop를 받아서
  // ThemeButton에 전달해야 합니다.
  // 앱 안의 모든 버튼이 테마를 알아야 한다면
  // 이 정보를 일일이 넘기는 과정은 매우 곤혹스러울 수 있습니다.

  return (
    <div>
      <ThemedButton onClick={props.onClick} />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
  // 이 예시에서 현재 선택된 테마는 dark입니다.

  static contextType = ThemeContext;
  
  render() {
    return <Button theme={this.context} onClick={this.props.onClick} />;
  }
}

function Button(props) {
  const style = {
    backgroundColor: props.theme === "dark" ? "#333" : "#ccc"
  };

  return (
    <button type="button" className={props.theme} onClick={props.onClick} style={style}>{props.theme}</button>
  );
}

// function Page(props) {
//   return <PageLayout user={props.user} avatarSize={props.avatarSize} />
// }

function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );

  return <PageLayout topBar={topBar} content={content} />
}

// function PageLayout(props) {
//   return <NavigationBar user={props.user} avatarSize={props.avatarSize} />
// }

// function PageLayout(props) {
//   return <NavigationBar userLink={props.userLink} />
// }

function PageLayout(props) {
  return (
    <div>
      {props.topBar}
      {props.content}
    </div>
  )
}

// function NavigationBar(props) {
//   return <Link href={props.user.permalink}>
//     <Avatar user={props.user} size={props.avatarSize} />
//   </Link>
// }

// function NavigationBar(props) {
//   return props.userLink;
// }

function NavigationBar(props) {
  return props.children;
}

function Link(props) {
  return (
      <a href={props.href}>
        {props.children}
      </a>
    );
}

function Avatar(props) {
  return (
    <div>
      {props.user.name} / {props.size}
    </div>
  )
}

function Feed(props) {
  return (
    <div>
      {props.user.name}
    </div>
  )
}

const MyContext = React.createContext("red");
MyContext.displayName = 'MyDisplayName';

function ContextProviderTest(props) {
  const color = "blue";

  return (
    <React.Fragment>
      <MyContext.Provider value={color}>
        <ContextProviderChildren />
        <hr />
        <MyClass />
        <hr />
        <MyClass2 />
      </MyContext.Provider>
    </React.Fragment>
  )
}

class ContextProviderChildren extends React.Component {
  static contextType = MyContext;

  render() {
    const style = {
      width: 300,
      height: 300,
      backgroundColor: this.context
    };

    return (
      <div style={style}>
        Test
      </div>
    );
  }
}

class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;

    console.log("componentDidMount", value);
  }

  componentDidUpdate() {
    let value = this.context;

    console.log("componentDidUpdate", value);
  }

  componentWillUnmount() {
    let value = this.context;

    console.log("componentWillUnmount", value);
  }

  render() {
    let value = this.context;

    const style = {
      width: 300,
      height: 300,
      backgroundColor: this.context,
      color: value
    };

    return (
      <div style={style}>
        TEST
      </div>
    );
  }
}

MyClass.contextType = MyContext;

class MyClass2 extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {value => <div>{value}</div>}
      </MyContext.Consumer>
    );
  }
}

ReactDOM.render(
  <React.Fragment>
    <ContextProviderTest />
    <hr/>
    <App />
  </React.Fragment>
  ,
  document.getElementById('root')
)