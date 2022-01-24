import { withStyles } from '@material-ui/core/styles';
import { BottomNavigationAction } from '@material-ui/core';

export const StyledAction = withStyles({
    label: {
        fontSize: '1.2rem',
    },
})(BottomNavigationAction);
