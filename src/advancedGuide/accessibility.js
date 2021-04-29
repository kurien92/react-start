import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

// WAI-ARIA
class WaiAria extends React.Component {
  constructor(props) {
    super(props);

    this.onchangeHandler = this.onchangeHandler.bind(this);
  }

  onchangeHandler(e) {
    console.log(e);
  }

  render() {
    const labelText = "text";
    const inputValue = "value";

    return (
      <input
        type="text"
        aria-label={labelText}
        aria-required="true"
        onChange={this.onchangeHandler}
        value={inputValue}
        name="name"
      />
    )
  }
}

// 시맨틱 HTML
function ListItem({ item }) {
  return (
    // 항목을 매핑할 때 Fragment는 반드시 `key` 프로퍼티가 있어야 합니다.
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}

// 접근성 있는 폼
function AreaInputForm() {
  return (
    <React.Fragment>
      <label htmlFor="namedInput">Name:</label>
      <input id="namedInput" type="text" name="name" />
    </React.Fragment>
  )
}

// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     // DOM 엘리먼트를 저장할 textInput이라는 ref을 생성합니다.
//     this.textInput = React.createRef();
//   }

//   focus() {
//     // DOM API를 사용해 텍스트 input에 정확히 포커스를 맞춥니다.
//     // 주의: '현재'의 DOM 노드에 접근하고 있습니다.
//     this.textInput.current.focus();
//   }

//   render() {
//     // `ref` 콜백으로 텍스트 input DOM을 저장합니다.
//     // 인스턴스 필드의 엘리먼트 (예를 들어, this.textInput)
//     return (
//       <input
//         type="text"
//         ref={this.textInput}
//       />
//     );
//   }
// }

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  render() {
    setTimeout(() => {
      this.inputElement.current.focus();
    }, 1000);

    return (
      <CustomTextInput inputRef={this.inputElement} />
    )
  }
}

// function FancyButton(props) {
//   return (
//     <button className="FancyButton">
//       {props.children}
//     </button>
//   );
// }

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();

setTimeout(function() {
  ref.current.focus();
},2000);

class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // setTimeout을 사용해 다음 순간에 팝오버를 닫습니다.
  // 엘리먼트의 다른 자식에 포커스가 맞춰져있는지 확인하기 위해 필요합니다.
  // 새로운 포커스 이벤트가 발생하기 전에 블러(blur) 이벤트가 발생해야 하기 때문입니다.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // 만약 자식이 포커스를 받으면, 팝오버를 닫지 않습니다.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React는 블러와 포커스 이벤트를 부모에 버블링해줍니다.
    return (
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    )
  }
}

ReactDOM.render(
  //Fragment
  <>
    <WaiAria />
    <hr />
    <Glossary items={[{id: 1, term: "aaa", description: "bbb"}, {id: 2, term: "ccc", description: "ddd"}]}/>
    <hr />
    <AreaInputForm />
    <hr />
    <Parent />
    <hr />
    <FancyButton ref={ref}>Click me!</FancyButton>
    <hr />
    <OuterClickExample />
    <hr />
    <BlurExample />
  </>,
  document.getElementById('root')
)