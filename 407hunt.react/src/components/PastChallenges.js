import React from 'react'

import { withStyles } from '@material-ui/core';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import ChallengeCard from './ChallengeCard';

const styles = theme => ({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 1.5,
    },
});

class PastChallenges extends React.Component {
    state = {
        challenges: [],
        loaded: false,
    };

    componentDidMount() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios
            .get("http://407services.azurewebsites.net/api/pastchallenge", config)
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
        return (
            <React.Fragment>
                {this.state.challenges.map(tile => {
                    return (
                        <Grid item xs={12} sm={4} key={tile.id}>
                            <ChallengeCard challenge={tile} title="Previous Challenge" loaded />
                        </Grid>
                    );
                }
                )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(PastChallenges);