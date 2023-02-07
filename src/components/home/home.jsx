import "animate.css/animate.min.css";
import styles from "./home.module.scss";
import classnames from "classnames";
import env from "react-dotenv";
import React, { useState, useEffect } from "react";
import httpClient from "./../../shared/httpClient";

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const [content, setContent] = useState(null);
  const [animationState, setAnimationState] = useState("");
  const [animateLeft, setAnimateLeft] = useState(true);

  const onAnimationEnd = (e) => {
    if (e.animationName.includes("Out")) {
      setAnimationState("flyIn");
    } else {
      setAnimationState("");
    }
  };

  const callAPI = async () => {
    if (animationState) return;
    setAnimationState("flyOut");

    let json;
    try {
      const response = await httpClient.get(
        `?date=${date}&api_key=${env.API_KEY}`
      );
      console.log("response: ", response);
      json = response.data;
    } catch (error) {
      console.log("error: ", error);
      setTitle("");
      setDescription("");
      setContent(
        <p>
          {error.response?.data?.msg ||
            error.response?.data?.error?.message ||
            error.message ||
            "Valami hiba történt"}
        </p>
      );
      return;
    }

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
  };

  const checkDate = (value) => {
    const dateToSet = new Date(value);
    const currentDate = new Date(date);
    setAnimateLeft(dateToSet < currentDate ? true : false);

    return dateToSet.toString() === "Invalid Date"
      ? new Date().toISOString().slice(0, 10)
      : dateToSet.toISOString().slice(0, 10);
  };

  const increaseDecreaseDate = (increase = false) => {
    if (animationState) return;

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
        <button
          onClick={() => increaseDecreaseDate()}
          disabled={animationState}
        >
          -
        </button>
        <div>
          <input
            disabled={animationState}
            type="date"
            value={date}
            onChange={(e) => setDate(checkDate(e.target.value))}
          />
          <button onClick={() => callAPI()} disabled={animationState}>
            Set
          </button>
        </div>
        <button
          onClick={() => increaseDecreaseDate(true)}
          disabled={animationState}
        >
          +
        </button>
      </div>
      <div className={styles.content}>
        <span onClick={() => increaseDecreaseDate()}>{"\u21e6"}</span>
        <div
          className={classnames(styles.imageWithDescription, {
            ["animate__animated"]: animationState,
            ["animate__faster"]: animationState,
            [`animate__bounce${animateLeft ? "InRight" : "InLeft"}`]:
              animationState === "flyIn",
            [`animate__bounce${animateLeft ? "OutLeft" : "OutRight"}`]:
              animationState === "flyOut",
          })}
          onAnimationEnd={onAnimationEnd}
        >
          {title && (
            <h2 onClick={() => setShowDescription((prev) => !prev)}>{title}</h2>
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
        <span onClick={() => increaseDecreaseDate(true)}>{"\u21e8"}</span>
      </div>
    </div>
  );
}
