import {
  Typography,
  Card,
  Chip,
  Grid,
  List,
  Avatar,
  ListItem,
  Button,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Trophy from '../../../public/images/trophy.svg'
import styles from './styles';

const useStyles = styles;

const JobCard = ({
  skills,
  jobTitle,
  company,
  location,
//   onClick,
//   expandable,
  empType,
  salary,
  postedDate
}) => {
  const classes = useStyles();
  const mainSkills = skills.slice(0, Math.min(skills.length, 3));
  const newDate = new Date(postedDate).toLocaleDateString()

  return (
    <Card className={classes.root}>
      <Grid>
        <Typography variant="h2">{jobTitle}</Typography>
        <div style={{ display: "inline-block" }}>
          <Typography variant="h4">
            {company} - {location}
          </Typography>
        </div>
        <div>
          <Chip avatar={<LocalAtmIcon />} label={salary} />
          <Chip
            avatar={<WorkIcon />}
            label={empType.includes("Full-time") ? "Full-Time" : "Part-Time"}
          />
        </div>
        <div style={{ display: "flex" }}>
        <Avatar src='../../../public/images/trophy.svg'/>
        <List disableGutters>
          <Typography variant="h3"> Skills for this job:</Typography>
          <ul className={classes.bullet}>{mainSkills.map((s) => (
            <li>{s}</li>
          ))}</ul>
          <ul className={classes.bullet}>
         <li>{ /*<ButtononClick={onClick}> */}+ {skills.length - 3} more{/*</Button>*/}</li>
            
              {/* {expandable
                ? skills.slice(3).map((skill) => <li>{skill}</li>)
                : null} */}
            </ul>
        </List>
        </div>
        <Typography variant="h4" className={classes.date}>Posted on {newDate}</Typography>
      </Grid>
    </Card>
  );
};

export default JobCard;
