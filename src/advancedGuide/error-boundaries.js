import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if(this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function logErrorToMyService(error, errorInfo) {
  console.log(error, errorInfo);
}

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MyWidget />
      </ErrorBoundary>
    );
  }
}

class MyWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      count: 0
    }
  }

  // 마운트 1초 후 오류 발생
  componentDidMount() {
    setTimeout(() => {
      // this.setState({count: 1})
      try {
        throw new Error("zzz");
      } catch(error) {
        this.setState({error});
      }
    }, 1000);
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    if (this.state.count === 1) {
      throw new Error("Oh my god!");
    }

    return (
      <div>
        test
      </div>
    );

  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)