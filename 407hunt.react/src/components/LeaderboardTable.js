import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';

import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import amber from '@material-ui/core/colors/amber';

import TrophyIcon from 'react-icons/lib/io/trophy';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    iconCell: {
        whiteSpace: 'nowrap',
        paddingRight: 0
    },
});

class LeaderboardTable extends React.Component {
    state = {
        scores: [],
        loaded: false,
    };

    componentDidMount() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios
            .get("http://407services.azurewebsites.net/api/scores", config)
            .then(response => {
                console.log(response);
                // create an array of contacts only with relevant data
                const scores = response.data.map(c => {
                    return {
                        id: c.Id,
                        team: c.Team,
                        score: c.Score,
                    };
                });

                // create a new "State" object without mutating 
                // the original State object. 
                const newState = Object.assign({}, this.state, {
                    scores: scores,
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
        const gold = yellow[600];
        const silver = grey[400];
        const bronze = amber[600];
        var currentRank = 3;
        var currentScore = 0;
        return (
            <div>
                <Card className={classes.card} raised>

                    {this.state.loaded && (
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Leaderboards
                            </Typography>
                            <Table className={classes.table} style={{ tableLayout: "auto" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.iconCell} />
                                        <TableCell>Team</TableCell>
                                        <TableCell numeric>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {this.state.scores.map((n, index) => {
                                        console.log(n.score + ":" + currentScore);
                                        if (index === 0) {
                                            currentScore = n.score;
                                        }
                                        if (n.score < currentScore) {
                                            currentScore = n.score;
                                            currentRank--;
                                        }
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell className={classes.iconCell} style={{ width: 10 }}>
                                                    {currentRank === 3 && n.score > 0 && <TrophyIcon size={24} style={{ color: gold }} />}
                                                    {currentRank === 2 && n.score > 0 && <TrophyIcon size={24} style={{ color: silver }} />}
                                                    {currentRank === 1 && n.score > 0 && <TrophyIcon size={24} style={{ color: bronze }} />}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {n.team}
                                                </TableCell>
                                                <TableCell numeric>{n.score}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    )}
                    {!this.state.loaded && (
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Leaderboards
                            </Typography>
                            <CircularProgress className={classes.progress} color="secondary" />
                        </CardContent>
                    )}
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(LeaderboardTable);