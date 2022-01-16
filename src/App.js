import React, { useState, useEffect } from "react";
import Axios from "axios";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function App() {
  const [imageData, setImageData] = useState("");
  const [toggle, setToggle] = useState(
    localStorage.getItem("toggle") === "true"
  );

  useEffect(() => {
    localStorage.setItem("toggle", toggle);
  }, [toggle]);

  const toggleLike = () => {
    setToggle(!toggle);
  };

  const changeColor = toggle ? "grey" : "red";

  useEffect(() => {
    const fetchImage = () => {
      Axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=Yifzj3fA15GJ5BFvBoxKTXl8bhuBwsEKOHW1Xrgb"
      ).then(response => {
        console.log(response);
        setImageData(response.data);
        console.log("imageData", imageData);
      });
    };

    fetchImage();
  }, []);

  return (
    <div className="card">
      <img src={imageData.url} classname="cardImg" />
      <div className="container">
        <button className="likeButton" onClick={toggleLike}>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: toggle ? "red" : "grey" }}
            // onClick={toggleLike}
          />
        </button>
        <h2>Title {imageData.title}</h2>
        <p>Date {imageData.date}</p>
        <p>Description {imageData.explanation}</p>
      </div>
    </div>
  );
}
export default App;
