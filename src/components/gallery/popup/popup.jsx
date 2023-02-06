import React, { useState } from "react";
import "./popup.css";

export default function Popup({ selectedImage, showPopup, setShowPopup }) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      className="Popup"
      style={showPopup ? { transform: "translate(-50%) scale(1)" } : {}}
    >
      <span className="close" onClick={(e) => setShowPopup(false)}>
        X
      </span>
      <h2 onClick={(e) => setShowExplanation((prev) => !prev)}>
        {selectedImage?.title}
      </h2>
      <div className="content">
        {selectedImage?.media_type === "video" ? (
          <iframe
            title={selectedImage?.title}
            src={`${selectedImage?.url}?autoplay=1&mute=1`}
          ></iframe>
        ) : (
          <img alt="" src={`${selectedImage?.url}`} />
        )}
        <p style={showExplanation ? { transform: "scale(1)" } : {}}>
          {selectedImage?.explanation}
        </p>
      </div>
    </div>
  );
}
