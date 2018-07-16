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

import NaviIcon from './icons/NaviIcon';

const styles = theme => ({
    navi: {
        marginRight: '10px',
        minWidth: '24px',
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DialogAlertMessage extends React.Component {

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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Hey, Listen!
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Set your team from the top bar first!
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Okay...
                        </Button>
                    <div className={classes.navi}>
                        <NaviIcon />
                    </div>
                </DialogActions>
            </Dialog>
        );
    }
}

DialogAlertMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogAlertMessage);