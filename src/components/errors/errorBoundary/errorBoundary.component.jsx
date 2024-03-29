import React from "react";
import classes from "./errorBoundary.module.scss";

class ErrorBoundary extends React.Component {
  state;

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <section className={classes.ErrorBoundary}>
          <div>
            <h2>Hoppá valami elromlott!</h2>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
            </details>
          </div>
        </section>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
