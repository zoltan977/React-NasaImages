import React, { useState, useEffect } from "react";
import "./gallery.css";
import Item from "./item/item";
import Popup from "./popup/popup";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedImage) setShowPopup(true);
  }, [selectedImage]);

  useEffect(() => {
    if (!showPopup) {
      setTimeout(() => {
        setSelectedImage(null);
      }, 1000);
    }
  }, [showPopup]);

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?count=9&api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT`
      );

      const json = await response.json();

      setData(json);
    };

    asyncFn();
  }, []);

  return (
    <div
      className="Gallery"
      style={{
        backgroundImage: 'url("bkg2.jpg")',
        backgroundSize: "cover",
      }}
    >
      <Popup
        selectedImage={selectedImage}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      {data.map((imgData, idx) => (
        <Item
          key={idx}
          imageData={imgData}
          setSelectedImage={setSelectedImage}
        />
      ))}
    </div>
  );
}
