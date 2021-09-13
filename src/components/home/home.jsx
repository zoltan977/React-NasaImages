import './home.css';
import React, { useState, useEffect } from 'react';

export default function Home() {

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionClass, setDescriptionClass] = useState("description");
  
    const onChange = (e) => {
      setDate(e.target.value);
    };
  
    useEffect(() => {
      fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
  
          if (json.code && json.msg) {
            setTitle("");
            setDescription("");
            setContent(<p>{json.msg}</p>);
          }
          else {
            setTitle(json.title);
            setDescription(json.explanation);
  
            if (json.media_type && json.media_type === "video")
              setContent(<iframe src={`${json.url}?autoplay=1&mute=1`}></iframe>);
            else setContent(<img src={`${json.url}`} />);
          }
        });
    }, [date]);
  
    return (
        <div className="Home">

            <div>
                <button onClick={e => setDate(prev => (new Date(new Date(prev).getTime() - 1 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10))}>-</button>
                <input type="date" name="datePicker" id="datePicker" value={date} onChange={onChange}/>
                <button onClick={e => setDate(prev => (new Date(new Date(prev).getTime() + 1 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10))}>+</button>
            </div>
            <div className="imageWithDescription">
            {
                title &&
                <h2 onClick={e => descriptionClass.includes("show") ? setDescriptionClass("description") : setDescriptionClass("description show")}>{title}</h2>
            }
              <div className="image">
                {content}
                {
                    description &&
                    <div className={descriptionClass}>
                        {description}
                    </div>
                }
              </div>
            </div>
        </div>
    )
}
