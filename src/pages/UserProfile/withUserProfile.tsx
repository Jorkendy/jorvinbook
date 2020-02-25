import React, { useEffect, FC, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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
  )(({ onGetCurrentUser, isLoading, user: data }: ConnectUserProfileForm) => {
    const [user, setUser] = useState(data);
    const [file, setFile] = useState("");

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

    useEffect(() => {
      if (user === null && data) {
        setUser(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const _onTextFieldChange = (event: SyntheticEvent) => {
      const field = get(event, "target.name", "");
      const value =
        field === "file"
          ? get(event, "target.files[0]", null)
          : {
              ...user,
              [field]: get(event, "target.value", "")
            };
      const update = field === "type" ? setFile : setUser;
      update(value);
    };

    const _onDateChange = (birthday: MaterialUiPickersDate) => {
      let _user = { ...user, birthday: birthday?.toISOString().split("T")[0] };
      setUser(_user);
    };

    return (
      <WrappedComponent
        isLoading={isLoading}
        firstName={get(user, "firstName", "")}
        lastName={get(user, "lastName", "")}
        email={get(user, "email", "")}
        company={get(user, "company", "")}
        birthday={get(user, "birthday", null)}
        gender={get(user, "gender", "")}
        summary={get(user, "summary", "")}
        avatarUrl={get(user, "avatarUrl", "")}
        onDateChange={_onDateChange}
        onTextFieldChange={_onTextFieldChange}
        file={file}
      />
    );
  });
};
