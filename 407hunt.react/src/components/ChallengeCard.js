import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, IconButton } from '@material-ui/core';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import Tooltip from '@material-ui/core/Tooltip';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actions: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
});

class ChallengeCard extends React.Component {

    state = {
        isPictureVisible: false,
    };

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        console.log(this.props);

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Challenge of the Day
                        </Typography>
                        <Typography variant="headline" component="h2">
                            {this.props.challenge.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {this.props.challenge.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>

                        {this.props.challenge.type === "Picture" && (
                            <Tooltip title="Take a picture!">
                                <IconButton>
                                    <PhotoCameraIcon color="inherit" className={classes.margin} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {this.props.challenge.type === "Video" && (
                            <Tooltip title="Take a video!">
                                <IconButton>
                                    <VideocamIcon color="inherit" className={classes.margin} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {this.props.challenge.points > 0 && (
                            <Tooltip title={"Worth " + this.props.challenge.points + " points!"}>
                                <IconButton>
                                    <Badge badgeContent={this.props.challenge.points} color="secondary" className={classes.margin}>
                                        <VideogameAssetIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        )}

                    </CardActions>
                </Card>
            </div>
        );
    }
}

ChallengeCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChallengeCard);