import React from "react";
//hooks imports
import { useState } from "react";
//Card MUI components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//Dialog MUI import
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
//Show Ingredients MUI  List
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
//Our css
import "../css/cards.css";

const Recipe = (props) => {
  //Show ingredients Dialog state
  const [openShowIngredients, setOpenShowIngredients] = useState(false);

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
            {props.CookingMethod}
            <br />
            <br />
            <b>Time: {props.CookMinutesTime} Minutes</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={() => setOpenShowIngredients(true)}
          >
            Show Ingredients
          </Button>
        </CardActions>
      </Card>
      {/** open Show ingredients Dialog */}
      {openShowIngredients && (
        <Dialog
          open={openShowIngredients}
          onClose={() => setOpenShowIngredients(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              This recipe includes:
            </DialogContentText>
            <List
              dense
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {props.IngredientsList.map((ing) => {
                return (
                  <ListItem key={ing.Id} sx={{ paddingTop: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={`ingredient n°${ing.Id + 1}`}
                        src={ing.ImgUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={ing.Name} />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      <p> - {ing.Calories} Calories</p>
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions sx={{ margin: "auto" }}>
            <Button
              color="error"
              onClick={() => setOpenShowIngredients(false)}
              variant="outlined"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Recipe;
