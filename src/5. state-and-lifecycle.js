import React from 'react'
import ReactDOM from 'react-dom'

// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick() {
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
//   )
// }

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
          <div>
            <h1>Hello, world!</h1>
            <FormattedDate date={this.state.date} />
          </div>
    );
  }
}

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)