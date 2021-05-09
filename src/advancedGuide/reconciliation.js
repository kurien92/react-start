import React from 'react';
import ReactDOM from 'react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {
    return <button id="btn" type="button" onClick={this.handleClick}>{this.props.count}</button>
  }
}


// 부모 엘리먼트(div -> span)가 변경되면 하위 엘리먼트도 함께 재렌더링 됨.
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => {
      return {count: state.count+1}
    });
  }

  render() {
    let counters = <Counter handleClick={this.handleClick} count={this.state.count} />;

    let test = (
      <div>
        {counters}
      </div>
    )

    if(this.state.count > 5) {
      test = (
        <span>
          {counters}
        </span>
      )
    }
    return test;
  }
}

// 상태가 바뀌더라도 바뀌는 부분만 변경됨.
class PropertyChange extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      className: "default"
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((state) => {
      return {
        className: e.target.value
      }
    });
  }

  render() {
    return (
      <input
        type="text"
        id="input"
        onChange={this.handleChange}
        className={this.state.className}
        defaultValue={this.state.className}
      />
    );
  }
}

class StyleChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((state) => {
      return {
        color: e.target.value
      }
    });
  }

  render() {
    return (
      <input type="text" id="styleChange" onChange={this.handleChange} style={{color: this.state.color, fontWeight: 'bold'}} />
    );
  }
}

// key를 써야 효율적으로 동작함.
// list 순서 인덱스를 key로 사용하는 경우 순서 변경 혹은 삭제 처리 시 문제가 발생할 수 있음.
// key는 반드시 변하지 않고, 예상 가능하며, 유일해야 한다.
class ListChange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      list: [{id: 0, text: "test"}]
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  deleteRow(id, e) {
    this.setState((state) => {
      console.log(state.list, id);
      const list = state.list.filter((item) => id !== item.id);

      console.log(list);
      return {
        list: list
      }
    })
  }

  handleKeyUp(e) {
    if(e.keyCode !== 13) {
      return;
    }

    const text = e.target.value;
    e.target.value = "";
    
    this.setState((state) => {
      const list = state.list;
      list.push({id: state.index, text: text});

      return {
        index: state.index + 1,
        list: list
      }
    });
  }

  render() {
    const list = this.state.list.map((data) => {
      return <li key={data.id} data-id={data.id} onClick={this.deleteRow.bind(this, data.id)}>{data.text}</li>;
    });

    return (
      <>
        <ul>
          {list}
        </ul>
        <input type="text" onKeyUp={this.handleKeyUp} />
      </>
    )
  }
}

class KeysTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    if(e.keyCode !== 13) {
      return;
    }

    const text = e.target.value;
    e.target.value = "";

    const data = text.split(",");
    
    this.setState((state) => {
      state.list.push({id: data[0], text: data[1]});

      const list = state.list.sort(function(item1, item2) {
        if(item1.id === item2.id) {
            return 0;
        }
    
        return item1.id > item2.id ? 1 : -1;
      });

      return {
        list: list
      }
    });
  }

  render() {
    const list = this.state.list.map((item) => {
      return <li key={item.id}>{item.id}, {item.text}</li>;
    });

    return (
      <>
      <ul>
        {list}
      </ul>
      <hr />
      <input type="text" onKeyUp={this.handleKeyUp} />
      </>
    );
  }
}

ReactDOM.render(
  <>
    <App />
    <hr />
    <PropertyChange />
    <hr />
    <StyleChange />
    <hr />
    <ListChange />
    <hr />
    <KeysTest />
  </>,
  document.getElementById('root')
)