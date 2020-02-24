import React, { FC, useState, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { HeaderProps } from "./Header";
import { reducer } from "../../redux/store";
import { Routes } from "../../utils/routes";
import { User } from "../../interfaces/user.interface";
import { onSignOut } from "../../redux/actions/app.actions";

interface ConnectHeader {
  user: User;
  isAuthenticated: boolean;
  onSignOut: () => void;
}

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { appReducer } = state;

  return {
    isAuthenticated: appReducer.isAuthenticated,
    user: appReducer.user
  };
};

const mapDispatchToProps = { onSignOut };

export const withHeader = (WrappedComponent: FC<HeaderProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ isAuthenticated, user, onSignOut }: ConnectHeader) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<
      null | Element | ((element: Element) => Element)
    >(null);

    const _goSignIn = () => {
      history.push(Routes.SignIn);
    };

    const _goSignUp = () => {
      history.push(Routes.SignUp);
    };

    const _onOpenProfileMenu = (event: SyntheticEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const _onCloseProfileMenu = () => {
      setAnchorEl(null);
    };

    const _onSignOut = () => {
      _onCloseProfileMenu();
      onSignOut();
    };

    return (
      <WrappedComponent
        isAuthenticated={isAuthenticated}
        user={user}
        goSignIn={_goSignIn}
        goSignUp={_goSignUp}
        onOpen={_onOpenProfileMenu}
        onClose={_onCloseProfileMenu}
        anchor={anchorEl}
        onSignOut={_onSignOut}
      />
    );
  });
};
