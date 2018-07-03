import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';


const styles = {
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
  };

function ChallengeCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
    let data = props.challenge;
    console.log(props);

  return (
    <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Challenge of the Day
        </Typography>
        <Typography variant="headline" component="h2">
          {data.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.description}
        </Typography>
        <Typography component="p">
          well meaning and kindly.<br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </div>
  );
}

ChallengeCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChallengeCard);