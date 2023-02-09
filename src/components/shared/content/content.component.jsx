import styles from "./content.module.scss";
import React, { useState } from "react";
import classnames from "classnames";

export default function Content({ data, isClickable }) {
  const [movement, setMovement] = useState(null);
  const [start, setStart] = useState(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    setStart({ x: e.clientX, y: e.clientY });
  };
  const onMouseMove = (e) => {
    setMovement({ x: e.clientX, y: e.clientY });
  };
  const onMouseUp = (e) => {
    setStart(null);
  };

  return (
    data &&
    data?.title &&
    data?.url && (
      <div className={styles.Content}>
        {data?.media_type === "video" ? (
          <iframe
            className={classnames({ [styles.isClickable]: isClickable })}
            title={data.title}
            src={`${data.url}?autoplay=1&mute=1`}
          ></iframe>
        ) : (
          <img
            alt=""
            src={`${data.url}`}
            style={
              start &&
              movement && {
                objectPosition: `calc(50% + ${
                  movement.x - start.x
                }px) calc(50% + ${movement.y - start.y}px)`,
              }
            }
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
        )}
      </div>
    )
  );
}
