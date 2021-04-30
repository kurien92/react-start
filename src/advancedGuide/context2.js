import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';
import ThemeTogglerButton from './theme-toggler-button';

// ThemedButton을 사용하는 중간에 있는 컴포넌트
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   theme: themes.light
    // };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark
      }));
    }

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }

  render() {
    // ThemeProvider 안에 있는 ThemedButton은 state로부터 theme 값을 읽지만
    // Provider 밖에 있는 ThemedButton은 기본값인 dark를 사용합니다.
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>

        <Section>
          <ThemedButton>
            Test
          </ThemedButton>
        </Section>

        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>
      </Page>
    )
  }
}

function Page(props) {
  return (<div>{props.children}</div>);
}

function Section(props) {
  return (<div>{props.children}</div>);
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)