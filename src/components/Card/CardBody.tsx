import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    position: "relative"
  },
  cardBodyProfile: {
    marginTop: "15px"
  },
  cardBodyCenter: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    position: "relative",
    textAlign: "center"
  }
});

const CardBody: FC<any> = ({ children, type, ...rest }) => {
  const classes = useStyles();
  const className =
    type === "center"
      ? clsx(classes.cardBodyCenter, classes.cardBodyProfile)
      : clsx(classes.cardBody, classes.cardBodyProfile);

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
