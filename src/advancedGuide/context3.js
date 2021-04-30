import React from 'react';
import ReactDOM from 'react-dom'

const ThemeContext = React.createContext('light');

const UserContext = React.createContext({
  name: 'Guest',
  id: '1'
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    const {signedInUser, theme} = props;

    this.state = {
      theme: theme,
      signedInUser: signedInUser
    }

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(e) {
    this.setState((state) => {
      return {
        signedInUser: {
        name: e.target.value,
        id: state.signedInUser.id
      }
    }});
  }


  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <UserContext.Provider value={this.state.signedInUser}>
          <Layout inputChangeHandler={this.inputChangeHandler} />
        </UserContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

function Layout(props) {
  return (
    <div>
      <Sidebar />
      <Content inputChangeHandler={props.inputChangeHandler} />
    </div>
  );
}

function Sidebar() {
  return <div>sidebar</div>;
}

function Content(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <>
              <ProfilePage user={user} theme={theme} />
              <br/>
              <input type="text" onChange={props.inputChangeHandler}/>
            </>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

function ProfilePage(props) {
  return <div>{props.user.name} / {props.user.id} / {props.theme}</div>
}

ReactDOM.render(
  <App signedInUser={{name: "kurien", id: "2"}} theme="dark" />,
  document.getElementById('root')
)