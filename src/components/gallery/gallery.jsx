import React, { useState, useEffect } from "react";
import styles from "./gallery.module.scss";
import Item from "./item/item";
import Popup from "./popup/popup";
import LoadingMask from "../shared/loadingMask/loadingMask.component";
import httpClient from "../../shared/httpClient";
import env from "react-dotenv";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPopupClosed = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedImage) setShowPopup(true);
  }, [selectedImage]);

  useEffect(() => {
    const asyncFn = async () => {
      setLoading(true);
      const response = await httpClient(`?count=9&api_key=${env.API_KEY}`);

      const json = response.data;
      setLoading(false);

      setData(json);
    };

    asyncFn();
  }, []);

  return (
    <div
      className={styles.Gallery}
      style={{
        backgroundImage: 'url("bkg2.jpg")',
        backgroundSize: "cover",
      }}
    >
      {loading && <LoadingMask />}
      <Popup
        selectedImage={selectedImage}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        onPopupClosed={onPopupClosed}
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
