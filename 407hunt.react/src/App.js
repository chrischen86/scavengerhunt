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
import LeaderboardTable from './components/LeaderboardTable.js';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 1.5,
  },
  nestedGrid: {
    height: 'auto',
    paddingBottom: theme.spacing.unit * 3,
}
});

class App extends React.Component {
  state = {
    challenges: [],
    loaded: false,
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
            media: c.MediaFileName,
          };
        });
        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          challenges: challenge,
          loaded: true,
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
        <div className={classes.content}>
          <Grid container spacing={24} justify="center">
            <Grid container item xs={12} sm={4} >
              {this.state.challenges.map((n, index) => {
                console.log(n);

                return (
                  <Grid item xs={12} sm={12} key={n.id} className={classes.nestedGrid}>
                    <ChallengeCard challenge={n} loaded={this.state.loaded} />
                  </Grid>);
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <LeaderboardTable />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));