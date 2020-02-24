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
  }
});

const CardBody: FC = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.cardBody, classes.cardBodyProfile)} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
