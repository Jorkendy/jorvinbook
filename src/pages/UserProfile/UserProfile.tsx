import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import Button from "@material-ui/core/Button";
import ava from "../../assets/images/user.jpg";

const useStyles = makeStyles({
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
  }
});

const UserProfile = () => {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  a
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  a
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  a
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  a
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  a
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  a
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  a
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  a
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  avatar
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardAvatar>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={ava} alt="..." />
              </a>
            </CardAvatar>
            <CardBody>
              <h6>CEO / CO-FOUNDER</h6>
              <h4>Alec Thompson</h4>
              <p>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button>Follow</Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default UserProfile;
