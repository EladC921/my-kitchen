import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../css/cards.css";

const Ingredient = (props) => {
  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          maxHeight: 400,
          overflow: "auto",
          width: 200,
          height: 380,
        }}
        className="card-handle-display"
      >
        <CardMedia
          component="img"
          height="140"
          image={props.ImgUrl}
          alt="recipe"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.Calories} Calories
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Ingredient;
