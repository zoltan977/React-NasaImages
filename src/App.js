import './App.css';
import { useState, useEffect } from 'react';

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

      if (json.hasOwnProperty("media_type") && json.media_type === "video")
        setContent(<iframe src={`${json.url}?autoplay=1&mute=1`}>
                  </iframe>
        );
      else
        setContent(<img
                    src={`${json.url}`}>
                  </img>
        );

      setTitle(json.title);
      setDescription(json.explanation);

    });
  }, [date]);


  return (
    <div className="App">
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
    </div>
  );
}

export default App;
