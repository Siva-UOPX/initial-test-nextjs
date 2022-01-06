import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useRouter } from 'next/router';
import ExploreIcon from '@material-ui/icons/Explore';
import WorkIcon from '@material-ui/icons/Work';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import styles from './styles';

const useStyles = styles;

const BottomNav = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(' ');
  const router = useRouter();
  const handleClick = (event, newValue) => {
    setValue(newValue);
    router.push(`/${newValue}`)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleClick}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label='My Plan' value=' ' icon={<ExploreIcon />} />
      <BottomNavigationAction label='Portfolio' value='portfolio' icon={<AssignmentIndIcon />} />
      <BottomNavigationAction label='My Jobs' value='jobs' icon={<WorkIcon />} />
      <BottomNavigationAction label='Resources' value='resources' icon={<HelpIcon />} />
    </BottomNavigation>
  );
}

export default BottomNav;
