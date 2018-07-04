import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 1.5,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function AppLayout(props) {
    const { classes } = props;
    let children = React.Children.toArray(props.children);

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    { children[0] }
                </Grid>
                <Grid item xs={12} sm={6}>
                    { children[1] }
                </Grid>
                <Grid item xs={12} sm={6}>
                    { children[2] }
                </Grid>
            </Grid>
        </div>
    );
}

AppLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppLayout);