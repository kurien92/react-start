import React, { forwardRef } from 'react'

class FancyButtonHoc extends React.Component {
    render() {
        return (
            <button label={this.props.label} className="FancyButtonHoc">
              {this.props.children}
            </button>
        );
    }
}

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;
        
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  function forwardRef(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
  }

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

export default logProps(FancyButtonHoc);