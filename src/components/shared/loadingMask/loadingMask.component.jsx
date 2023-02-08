import React from "react";
import styles from "./loadingMask.module.scss";

export default function LoadingMask() {
  return (
    <div className={styles.LoadingMask}>
      <img src="loading.gif" alt="" />
    </div>
  );
}
