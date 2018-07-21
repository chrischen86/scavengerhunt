import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Divider } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
});

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Changelog extends React.Component {

    handleDialogClose = () => {
        this.props.dialogCallback(false);
    };

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <Dialog
                open={this.props.dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleDialogClose}
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="simple-dialog-title">Changelog</DialogTitle>
                <DialogContent id="alert-dialog-description">
                    <Typography variant="subheading">
                        July 20, 2018
                    </Typography>
                    <Typography>
                        {bull}Allow users to upload videos for challenges
                        {bull}Changelog indicator
                    </Typography>
                    <br/>
                    <Typography variant="subheading">
                        July 15, 2018
                    </Typography>
                    <Typography>
                        {bull}Allow users to upload images for challenges
                        {bull}Allow users to select team to enable uploads
                        {bull}Changelogs
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Changelog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Changelog);