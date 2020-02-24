import React, { FC, Fragment, SyntheticEvent } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { User } from "../../interfaces/user.interface";
import { withHeader } from "./withHeader";

export interface HeaderProps {
  isAuthenticated: boolean;
  user: User;
  goSignIn: () => void;
  goSignUp: () => void;
  onOpen: (event: SyntheticEvent) => void;
  onClose: () => void;
  anchor: null | Element | ((element: Element) => Element);
  onSignOut: () => void;
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  button: {
    marginRight: "10px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const Header: FC<HeaderProps> = ({
  isAuthenticated,
  user,
  goSignUp,
  goSignIn,
  onClose,
  onOpen,
  anchor,
  onSignOut
}) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Button size="small">Subscribe</Button>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        Jorvinbook
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {isAuthenticated ? (
        <Fragment>
          <Avatar onClick={onOpen}>H</Avatar>
          <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={onClose}
          >
            <MenuItem>
              <Typography variant="h6">
                Hello, {user.firstName + " " + user.lastName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={onClose}>Profile</MenuItem>
            <MenuItem onClick={onClose}>My account</MenuItem>
            <MenuItem onClick={onSignOut}>Logout</MenuItem>
          </Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={goSignIn}
          >
            Sign in
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={goSignUp}
            className={classes.button}
          >
            Sign up
          </Button>
        </Fragment>
      )}
    </Toolbar>
  );
};

export default withHeader(Header);
