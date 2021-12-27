// Submittion:
// Elad Cohen       316166974
// Nofar Levy       208289504
// Chen Shusterman  311571129

import React from "react";
//Our css
import "../css/home.css";
//hooks
import { useNavigate } from "react-router-dom";
//Our styled components
import { HomeTitle } from "../Elements/Titles";
//MUI imports

const Home = () => {
  //navigation handling
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div className="firstRow">
        <HomeTitle>Welcome to Recipe4Me!</HomeTitle>
      </div>
      <div className="secondRow">
        <div></div>
        <div>
          <button
            onClick={() => navigate("recipes")}
            className="home-btn go-to-rec-btn"
          >
            Recipes
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("ingredients")}
            className="home-btn go-to-ing-btn"
          >
            Ingredients
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
