import "animate.css/animate.min.css";
import styles from "./home.module.scss";
import classnames from "classnames";
import env from "react-dotenv";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import httpClient from './../../shared/httpClient'

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [content, setContent] = useState(null);

  const [showContent, setShowContent] = useState(true);
  const [shiftLeft, setShiftLeft] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const contentRef = useRef();

  const callAPI = async () => {
    if (isAnimating) return;

    setShowContent(false);

    let response;
    let json;
    try {
      response = await httpClient.get(
        `?date=${date}&api_key=${env.API_KEY}`
      );
      console.log("response: ", response);
      json = response.data;
      console.log("json: ", json);
    } catch (error) {
      setTitle("");
      setDescription("");
      setContent(<p>{error.msg || error.message || 'Valami hiba történt'}</p>);

      return;
    }

    if ((json.code && json.msg) || (json.error && json.error.message)) {
      setTitle("");
      setDescription("");
      setContent(<p>{json.msg || json.error.message}</p>);
    } else {
      setTitle(json.title);
      setDescription(json.explanation);

      if (json.media_type && json.media_type === "video")
        setContent(
          <iframe
            title={json.title}
            src={`${json.url}?autoplay=1&mute=1`}
          ></iframe>
        );
      else setContent(<img alt="" src={`${json.url}`} />);
    }

    setShowContent(true);
  };

  const checkDate = (value) => {
    const dateToSet = new Date(value);
    const currentDate = new Date(date);
    setShiftLeft(dateToSet < currentDate ? true : false);

    return dateToSet.toString() === "Invalid Date"
      ? new Date().toISOString().slice(0, 10)
      : dateToSet.toISOString().slice(0, 10);
  };

  const increaseDecreaseDate = (increase = false) => {
    if (isAnimating) return;

    const lengthOfOneDayInMiliseconds = 24 * 60 * 60 * 1000;
    const value = increase
      ? lengthOfOneDayInMiliseconds
      : -1 * lengthOfOneDayInMiliseconds;
    setDate((prevDate) => {
      const prevDateTimeStamp = new Date(prevDate).getTime();
      const nextDateTimeStamp = prevDateTimeStamp + value;
      return checkDate(nextDateTimeStamp);
    });
  };

  useEffect(() => {
    callAPI();
  }, [date]);

  return (
    <div
      className={styles.Home}
      style={{
        backgroundImage: 'url("bkg.jpg")',
        backgroundSize: "cover",
      }}
    >
      <div className={styles.dashboard}>
        <button onClick={() => increaseDecreaseDate()} disabled={isAnimating}>
          -
        </button>
        <div>
          <input
            disabled={isAnimating}
            type="date"
            value={date}
            onChange={(e) => !isAnimating && setDate(checkDate(e.target.value))}
          />
          <button onClick={() => callAPI()} disabled={isAnimating}>
            Set
          </button>
        </div>
        <button
          onClick={() => increaseDecreaseDate(true)}
          disabled={isAnimating}
        >
          +
        </button>
      </div>
      <div className={styles.content}>
        <span onClick={() => increaseDecreaseDate()}>{"\u21e6"}</span>
        <CSSTransition
          in={showContent}
          timeout={500}
          nodeRef={contentRef}
          classNames={{
            enter: `animate__animated animate__bounce${
              shiftLeft ? "InRight" : "InLeft"
            }`,
            enterDone: `animate__animated animate__bounce${
              shiftLeft ? "InRight" : "InLeft"
            }`,
            exit: `animate__animated animate__bounce${
              shiftLeft ? "OutLeft" : "OutRight"
            }`,
          }}
          onExit={() => setIsAnimating(true)}
          onEntered={() => setIsAnimating(false)}
        >
          <div className={styles.imageWithDescription} ref={contentRef}>
            {title && (
              <h2 onClick={() => setShowDescription((prev) => !prev)}>
                {title}
              </h2>
            )}
            <div className={styles.image}>
              {content}
              {description && (
                <div
                  className={classnames(styles.description, {
                    [styles.show]: showDescription,
                  })}
                >
                  {description}
                </div>
              )}
            </div>
          </div>
        </CSSTransition>
        <span onClick={() => increaseDecreaseDate(true)}>{"\u21e8"}</span>
      </div>
    </div>
  );
}
