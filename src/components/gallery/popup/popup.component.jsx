import styles from "./popup.module.scss";
import React from "react";
import classnames from "classnames";
import ContentCard from "../../shared/content-card/content-card.component";

export default function Popup({
  selectedImage,
  showPopup,
  setShowPopup,
  onPopupClosed,
}) {
  const onTransitionEnd = (e) => {
    if (!showPopup) {
      onPopupClosed();
    }
  };

  return (
    <div
      onTransitionEnd={onTransitionEnd}
      className={classnames(styles.Popup, { [styles.showPopup]: showPopup })}
    >
      <span className={styles.close} onClick={(e) => setShowPopup(false)}>
        X
      </span>
      <ContentCard data={selectedImage}></ContentCard>
    </div>
  );
}
