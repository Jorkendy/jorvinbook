import React, { FC } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

interface ConfirmSignUpDialogProps {
  open: boolean;
  onClose: () => void;
}

export const useStyles = makeStyles(theme => ({
  dialogActions: {
    justifyContent: "center"
  }
}));

const ConfirmSignUpDialog: FC<ConfirmSignUpDialogProps> = ({
  open,
  onClose
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        You registered successfully!
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          To complete your registration and start your discover, you will need
          to verify your email address
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmSignUpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

ConfirmSignUpDialog.defaultProps = {
  open: false,
  onClose: () => {}
};

export default ConfirmSignUpDialog;
