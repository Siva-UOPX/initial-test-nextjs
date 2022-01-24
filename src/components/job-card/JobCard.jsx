import { Typography, Card, Chip, Grid, List, Avatar } from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import styles from "./styles";

const useStyles = styles;

const JobCard = ({
  skills,
  jobTitle,
  company,
  location,
  //   onClick,
  //   expandable,
  id,
  empType,
  salary,
  postedDate,
  onClick,
}) => {
  const classes = useStyles();
  const mainSkills = skills.slice(0, Math.min(skills.length, 3));
  const newDate = new Date(postedDate).toLocaleDateString();

  const salaryToDollars = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 3,
  });

  return (
    <div id={id} onClick={onClick}>
      <Card className={classes.root}>
        <Grid>
          <Typography variant="h2">
            {jobTitle.length < 50 ? jobTitle : `${jobTitle.slice(0, 50)}...`}
          </Typography>
          <div>
            <Typography variant="h3" className={classes.nameLocation}>
              {company} - {location}
            </Typography>
          </div>
          <div>
            <Chip
              avatar={<LocalAtmIcon />}
              label={
                salary === "Unavailable"
                  ? salary
                  : salaryToDollars.format(salary)
              }
              className={classes.chip}
            />
            <Chip
              avatar={<WorkIcon />}
              label={empType.includes("Full-time") ? "Full-Time" : "Part-Time"}
              className={classes.chip}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Avatar
              className={classes.trophy}
              src="../../../images/trophy.svg"
            />
            <List disableGutters>
              <Typography variant="h4"> Skills for this job:</Typography>
              <ul className={classes.bullet}>
                {mainSkills.map((s) => (
                  // eslint-disable-next-line react/jsx-key
                  <li>{s}</li>
                ))}
              </ul>
              {skills.length > 3 && (
                <ul className={classes.bullet}>
                  <li>
                    {/*<ButtononClick={onClick}> */}+ {skills.length - 3} more
                    {/*</Button>*/}
                  </li>

                  {/* {expandable
                ? skills.slice(3).map((skill) => <li>{skill}</li>)
                : null} */}
                </ul>
              )}
            </List>
          </div>
          <Typography variant="h5" className={classes.date}>
            Posted on {newDate}
          </Typography>
        </Grid>
      </Card>
    </div>
  );
};

export default JobCard;
