import React from "react";
//Components import
import Recipe from "./Recipe";
//Our css
import "../css/cards.css";

const RecipesList = (props) => {
  return (
    <>
      {props.recipes.map((r) => (
        <Recipe
          key={r.Id}
          Name={r.Name}
          ImgUrl={r.ImgUrl}
          CookingMethod={r.CookingMethod}
          CookMinutesTime={r.CookMinutesTime}
          IngredientsList={r.IngredientsList}
        />
      ))}
    </>
  );
};

export default RecipesList;
