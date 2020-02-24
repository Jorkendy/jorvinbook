import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  cardHeader: {
    marginBottom: 0,
    borderBottom: "none",
    background: "#00bcd4",
    zIndex: 3,
    margin: "0 15px",
    padding: "0",
    position: "relative",
    color: "#fff",

    "&:not($cardHeaderIcon)": {
      borderRadius: "3px",
      marginTop: "-20px",
      padding: "15px"
    },

    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
    }
  }
});

const CardHeader: FC = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.cardHeader)} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
