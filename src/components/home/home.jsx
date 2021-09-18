import "./home.css";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionClass, setDescriptionClass] = useState("description");
  const [imageWithDescriptionClass, setImageWithDescriptionClass] = useState(
    "imageWithDescription"
  );

  const componentRef = useRef();
  const contentRef = useRef();

  const animate = (out) => {
    if (!contentRef.current || !componentRef.current) return;

    const node = contentRef.current;
    const nodeInfo = node.getBoundingClientRect();
    const clonedNode = node.cloneNode(true);
    const parent = componentRef.current;

    if (out) setImageWithDescriptionClass("imageWithDescription hide");

    parent.insertBefore(clonedNode, parent.firstElementChild);

    clonedNode.style.position = "fixed";
    clonedNode.style.zIndex = 2;

    if (out) clonedNode.style.left = Math.floor(nodeInfo.left) + "px";
    else {
      clonedNode.style.visibility = "visible";
      clonedNode.style.left = "-70%";
    }

    clonedNode.style.top = Math.floor(nodeInfo.top) + "px";
    clonedNode.style.transition = "left 2s";

    setTimeout(() => {
      if (out) clonedNode.style.left = "100%";
      else clonedNode.style.left = Math.floor(nodeInfo.left) + "px";
    }, 100);

    setTimeout(() => {
      clonedNode.remove();

      if (!out) setImageWithDescriptionClass("imageWithDescription");
    }, 2100);
  };

  const callingTheAPI = async () => {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT`
    );

    const json = await response.json();
    console.log(json);

    if (json.code && json.msg) {
      setTitle("");
      setDescription("");
      setContent(<p>{json.msg}</p>);
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
  };

  const prev = (e) => {
    if (imageWithDescriptionClass.includes("hide"))
      return;

    setDate((prevDate) =>
      new Date(prevDate).toString() === "Invalid Date"
        ? new Date().toISOString().slice(0, 10)
        : new Date(new Date(prevDate).getTime() - 1 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
    );
    animate(true);
    callingTheAPI();
  };

  const next = (e) => {
    if (imageWithDescriptionClass.includes("hide"))
      return;

    setDate((prevDate) =>
      new Date(prevDate).toString() === "Invalid Date"
        ? new Date().toISOString().slice(0, 10)
        : new Date(new Date(prevDate).getTime() + 1 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
    );
    animate(true);
    callingTheAPI();
  };

  const onChange = (e) => {
    setDate(
      new Date(e.target.value).toString() === "Invalid Date"
        ? new Date().toISOString().slice(0, 10)
        : e.target.value
    );
  };

  useEffect(() => {
    animate(false);
  }, [content]);

  useEffect(() => {
    animate(true);
    callingTheAPI();
  }, []);

  return (
    <div
      className="Home"
      style={{
        backgroundImage: 'url("bkg.jpg")',
        backgroundSize: "cover",
      }}
      ref={componentRef}
    >
      <div className="dashboard">
        <button
          disabled={imageWithDescriptionClass.includes("hide")}
          onClick={prev}
        >
          -
        </button>
        <div>
          <input
            disabled={imageWithDescriptionClass.includes("hide")}
            type="date"
            value={date}
            onChange={onChange}
          />
          <button
            disabled={imageWithDescriptionClass.includes("hide")}
            onClick={(e) => {
              animate(true);
              callingTheAPI();
            }}
          >
            Set
          </button>
        </div>
        <button
          disabled={imageWithDescriptionClass.includes("hide")}
          onClick={next}
        >
          +
        </button>
      </div>
      <div className="content">
        <span onClick={prev}>{"\u21e6"}</span>
        <div className={imageWithDescriptionClass} ref={contentRef}>
          {title && (
            <h2
              onClick={(e) =>
                descriptionClass.includes("show")
                  ? setDescriptionClass("description")
                  : setDescriptionClass("description show")
              }
            >
              {title}
            </h2>
          )}
          <div className="image">
            {content}
            {description && <div className={descriptionClass}>{description}</div>}
          </div>
        </div>
        <span onClick={next}>{"\u21e8"}</span>
      </div>
    </div>
  );
}
