import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

import utils from "../utils";

const { Routes } = utils;

const Copyright = () => {
  const history = useHistory();

  const _goHome = () => {
    history.push(Routes.Home);
  };

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" component="span" onClick={_goHome}>
        Jorvinbook Social Network
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
