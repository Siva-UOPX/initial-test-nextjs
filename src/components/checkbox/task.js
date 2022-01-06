import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  div: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    alignSelf: "center"
  },
  input: {
    display: "none"
  }
}))


export default function Task(props) {

  const classes = useStyles();


  return (
    <>
      <FormGroup style={{ marginLeft: 22, margin: "auto" }} >
        <FormControlLabel
          control={
            <Checkbox
              checked={props.value}
              onChange={props.handleChange}
              name={props.name}
              color="success"
              style={{ color: "#008563", padding: "1.5vh 10px" }}
            />
          }
          label={<Typography style={props.value ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{props.text}</Typography>}
          style={{ border: "1px solid grey", marginBottom: "15px", width: "335px", borderRadius: "5px" }}
        />
      </FormGroup>
    </>
  )

}