import "./header.css";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import Gallery from "./components/gallery/gallery.jsx";

function App() {
  return (
    <Router>
      <div>
        <header className="Header">
          <Link to="/">Home</Link> | <Link to="/gallery">Gallery</Link>
        </header>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/gallery" component={Gallery} />
      </div>
    </Router>
  );
}

export default App;
