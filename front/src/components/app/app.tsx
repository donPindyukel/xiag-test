import React from "react";
import "./styles.css";
import { CreateQuestion, Poll } from "../pages";
import { Header } from "Elements";
import { BrowserRouter, Route } from "react-router-dom";

export class App extends React.Component<{}> {
  render() {
    return (
      <div className="app-wrap">
        <Header/>
        <BrowserRouter>
          <Route path="/" exact component={CreateQuestion} />
          <Route path="/:pollId" component={Poll} />
        </BrowserRouter>
      </div>
    );
  }
}
