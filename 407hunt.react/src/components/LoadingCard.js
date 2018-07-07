import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class ChallengeCard extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card} raised>
                    {!this.props.loaded && (
                        <CircularProgress className={classes.progress} color="secondary" />
                    )}
                </Card>
            </div>
        );
    }
}

ChallengeCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChallengeCard);