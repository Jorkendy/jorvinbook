import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  grid: {
    margin: "0 -15px 30px -15px !important",
    width: "unset"
  }
});

const GridContainer: FC = ({ children, ...rest }) => {
  return (
    <Grid container className={useStyles().grid} {...rest}>
      {children}
    </Grid>
  );
};

export default GridContainer;
