import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import ChangelogStepper from './ChangelogStepper';

const styles = theme => ({

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
        return (
            <Dialog
                open={this.props.dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleDialogClose}
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <ChangelogStepper />
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