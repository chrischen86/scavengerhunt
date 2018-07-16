import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CheckIcon from '@material-ui/icons/Check';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Changelog from './Changelog';

import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },
  flex: {
    flex: 1,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  menuItemSelected: {
    backgroundColor: "#EEEEEEEE !important",
  },
  primaryText: {
    color: theme.palette.primary.contrastText,
  }
});

class TitleBar extends React.Component {
  state = {
    anchorEl: null,
    loaded: false,
    teams: [],
    changelogOpen: false,
  };

  componentDidMount() {
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    axios
      .get("http://407services.azurewebsites.net/api/teams", config)
      .then(response => {
        // create an array of contacts only with relevant data
        const teams = response.data.map(c => {
          return {
            id: c.Id,
            team: c.Team,
          };
        });

        const newState = Object.assign({}, this.state, {
          teams: teams,
          loaded: true,
        });

        // store the new state object in the component's state
        this.setState(newState);
        console.log(newState);
      })
      .catch(error => console.log(error));
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuItemClick = (event, team) => {
    this.setState({ anchorEl: null });
    this.props.selectedTeamCallback(team);
  };

  handleChangelog = () => {
    this.setState({ changelogOpen: true });
  };

  dialogCallback = (dialogOpen) => {
    this.setState({ changelogOpen: dialogOpen });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.title}
            </Typography>
            <div>
              <Button className={classes.primaryText} onClick={this.handleChangelog}>
                Whats New?
              </Button>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit">
                <AccountCircle />

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                {this.state.loaded && this.state.teams.map(t => {
                  return (
                    <MenuItem key={t.id} classes={{ selected: classes.menuItemSelected }}
                      onClick={event => this.handleMenuItemClick(event, t)}
                      selected={this.props.selectedTeam && this.props.selectedTeam.id === t.id}>
                      {this.props.selectedTeam && this.props.selectedTeam.id === t.id &&
                        <ListItemIcon className={classes.primary}>
                          <CheckIcon />
                        </ListItemIcon>
                      }
                      <ListItemText inset primary={t.team} />
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          </Toolbar>

          <Changelog dialogOpen={this.state.changelogOpen} dialogCallback={this.dialogCallback} />
        </AppBar>
      </div>
    );
  }
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedTeam: PropTypes.object,
};

export default withStyles(styles)(TitleBar);