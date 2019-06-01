import * as React from "react";
import { Provider } from "react-redux";
import { App } from "Components/app";

export default class Root extends React.Component {
  render() {
    return (
        <App />
    );
  }
}
