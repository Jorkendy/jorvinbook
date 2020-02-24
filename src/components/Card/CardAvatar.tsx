import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { hexToRgb } from "../../utils/theme";

const useStyles = makeStyles(theme => ({
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto"
    }
  },
  cardAvatarProfile: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb("#000") +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb("#000") +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb("#000") +
      ", 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    }
  }
}));

const CardAvatar: FC = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.cardAvatar, classes.cardAvatarProfile)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardAvatar;
