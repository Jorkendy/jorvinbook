import React, { FC, SyntheticEvent } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MomentUtils from "@date-io/moment";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormHelperText from "@material-ui/core/FormHelperText";
import Avatar from "@material-ui/core/Avatar";
import get from "lodash/get";
import CardMedia from "@material-ui/core/CardMedia";
import { Helmet } from "react-helmet";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import { withUserProfileForm } from "./withUserProfile";
import Spinner from "../../components/Spinner";
import { User } from "../../interfaces/user.interface";

export interface UserProfileProps {
  isLoading: boolean;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  company: string | undefined;
  birthday: string | null;
  gender: string | undefined;
  summary: string | undefined;
  avatarUrl: string | undefined;
  onDateChange: (date: MaterialUiPickersDate) => void;
  onTextFieldChange: (event: SyntheticEvent) => void;
  errorMessage: string;
  onSubmit: (event: SyntheticEvent) => void;
  userDisplay: User;
  previewUrl?: string;
}

const useStyles = makeStyles(theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: 0,
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  cardBodyCategory: {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: 300,
    lineHeight: "1.5em",
    fontSize: "1em",
    textTransform: "uppercase"
  },
  cardBodyTitle: {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: 300,
    lineHeight: "1.5em",
    fontSize: "1em"
  },
  description: {
    lineHeight: "1.5em",
    fontSize: "1.5em"
  },
  cardAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    fontSize: 30
  },
  cardMedia: {
    width: "50%",
    marginTop: 15,
    borderRadius: 10,
    border: "1px solid #ccc"
  }
}));

const UserProfile: FC<UserProfileProps> = ({
  firstName,
  lastName,
  email,
  company,
  birthday,
  gender,
  summary,
  avatarUrl,
  isLoading,
  onDateChange,
  onTextFieldChange,
  errorMessage,
  onSubmit,
  userDisplay,
  previewUrl
}) => {
  const classes = useStyles();

  return (
    <Wrapper>
      {isLoading ? <Spinner /> : null}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <form className={classes.form} noValidate onSubmit={onSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First name"
                      name="firstName"
                      autoFocus
                      value={firstName}
                      onChange={onTextFieldChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last name"
                      name="lastName"
                      autoFocus
                      value={lastName}
                      onChange={onTextFieldChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoFocus
                      value={email}
                      disabled
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="company"
                      label="Company"
                      name="company"
                      autoFocus
                      value={company}
                      onChange={onTextFieldChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        label="Birthday"
                        margin="normal"
                        value={birthday}
                        fullWidth
                        animateYearScrolling
                        disableFuture
                        inputVariant="outlined"
                        clearable
                        placeholder="10/10/2018"
                        format="MM/DD/YYYY"
                        onChange={onDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Gender"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={gender}
                      onChange={onTextFieldChange}
                      name="gender"
                    >
                      <MenuItem key={1} value="Male">
                        Male
                      </MenuItem>
                      <MenuItem key={2} value="Female">
                        Female
                      </MenuItem>
                      <MenuItem key={3} value="Othe">
                        Others
                      </MenuItem>
                    </TextField>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="summary"
                      label="About me"
                      name="summary"
                      autoFocus
                      multiline
                      rows={2}
                      rowsMax={4}
                      value={summary}
                      onChange={onTextFieldChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="file"
                      type="file"
                      name="file"
                      onChange={onTextFieldChange}
                    />
                    <label htmlFor="file">
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        component="span"
                      >
                        Upload your avatar
                      </Button>
                    </label>
                    {previewUrl ? (
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={previewUrl}
                        title="Contemplative Reptile"
                        className={classes.cardMedia}
                      />
                    ) : null}
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            {errorMessage ? (
              <FormHelperText error>{errorMessage}</FormHelperText>
            ) : null}
            <CardFooter>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
                onClick={onSubmit}
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardAvatar>
              {userDisplay && userDisplay.avatarUrl ? (
                <img
                  src={get(userDisplay, "avatarUrl", "")}
                  alt={userDisplay.firstName + " " + userDisplay.lastName}
                />
              ) : (
                <Avatar className={classes.cardAvatar}>
                  {get(userDisplay, "email[0]", "A").toUpperCase()}
                </Avatar>
              )}{" "}
            </CardAvatar>
            <CardBody type="center">
              <h6 className={classes.cardBodyCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardBodyTitle}>
                {get(userDisplay, "firstName", "") +
                  " " +
                  get(userDisplay, "lastName", "")}
              </h4>
              <p className={classes.description}>
                {get(userDisplay, "summary", "") ? summary : "No information"}
              </p>
              <Button color="primary" variant="contained">
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Wrapper>
  );
};

export default withUserProfileForm(UserProfile);

const Wrapper = styled.div`
  margin-top: 50px;
`;
