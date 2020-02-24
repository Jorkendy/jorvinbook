import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  grid: {
    padding: "0 15px !important"
  }
});

const GridItem: FC<any> = ({ children, ...rest }) => {
  return (
    <Grid item {...rest} className={useStyles().grid}>
      {children}
    </Grid>
  );
};

export default GridItem;
