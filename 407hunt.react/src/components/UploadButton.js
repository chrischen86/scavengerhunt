import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogAlertMessage from './DialogAlertMessage';
import SnackbarMessage from './SnackbarMessage';

import axios from 'axios';

const styles = theme => ({
    input: {
        display: 'none',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    fabProgress: {
        color: theme.palette.primary.light,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
});

class UploadButton extends React.Component {

    state = {
        loading: false,
        success: false,
        dialogOpen: false,
        snackOpen: false,
    }

    handleUploadClick = (event, selectedTeam) => {
        if (selectedTeam === null) {
            this.setState({ dialogOpen: true });
            event.preventDefault();
            event.stopPropagation();
        }
    }

    handleUploadFile = (event, challenge, selectedTeam) => {
        if (selectedTeam === null) {
            this.setState({ dialogOpen: true });
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.setState({ loading: true, success: false });

        const data = new FormData();
        data.append('file', event.target.files[0])
        data.append('challengeId', challenge.id)
        data.append('teamId', selectedTeam.id)
        axios.post('http://407services.azurewebsites.net/api/file', data).then((response) => {
            console.log('uploaded!');
            this.setState({ loading: false, success: true, snackOpen: true });
        }).catch(error => {
            console.log('ERORR', error);
            this.setState({ loading: false, success: false, snackOpen: true });
        });
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleSnackClose = () => {
        this.setState({ snackOpen: false });
    };

    dialogCallback = (dialogOpen) => {
        this.setState({ dialogOpen: dialogOpen });
    }

    snackbarCallback = (snackOpen) => {
        this.setState({ snackOpen: snackOpen });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <input accept="image/*"
                    className={classes.input}
                    id={"upload-" + this.props.challenge.id}
                    type="file"
                    onChange={event => this.handleUploadFile(event, this.props.challenge, this.props.selectedTeam)}
                    onClick={event => this.handleUploadClick(event, this.props.selectedTeam)} />
                <label htmlFor={"upload-" + this.props.challenge.id}>


                    <IconButton component="span">
                        <PhotoCameraIcon color="inherit" />
                    </IconButton>

                </label>
                {this.state.loading && <CircularProgress size={48} className={classes.fabProgress} />}

                <DialogAlertMessage dialogOpen={this.state.dialogOpen} dialogCallback={this.dialogCallback} />
                <SnackbarMessage
                    message={this.state.success ? "File uploaded succesfully!" : "An error occured with the upload :("}
                    snackbarCallback={this.snackbarCallback}
                    snackOpen={this.state.snackOpen}
                />
            </div>
        );
    }
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
    challenge: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);