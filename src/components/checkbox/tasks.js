import React, { useState } from "react";
import Task from "./task";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    alignSelf: "center",
  },
}));

export default function Tasks() {
  const classes = useStyles();

  const [taskCompletionObj, setTaskCompletionObj] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
  });

  const handleChange = (event) => {
    setTaskCompletionObj({
      ...taskCompletionObj,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          bottom: "56px",
          top: "0",
          overflow: "overlay",
        }}
      >
        <div className={classes.div}>
          <Task
            value={taskCompletionObj.checkedA}
            name={"checkedA"}
            text={"Take the Career Interest Assessment"}
            handleChange={handleChange}
          />
          <Task
            value={taskCompletionObj.checkedB}
            name={"checkedB"}
            text={"Discover your priorities"}
            handleChange={handleChange}
          />
          <Task
            value={taskCompletionObj.checkedC}
            name={"checkedC"}
            text={"Take a personality test"}
            handleChange={handleChange}
          />
          <Task
            value={taskCompletionObj.checkedD}
            name={"checkedD"}
            text={"Volunteer for first hand experience"}
            handleChange={handleChange}
          />
          <Task
            value={taskCompletionObj.checkedE}
            name={"checkedE"}
            text={"Contact a Career Advisor"}
            handleChange={handleChange}
          />
        </div>

        <div className={classes.div}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 28 }}
            style={{ width: 240, height: "56px", marginBottom: 13 }}
            className={classes.button}
          >
            Add Custom Task
          </Button>
        </div>
        <div className={classes.div}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: 28 }}
            style={{ width: 240, height: "56px" }}
            className={classes.button}
          >
            Mark all tasks Complete
          </Button>
        </div>
        <div style={{ height: "56px" }}></div>
      </div>
    </>
  );
}
