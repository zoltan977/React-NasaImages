import React from "react";
import Content from "../../shared/content/content";
import styles from "./item.module.scss";

export default function Item({ imageData, setSelectedImage }) {
  return (
    <div className={styles.Item} onClick={(e) => setSelectedImage(imageData)}>
      <Content data={imageData}></Content>
    </div>
  );
}
