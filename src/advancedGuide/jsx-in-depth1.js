import React from 'react'; // JSX를 사용하기 위해 Import를 해야 함.
import ReactDOM from 'react-dom';
import CustomButton from './CustomButton';
import { PhotoStory, VideoStory } from './stories';

// 아래의 두 코드는 동일
function MyButton(props) {
  return <button type="button" {...props}>{props.children}</button>
}

<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'ClickMe'
);


// 아래의 두 코드는 동일
<div className="sidebar" />

React.createElement(
  'div',
  {className: 'sidebar'}
);


function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return (
    <CustomButton color="red">
      Test
    </CustomButton>
  );
}

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

// 실패, 컴포넌트명은 대문자로 시작해야 한다.
// function hello(props) {
//   정상, 소문자로 시작하며 HTML이 맞기 때문에 정상 동작
//   return <div>Hello {props.toWhat}</div>;
// }

// 개선
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

// 정상, 컴포넌트명이 대문자로 시작하고 있음.
// function HelloWorld() {
//   실패, 컴포넌트 명이 대문자가 아니므로 HTML 태그로 인식 함.
//   return <hello toWhat="World" />;
// }

// 개선
function HelloWorld() {
  return <Hello toWhat="World" />;
}

const components = {
  photo: PhotoStory,
  video: VideoStory
};

// 실패, JSX 타입은 표현식으로 사용할 수 없음.
// function Story(props) {
//   return <components[props.storyType] story={props.story} />;
// }

function Story(props) {
  // 정상, 대문자로 시작하는 변수는 JSX 타입으로 사용 가능.
  const SpecificStory = components[props.storyType];

  return <SpecificStory story={props.story} />;
}

ReactDOM.render(
  <>
    <WarningButton />
    <hr />
    <BlueDatePicker />
    <hr />
    <Story storyType={"photo"} story={"photo story content"} />
    <Story storyType={"video"} story={"video story content"} />
  </>,
  document.getElementById('root')
)