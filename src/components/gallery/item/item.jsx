import React from "react";
import "./item.css";

export default function Item({ imageData, setSelectedImage }) {
  return (
    <div className="Item" onClick={(e) => setSelectedImage(imageData)}>
      {imageData.media_type && imageData.media_type === "video" ? (
        <iframe
          title={imageData.title}
          src={`${imageData.url}?autoplay=1&mute=1`}
        ></iframe>
      ) : (
        <img alt="" src={`${imageData.url}`} />
      )}
    </div>
  );
}
