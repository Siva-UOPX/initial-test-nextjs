import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { StyledAction } from "./StyledAction";
import { useRouter } from "next/router";
import ExploreIcon from "@material-ui/icons/Explore";
import WorkIcon from "@material-ui/icons/Work";
import HelpIcon from "@material-ui/icons/Help";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import styles from "./styles";

const useStyles = styles;

const BottomNav = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(" ");
  const router = useRouter();
  const handleClick = (event, newValue) => {
    setValue(newValue);
    router.push(`/${newValue}`);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleClick}
      showLabels
      className={classes.root}
    >
      <StyledAction 
        label="MY PLAN" 
        value=" " 
        icon={<ExploreIcon />} />
      <StyledAction
        label="PORTFOLIO"
        value="portfolio"
        icon={<AssignmentIndIcon />}
      />
      <StyledAction 
        label="MY JOBS" 
        value="jobs" 
        icon={<WorkIcon />} 
      />
      <StyledAction 
        label="RESOURCES" 
        value="resources" 
        icon={<HelpIcon />} 
      />
    </BottomNavigation>
  );
};

export default BottomNav;
