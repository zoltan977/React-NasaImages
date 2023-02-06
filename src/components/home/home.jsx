import "animate.css/animate.min.css";
import styles from "./home.module.scss";
import classnames from "classnames";
import env from "react-dotenv";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [nextContent, setNextContent] = useState(null);
  
  const [currentContent, setCurrentContent] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const [shiftLeft, setShiftLeft] = useState(true);
  const [isContentOut, setIsContentOut] = useState(false);

  const contentRef = useRef();

  const callAPI = async () => {
    setShowContent(false);
    setNextContent(null);

    let response;
    let json;
    try {
      response = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${env.API_KEY}`
      );
      console.log("response: ", response);
      json = await response.json();
      console.log("json: ", json);
    } catch (error) {
      setTitle("");
      setDescription("");
      setNextContent(<p>Valami hiba történt</p>);

      return Promise.reject(response);
    }

    if ((json.code && json.msg) || (json.error && json.error.message)) {
      setTitle("");
      setDescription("");
      setNextContent(<p>{json.msg || json.error.message}</p>);
    } else {
      setTitle(json.title);
      setDescription(json.explanation);

      if (json.media_type && json.media_type === "video")
        setNextContent(
          <iframe
            title={json.title}
            src={`${json.url}?autoplay=1&mute=1`}
          ></iframe>
        );
      else setNextContent(<img alt="" src={`${json.url}`} />);
    }
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
    if (isContentOut && nextContent) {
      setCurrentContent(nextContent);
      setNextContent(null);
      setShowContent(true);
    }
  }, [isContentOut, nextContent]);

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
        <button onClick={() => increaseDecreaseDate()}>-</button>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(checkDate(e.target.value))}
          />
          <button onClick={() => callAPI()}>Set</button>
        </div>
        <button onClick={() => increaseDecreaseDate(true)}>+</button>
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
          onExited={() => setIsContentOut(true)}
          onEntered={() => setIsContentOut(false)}
        >
          <div className={styles.imageWithDescription} ref={contentRef}>
            {title && (
              <h2 onClick={() => setShowDescription((prev) => !prev)}>
                {title}
              </h2>
            )}
            <div className={styles.image}>
              {currentContent}
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
