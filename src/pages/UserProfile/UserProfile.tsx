import React, { FC } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import defaultAvatar from "../../assets/images/user.jpg";
import { withUserProfileForm } from "./withUserProfile";

export interface UserProfileProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  company: string | undefined;
  birthday: string | undefined;
  gender: string | undefined;
  summary: string | undefined;
  avatarUrl: string | undefined;
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
  }
}));

const UserProfile: FC<UserProfileProps> = ({
  firstName = "",
  lastName = "",
  email = "",
  company = "",
  birthday = null,
  gender = "",
  summary = "",
  avatarUrl = ""
}) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <form className={classes.form} noValidate>
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
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        label="Birthday"
                        margin="normal"
                        value={birthday}
                        fullWidth
                        allowKeyboardControl
                        animateYearScrolling
                        onChange={() => {}}
                        disableFuture
                        inputVariant="outlined"
                        clearable
                        placeholder="10/10/2018"
                        format="MM/dd/yyyy"
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
                      id="sumamry"
                      label="About me"
                      name="sumamry"
                      autoFocus
                      multiline
                      rows={2}
                      rowsMax={4}
                      value={summary}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="avatar"
                      multiple
                      type="file"
                    />
                    <label htmlFor="avatar">
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        component="span"
                      >
                        Upload your avatar
                      </Button>
                    </label>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardAvatar>
              <img src={defaultAvatar} alt="..." />
            </CardAvatar>
            <CardBody type="center">
              <h6 className={classes.cardBodyCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardBodyTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
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
