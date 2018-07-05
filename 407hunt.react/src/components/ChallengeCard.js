import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles, IconButton, CardMedia } from '@material-ui/core';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

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
    progress: {
        margin: theme.spacing.unit * 2,
    },
    media: {
        height: 0,
        paddingTop: '46.25%',
    },
    cardHeader: {
        textAlign: 'left',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    }
});

class ChallengeCard extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card} raised>
                    {this.props.loaded && (
                        <div>
                            <CardHeader className={classes.cardHeader}
                                avatar={
                                    <Tooltip title={"Worth " + this.props.challenge.points + " points!"}>
                                        <Avatar className={classes.avatar}>

                                            {this.props.challenge.points}<Typography variant="caption" color="inherit">pt</Typography>
                                        </Avatar>
                                    </Tooltip>
                                }
                                title="Challenge of the Day"
                                subheader={new Date(this.props.challenge.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            >
                            </CardHeader>
                            <CardMedia className={classes.media} image={process.env.PUBLIC_URL + '/img/' + this.props.challenge.media}/>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    {this.props.challenge.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.props.challenge.description}
                                </Typography>
                            </CardContent>
                        </div>
                    )}
                    {!this.props.loaded && (
                        <CircularProgress className={classes.progress} color="secondary" />
                    )}
                    <CardActions className={classes.actions} disableActionSpacing>

                        {this.props.challenge.type === "Picture" && (
                            <Tooltip title="Take a picture!">
                                <IconButton>
                                    <PhotoCameraIcon color="inherit" />
                                </IconButton>
                            </Tooltip>
                        )}
                        {this.props.challenge.type === "Video" && (
                            <Tooltip title="Take a video!">
                                <IconButton>
                                    <VideocamIcon color="inherit" />
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