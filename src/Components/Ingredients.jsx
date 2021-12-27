import React from "react";
//Components import
import IngredientList from "./IngredientList";
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
//Our styled components
import { PageContainer, ListContainer } from "../Elements/Containers";
import { PageTitle } from "../Elements/Titles";
//API Urls import
import { apiUrl_PostIng, apiUrl_GetIng } from "../ApiUrl";

const Ingredients = () => {
  //open the create recipe form state
  const [openCreateIngredient, setOpenCreateIngredient] = useState(false);

  //get the data from react router navigation
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);

  //form validation Message
  const [msg, setMsg] = useState("");

  //form handling states
  const [name, setName] = useState("");
  const [imgUrl, setImg] = useState("");
  const [calories, setCalories] = useState(0);

  // fetch - API calls
  useEffect(() => {
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

  //handle create ingredient submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //validation
    if (!name) {
      setMsg("You forgot the ingredient name!");
      return;
    }
    if (!calories || calories <= 0) {
      setMsg("Calories must be above 0");
      setCalories(0);
      return;
    }

    setMsg("");

    //create the new ingredient
    let newIng = {
      Name: name,
      ImgUrl: imgUrl,
      Calories: calories,
    };

    //close create recipe dialog
    setOpenCreateIngredient(false);

    //Update the new Ingredient in the ingredients list
    fetch(apiUrl_PostIng, {
      method: "POST",
      body: JSON.stringify(newIng),
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
          setIngredients(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  return (
    <>
      <Button onClick={() => navigate("/")}>Back to Menu</Button>
      <PageContainer>
        <header>
          <PageTitle>Ingredients</PageTitle>
        </header>
        <div style={{ margin: "auto", width: "100%" }}>
          {/** Rendering the Ingredients List Component */}
          <ListContainer>
            <IngredientList ingredients={ingredients} />
          </ListContainer>
        </div>
        <div>
          <Button
            sx={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpenCreateIngredient(true)}
          >
            Create Ingredient
          </Button>
        </div>

        {
          //Open create Ingredient form Dialog
          openCreateIngredient && (
            <Dialog
              open={openCreateIngredient}
              onClose={() => setOpenCreateIngredient(false)}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <form>
                <DialogTitle id="scroll-dialog-title">
                  Create Ingredient
                </DialogTitle>
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
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    label="Ingredient Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    label="Image Link"
                    value={imgUrl}
                    variant="outlined"
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth
                    type="number"
                    label="Calories"
                    variant="outlined"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="error"
                    onClick={() => {
                      setOpenCreateIngredient(false);
                      setMsg("");
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
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

export default Ingredients;
