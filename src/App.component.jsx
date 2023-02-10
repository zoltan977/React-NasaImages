import styles from "./App.module.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/home.component";
import Gallery from "./components/gallery/gallery.component.jsx";
import ErrorBoundary from "./components/errors/errorBoundary/errorBoundary.component";
import Navbar from "./components/navbar/navbar.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className={styles.App}>
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
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
