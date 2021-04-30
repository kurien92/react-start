import { ThemeContext } from './theme-context';

function ThemeTogglerButton() {
  // ThemeTogglerButton은 context로부터
  // theme 값과 함께 toggleTheme 메서드도 받고 있습니다.

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default ThemeTogglerButton;