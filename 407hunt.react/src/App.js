import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot.js';

import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

import TitleBar from './components/TitleBar.js';
import ChallengeCard from './components/ChallengeCard.js';
import LeaderboardTable from './components/LeaderboardTable.js';
import LoadingCard from './components/LoadingCard.js';
import PastChallenges from './components/PastChallenges.js';


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
    selectedTeam: null,
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

    var selectedTeamStored = localStorage.getItem("selectedTeam");
    console.log(selectedTeamStored);
    if (selectedTeamStored === null) {
      return;
    }
    var selectedTeam = JSON.parse(selectedTeamStored);
    this.setState({ selectedTeam: selectedTeam });
  }

  setTeamCallback = (selectedTeam) => {
    console.log(selectedTeam);
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    this.setState({ selectedTeam: selectedTeam });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TitleBar title="The 407 Hunt" selectedTeam={this.state.selectedTeam} selectedTeamCallback={this.setTeamCallback} />
        <div className={classes.content}>
          <Grid container spacing={24} justify="center">
            <Grid container item xs={12} sm={4}>
              {!this.state.loaded && (
                <Grid item xs={12} sm={12} className={classes.nestedGrid}>
                  <LoadingCard />
                </Grid>
              )}
              {this.state.challenges.map((n, index) => {
                return (
                  <Grid item xs={12} sm={12} key={n.id} className={classes.nestedGrid}>
                    <ChallengeCard challenge={n} title="Challenge of the Day" loaded={this.state.loaded} selectedTeam={this.state.selectedTeam} />
                  </Grid>);
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <LeaderboardTable />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Divider />
            </Grid>
            <Grid container spacing={24} justify="flex-start" xs={12} sm={10}>
              <PastChallenges selectedTeam={this.state.selectedTeam}/>
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