import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    padding: "15px",
    marginTop: "20px",
  },
  detailViewHeader: {
    display: "flex",
    alignItems: "right",
    justifyContent: "right",
  },

  nameLocation: {
    margin: "5px  0px 8px 0px",
  },
  bullet: {
    listStyleType: "disc",
    fontSize: "1.4rem",
  },
  date: {
    fontStyle: "italic",
  },
  trophy: {
    width: "22px",
    height: "22px",
    fill: "#db3725",
    background: "#fcdbd7",
    marginRight: "5px",
    marginTop: "3px",
  },

  chip: {
    width: "117px",
    margin: "0px 15px 9px 0px",
  },
  detailFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
}));
