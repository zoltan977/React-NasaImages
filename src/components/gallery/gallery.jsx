import React, { useState, useEffect } from 'react';
import './gallery.css';

export default function Gallery() {

    const [stateImages, setStateImages] = useState([]);
    const [stateImagesData, setStateImagesData] = useState([]);
    const [popup, setPopup] = useState(null);

    const onClick = (idx) => {

        const close = (e) => {
            setPopup(null);
        };

        setPopup(
        <div className="popup">
            <span className="close" onClick={close}>X</span>
            <h2>{stateImagesData[idx].title}</h2>
            {stateImages[idx]}    
            <p>{stateImagesData[idx].explanation}</p>
        </div>);
    };

    useEffect(() => {
        let images = [];
        let imagesData = [];

        fetch(`https://api.nasa.gov/planetary/apod?count=9&api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT`)
        .then(response => response.json())
        .then(json => {
          //console.log(json)
    
          for (const imageData of json) {
            
            if (imageData.hasOwnProperty("media_type") && imageData.media_type === "video")
                images.push(
                    <iframe src={`${imageData.url}?autoplay=1&mute=1`}>
                    </iframe>
                );
            else
                images.push(
                    <img src={`${imageData.url}`} />
                );      

            imagesData.push(imageData);
          }
          console.log(images);
          console.log(imagesData);
          
          setStateImages(images);
          setStateImagesData(imagesData);
        });
    }, []);

    return (
        <div className="gallery">
            {
                popup
            }
            {
                stateImages.map((img, idx) => 
                <div key={idx} className="imageDiv" onClick={(e) => {onClick(idx)}}>
                    {img}
                </div>)
            }
        </div>
    )
}
