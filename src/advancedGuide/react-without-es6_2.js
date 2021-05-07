import React from 'react';
import ReactDOM from 'react-dom'

// mixin 방식은 사용하지 말고 참고용으로만 볼 것!!!
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
}

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // mixin을 사용
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // mixin에서 메서드 호출
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticktockListCount: 0
    }

    this.createTickTock = this.createTickTock.bind(this);
  }

  componentDidMount() {
    setInterval(this.createTickTock, 1000);
  }

  createTickTock() {
    this.setState((state) => {
      console.log(state);
      return {ticktockListCount: state.ticktockListCount+1}
    });
  }

  render() {
    const ticktockListCount = this.state.ticktockListCount;
    const ticktockList = [];

    for(let i = 0; i < ticktockListCount; i++) {
      ticktockList.push(<TickTock />);
    }

    return (
      <div ref={(el) => this.el = el}>
        {ticktockList}
      </div>
    );
  }
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
)