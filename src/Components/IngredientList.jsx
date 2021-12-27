import React from "react";
//Components import
import Ingredient from "./Ingredient";

const IngredientList = (props) => {
  return (
    <>
      {props.ingredients.map((i) => (
        <Ingredient
          key={i.Id}
          Id={i.Id}
          Name={i.Name}
          ImgUrl={i.ImgUrl}
          Calories={i.Calories}
        />
      ))}
    </>
  );
};

export default IngredientList;
