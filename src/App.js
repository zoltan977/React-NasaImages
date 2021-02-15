import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Gallery from './components/gallery/gallery';

function App() {

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT`)
    .then(response => response.json())
    .then(json => {
      console.log(json);

      if (json.hasOwnProperty("code") && json.code === 404)
        setContent(<p>{json.msg}</p>);
      else {
        setTitle(json.title);
        setDescription(json.explanation);
  
        if (json.hasOwnProperty("media_type") && json.media_type === "video")
          setContent(<iframe src={`${json.url}?autoplay=1&mute=1`}>
                    </iframe>
          );
        else
          setContent(<img
                      src={`${json.url}`} />
          );
      }

    });
  }, [date]);


  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">Home</Link> | <Link to="/gallery">Gallery</Link>
        </header>
        <Route exact path="/" render={props => (
          <React.Fragment>
            <input type="date" name="datePicker" id="datePicker" value={date} onChange={onChange}/>
            <div className="imageWithDescription">
              <h2>{title}</h2>
              <div className="image">
                {content}
              </div>
              <div className="description">
                {description}
              </div>
            </div>
          </React.Fragment>
        )} />
        <Route exact path="/gallery" component={Gallery} />
      </div>
    </Router>
  );
}

export default App;
