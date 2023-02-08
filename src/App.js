import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/home";
import Gallery from "./components/gallery/gallery.jsx";
import ErrorBoundary from "./components/errors/errorBoundary/errorBoundary";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route path="/gallery" component={Gallery} />
            <Route exact path="/">
              <Home />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
