import React from "react";
import RecipesList from "./RecipesList";
//hooks
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//Button MUI import
import Button from "@mui/material/Button";
//Dialog MUI import
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
//Ingredients select MUI  List
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
//Our styled components
import { PageContainer, ListContainer } from "../Elements/Containers";
import { PageTitle } from "../Elements/Titles";
//API Urls import
import { apiUrl_GetRec, apiUrl_PostRec, apiUrl_GetIng } from "../ApiUrl";

const Recipes = () => {
  //open Create Recipe Dialog states
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  //get the data from react router navigation
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  //rendering recipes
  useEffect(() => {
    //GET Recipes list
    fetch(apiUrl_GetRec, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch getRecipes= ", result);
          setRecipes(result);
          result.map((r) => console.log(r.Name));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );

    //GET Ingredients list
    fetch(apiUrl_GetIng, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch getIngredients= ", result);
          setIngredients(result);
          result.map((r) => console.log(r.Name));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }, []);

  // ~~~ Form handling ~~~
  //handle ingredients selection
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [time, setTime] = useState(0);
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //Submit form - add the new recipe created
  const handleSubmit = (e) => {
    e.preventDefault();
    //validation
    if (!name) {
      setMsg("You forgot the recipe name!");
      return;
    }
    if (!cookingMethod) {
      setMsg("You forgot the cooking method!");
      return;
    }
    if (!time || time <= 0) {
      setMsg("Preperation time must be at least 1 minute");
      setTime(0);
      return;
    }
    if (checked.length < 1) {
      setMsg("Choose at least 1 ingredient");
      return;
    }
    setMsg("");

    //recipe object creation
    let newRec = {
      Name: name,
      ImgUrl: img,
      CookingMethod: cookingMethod,
      CookMinutesTime: time,
      IngredientsList: ingredients.filter((i) => checked.includes(i.Id)),
    };
    console.log(newRec);

    //clean the checked ingredients field - all other fields clean auto
    setChecked([]);

    //close create recipe dialog
    setOpenCreateRecipe(false);

    //Update the new Recipe in the recipes list
    fetch(apiUrl_PostRec, {
      method: "POST",
      body: JSON.stringify(newRec),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          setRecipes(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  // ~~~ /Form handling ~~~

  return (
    <>
      <Button onClick={() => navigate("/")}>Back to Menu</Button>
      <PageContainer>
        <header>
          <PageTitle>Recipes</PageTitle>
        </header>
        <div style={{ margin: "auto" }}>
          {/** Rendering the Recipe List Component */}
          <ListContainer>
            <RecipesList recipes={recipes} />
          </ListContainer>
        </div>
        <div>
          <Button
            sx={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpenCreateRecipe(true)}
          >
            Create Recipe
          </Button>
        </div>

        {
          //Open create Recipe form Dialog
          openCreateRecipe && (
            <Dialog
              open={openCreateRecipe}
              onClose={() => setOpenCreateRecipe(false)}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">Create Recipe</DialogTitle>
              <form>
                <DialogContent dividers={true}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                  >
                    Please fill all of the details below
                    {/** Validation message */}
                    <br />
                    <span style={{ color: "red", fontSize: 13 }}>{msg}</span>
                  </DialogContentText>
                  {/** Form beggining */}
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    label="Recipe Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    label="Image Link"
                    variant="outlined"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    label="Cooking Method"
                    variant="outlined"
                    value={cookingMethod}
                    onChange={(e) => setCookingMethod(e.target.value)}
                    required
                  />
                  <TextField
                    sx={{ marginTop: 2, marginBottom: 5 }}
                    fullWidth
                    label="Preparation Time (in minutes)"
                    variant="outlined"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                  {/** Ingredients Selection */}
                  <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                  >
                    Choose the Ingredients:
                  </DialogContentText>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {ingredients.map((ing) => {
                      const labelId = `checkbox-list-secondary-label-${ing.Id}`;
                      return (
                        <ListItem
                          key={ing.Id}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              onChange={handleToggle(ing.Id)}
                              checked={checked.indexOf(ing.Id) !== -1}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                alt={`ingredient n°${ing.Id + 1}`}
                                src={ing.ImgUrl}
                              />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={ing.Name} />
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {ing.Calories} Calories
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="error"
                    onClick={() => {
                      setOpenCreateRecipe(false);
                      setMsg("");
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          )
        }
      </PageContainer>
    </>
  );
};

export default Recipes;
