import "animate.css/animate.min.css";
import styles from "./home.module.scss";
import classnames from "classnames";
import env from "react-dotenv";
import React, { useState, useEffect, useRef } from "react";
import httpClient from "../../utils/httpClient";
import ContentCard from "../shared/contentCard/contentCard.component";
import getAPImessage from "../../utils/getAPImessage";
import {Resizable} from 're-resizable';

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState(null);
  const [animationState, setAnimationState] = useState("");
  const [animateLeft, setAnimateLeft] = useState(true);

  const resizableRef = useRef();

  const onAnimationEnd = (e) => {
    if (e.animationName.includes("Out")) {
      setAnimationState("flyIn");
    } else {
      setAnimationState("");
    }
    resizableRef.current.updateSize({width: '70vw', height: 'auto'})
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

      setContent({
        title: "",
        url: "",
        explanation: getAPImessage(error),
      });
      return;
    }

    setContent(json);
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
        <Resizable ref={resizableRef}
          className={classnames(styles.cardContainer, {
            ["animate__animated"]: animationState,
            ["animate__faster"]: animationState,
            [`animate__bounce${animateLeft ? "InRight" : "InLeft"}`]:
              animationState === "flyIn",
            [`animate__bounce${animateLeft ? "OutLeft" : "OutRight"}`]:
              animationState === "flyOut",
          })}
          onAnimationEnd={onAnimationEnd}
        >
          <ContentCard data={content}></ContentCard>
        </Resizable>
        <span onClick={() => increaseDecreaseDate(true)}>{"\u21e8"}</span>
      </div>
    </div>
  );
}
