import styles from "./content-card.module.scss";
import classnames from "classnames";
import React, { useState } from "react";
import Content from "../content/content";

export default function ContentCard({ data }) {
  const [showExplanation, setShowExplanation] = useState("");

  const onTransitionEnd = (e) => {
    e.stopPropagation();
    if (showExplanation === "hide") {
      setShowExplanation("");
    }
  };
  
  const showHide = (prev) => {
    if (prev === "") {
      return "show";
    } else if (prev === "show") {
      return "hide";
    } else if (prev === "hide") {
      return "show";
    }
  };

  return (
    <div className={styles.ContentCard}>
      <h2 onClick={(e) => setShowExplanation((prev) => showHide(prev))}>
        {data?.title}
      </h2>
      <div className={styles.content}>
        <Content data={data} isClickable={true}></Content>
        <p
          onTransitionEnd={onTransitionEnd}
          className={classnames(styles.info, {
            [styles.show]: showExplanation === "show",
            [styles.hide]: showExplanation === "hide",
          })}
        >
          {data?.explanation}
        </p>
      </div>
    </div>
  );
}
