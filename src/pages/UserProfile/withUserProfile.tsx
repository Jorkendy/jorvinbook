import React, { useEffect, FC } from "react";
import { connect } from "react-redux";

import { onGetCurrentUser } from "../../redux/actions/user.actions";
import { reducer } from "../../redux/store";
import { UserProfileProps } from "./UserProfile";
import { User } from "../../interfaces/user.interface";

interface ConnectUserProfileForm {
  onGetCurrentUser: () => void;
  isLoading: boolean;
  user: User;
}

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { userReducer } = state;

  return {
    isLoading: userReducer.isLoading,
    user: userReducer.user
  };
};
const mapDispatchToProps = { onGetCurrentUser };

export const withUserProfileForm = (WrappedComponent: FC<UserProfileProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onGetCurrentUser, isLoading, user }: ConnectUserProfileForm) => {
    const {
      firstName,
      lastName,
      email,
      company,
      birthday,
      gender,
      summary,
      avatarUrl
    } = user || {};

    useEffect(() => {
      let isSubscribed: boolean = true;
      if (isSubscribed) {
        onGetCurrentUser();
      }

      return () => {
        isSubscribed = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <WrappedComponent
        firstName={firstName}
        lastName={lastName}
        email={email}
        company={company}
        birthday={birthday}
        gender={gender}
        summary={summary}
        avatarUrl={avatarUrl}
      />
    );
  });
};
