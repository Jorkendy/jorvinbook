import React, { useEffect, FC, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import omit from "omit-empty";

import {
  onGetCurrentUser,
  onUpdateCurrentUser
} from "../../redux/actions/user.actions";
import { onUpload } from "../../redux/actions/document.actions";
import { reducer } from "../../redux/store";
import { UserProfileProps } from "./UserProfile";
import { User } from "../../interfaces/user.interface";
import { isEmpty, validateName } from "../../utils/validators";

interface ConnectUserProfileForm {
  onGetCurrentUser: () => void;
  isLoading: boolean;
  user: User;
  onUpload: (file: any) => void;
  onUpdateCurrentUser: (user: User) => void;
  userDisplay: User;
}

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { userReducer, appReducer } = state;

  return {
    isLoading: userReducer.isLoading,
    user: userReducer.user,
    userDisplay: appReducer.user
  };
};
const mapDispatchToProps = { onGetCurrentUser, onUpload, onUpdateCurrentUser };

export const withUserProfileForm = (WrappedComponent: FC<UserProfileProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      onGetCurrentUser,
      isLoading,
      user: data,
      onUpload,
      onUpdateCurrentUser,
      userDisplay
    }: ConnectUserProfileForm) => {
      const [user, setUser] = useState(data);
      const [file, setFile] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const [previewUrl, setPreviewUrl] = useState("");

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
        if (field === "file" && value) {
          setPreviewUrl(
            URL.createObjectURL(get(event, "target.files[0]", null))
          );
        }
        const update = field === "file" ? setFile : setUser;
        update(value);
      };

      const _onDateChange = (birthday: MaterialUiPickersDate) => {
        let _user = {
          ...user,
          birthday: birthday?.toISOString().split("T")[0]
        };
        setUser(_user);
      };

      const _validateForm = () => {
        const firstName = get(user, "firstName", "");
        const lastName = get(user, "lastName", "");
        const isFirstNameValid = !isEmpty(firstName) && validateName(firstName);
        const isLastnameValid = !isEmpty(lastName) && validateName(lastName);
        return isFirstNameValid && isLastnameValid;
      };

      const _onSubmit = async (event: SyntheticEvent) => {
        if (event) {
          event.preventDefault();
        }
        let _user = user;
        if (!_validateForm()) {
          setErrorMessage("Please fill all field with valid data");
          return;
        } else {
          setErrorMessage("");
          if (file) {
            let formData = new FormData();
            formData.append("formData", file);
            const uploadAvatar = await onUpload(formData);
            const avatarUrl = get(uploadAvatar, "fileUrl", "");
            _user = { ..._user, avatarUrl };
          }
          onUpdateCurrentUser(omit(_user));
        }
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
          errorMessage={errorMessage}
          onSubmit={_onSubmit}
          userDisplay={userDisplay}
          previewUrl={previewUrl}
        />
      );
    }
  );
};
