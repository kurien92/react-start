import ReactDOM from 'react-dom'

// JavaScript 표현을 {} 안에 넣어서 prop로 사용할 수 있음.
// <MyComponent foo={1 + 2 + 3 + 4} />

function MyComponent(props) {
  return <div>{props.foo}</div>;
}

function NumberDescripber(props) {
  let description;

  if(props.number % 2 === 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }

  return <div>{props.number} is an {description} number</div>;
}

function StringTest(props) {
  return <div>{props.message}</div>;
}

function MyTextBox(props) {
  return <input type="checkbox"  defaultChecked={props.autocomplete} />
}


// 아래의 두 컴포넌트는 동일함.
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};

  return <Greeting {...props} />;
}

function Greeting(props) {
  return <div>{props.lastName}, {props.firstName}</div>;
}

const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";

  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
}

ReactDOM.render(
  <>
    <MyComponent foo={ 1 + 2 + 3 + 4 } />
    <hr />
    <NumberDescripber number={5} />
    <NumberDescripber number={6} />
    <hr />
    {/* 아래의 두 값은 동일 */}
    <StringTest message="hello world" />
    <StringTest message={"hello world"} />
    <hr />
    {/* 아래의 두 값은 동일, 문자열 리터럴을 넘기는 경우 HTML 이스케이프 처리가 되지 않음. */}
    <StringTest message="&lt;3" />
    <StringTest message={'<3'} />
    <hr />
    <MyTextBox autocomplete />
    <MyTextBox autocomplete={true} />
    <MyTextBox autocomplete={false} />
    <hr />
    <App1 />
    <App2 />
    <hr />
    <App />
  </>,
  document.getElementById('root')
)