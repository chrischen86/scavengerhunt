import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot.js';
import TitleBar from './components/TitleBar.js';
import AppLayout from './components/AppLayout.js';
import ChallengeCard from './components/ChallengeCard.js';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
  root: {
    textAlign: 'center',

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends React.Component {
  state = {
    challenges: [],
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  componentDidMount() {
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    axios
      .get("http://407services.azurewebsites.net/api/dailychallenge", config)
      .then(response => {
        console.log(response);
        // create an array of contacts only with relevant data
        const challenge = response.data.map(c => {
          return {
            id: c.Id,
            title: c.Title,
            description: c.Description,
            date: c.Date,
            points: c.Points,
            type: c.Type,
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          challenges: challenge[0]
        });

        // store the new state object in the component's state
        this.setState(newState);
        console.log(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TitleBar title="The 407 Hunt" />

        <AppLayout>
          <ChallengeCard challenge={this.state.challenges} />
          <Paper className={classes.paper}>
            Leaderboards
            <Typography variant="caption" gutterBottom>
              coming soon!
            </Typography>
          </Paper>
        </AppLayout>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));