import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  cardFooter: {
    padding: "0",
    paddingTop: "10px",
    margin: "0 15px 10px",
    borderRadius: "0",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    backgroundColor: "transparent",
    border: "0"
  },
  cardFooterProfile: {
    marginTop: "-15px"
  }
});

const CardFooter: FC = ({ children, ...rest }) => {
  const classes = useStyles();
  
  return (
    <div
      className={clsx(classes.cardFooter, classes.cardFooterProfile)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardFooter;
