import styles from "./content.module.scss";
import React from "react";
import classnames from 'classnames';

export default function Content({ data, isClickable }) {
  return (
    data && (
      <div className={styles.Content}>
        {data.media_type && data.media_type === "video" ? (
          <iframe className={classnames({[styles.isClickable]: isClickable})}
            title={data.title}
            src={`${data.url}?autoplay=1&mute=1`}
          ></iframe>
        ) : (
          <img alt="" src={`${data.url}`} />
        )}
      </div>
    )
  );
}
