import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class SnackbarMessage extends React.Component {

    handleClose = () => {
        this.props.snackbarCallback(false);
    };

    render() {
        const { classes } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.props.snackOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}

SnackbarMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
};

export default withStyles(styles)(SnackbarMessage);