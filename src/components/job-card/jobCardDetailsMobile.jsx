import React from 'react'
import { Typography, Card, Chip, Grid, List, Avatar, Button } from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import styles from "./styles";


const useStyles = styles;

const JobCardDetailsMobile = ({ body,
    city_name: location,
    company_name: company, 
    employment_type_name:empType,
    posted: postedDate,
    salary,
    skills_name: skills,
    title_raw: jobTitle, 
    onClick }) => {

        const classes = useStyles();
        const mainSkills = skills;
        const newDate = new Date(postedDate).toLocaleDateString();

        const salaryToDollars = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            useGrouping: true,
            maximumSignificantDigits: 3,
          });
          
          
        return ( 
        <>
        <div className={classes.detailViewHeader}>
        <Button className={classes.Button}  color="primary" onClick={onClick}>Return to Postings</Button>
        <Button className={classes.Button} style={{ borderRadius: "28px" }} variant="contained" color="primary"> Apply Now</Button>
        </div>

        <Card className={classes.root}>
      <Grid>
        <Typography variant="h2">
          {jobTitle}
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
              salary ? salaryToDollars.format(salary) : 'Unavailable'
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
          <Avatar className={classes.trophy} src="../../../images/trophy.svg" />
          <List disableGutters>
            <Typography variant="h4"> Skills for this job:</Typography>
            <ul className={classes.bullet}>
              {mainSkills.map((s) => (
                <li>{s}</li>
              ))}
            </ul>
            {skills.length > 3 && (
              <ul className={classes.bullet}>
               

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

      {console.log(body)}

        
        <div dangerouslySetInnerHTML={{__html:body}}/>
        </Card>
        </>
        )

        
        

    
    
};

export default JobCardDetailsMobile;
