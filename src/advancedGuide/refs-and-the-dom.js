import React from 'react';
import ReactDOM from 'react-dom'

// DOM 노드에 대한 참조를 저장하기 위해 ref를 사용합니다.
class CustomTextInput1 extends React.Component {
  constructor(props) {
    super(props);

    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
    // 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
    this.textInput.current.focus();
  }

  render() {
    // React에게 우리가 text 타입의 input 엘리먼트를
    // 우리가 생성자에서 생성한 `textInput` ref와 연결하고 싶다고 이야기합니다.
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput1 ref={this.textInput} />
    );
  }
}

// 함수 컴포넌트는 인스턴스가 없기 때문에 함수 컴포넌트에 ref 어트리뷰트를 사용할 수 없습니다.
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    // 이 코드는 동작하지 않습니다.
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}


function CustomTextInput2(props) {
  // textInput은 ref 어트리뷰트를 통해 전달되기 위해서
  // 이곳에서 정의되어야만 합니다.
  const textInput = React.useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  )
}

function CustomTextInput3(props) {
  return (
    <div>
      <input ref={props.inputRef} onBlur={props.handleBlur} />
    </div>
  );
}

class Parent2 extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    const text = this.inputElement.current.value;
    this.inputElement.current.value = text + 1;
  }

  render() {
    return (
      <CustomTextInput3 inputRef={this.inputElement} handleBlur={this.handleBlur} />
    );
  }
}

class Grantparent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    const text = this.inputElement.current.value;
    this.inputElement.current.value = text + 1;
  }

  render() {
    return (
      <Parent3 inputRef={this.inputElement} handleBlur={this.handleBlur} />
    );
  }
}

function Parent3(props) {
  return (
    <div>
      My input: <CustomTextInput3 inputRef={props.inputRef} handleBlur={props.handleBlur} />
    </div>
  )
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const text = this.myRef.current.value;

    if(text === "") {
      this.myRef.current.focus();
      alert("내용을 입력해주세요.")
      return;
    }

    alert(text);
  }

  render() {
    return (
      <div>
        <Input myRef={this.myRef} />
        <Button clickHandler={this.handleClick} />
      </div>
    );
  }
}

function Input(props) {
  return (
    <input type="text" ref={props.myRef} />
  );
}

function Button(props) {
  return (
    <button type="button" onClick={props.clickHandler}>
      Button
    </button>
  );
}

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton" onClick={props.handleClick}>
    {props.children}
  </button>
));

const ref = React.createRef();

function handleClick(e) {
  alert("button click");
}

class CustomTextInput4 extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
    this.focusTextInput();
  }

  render() {
    // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
    // (예를 들어 `this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

function CustomTextInput5(props) {
  return (
    <div>
      <input ref={props.inputRef} onClick={props.handleClick} />
    </div>
  );
}

class Parent4 extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.inputElement);
    alert(this.inputElement.value);
  }

  render() {
    return (
      <CustomTextInput5
        inputRef={el => this.inputElement = el}
        handleClick={this.handleClick}
      />
    );
  }
}


ReactDOM.render(
  <>
    <AutoFocusTextInput />
    <hr/>
    <CustomTextInput2 />
    <hr />
    <Parent2 />
    <hr />
    <Grantparent />
    <hr />
    <MyComponent />
    <hr />
    <FancyButton ref={ref} handleClick={handleClick}>
      Click me!
    </FancyButton>
    <hr />
    <CustomTextInput4 />
    <hr />
    <Parent4 />
  </>,
  document.getElementById('root')
)