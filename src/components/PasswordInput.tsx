import React, { SyntheticEvent, useState, FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface PasswordInputProps {
  password: string;
  onChange: (event: SyntheticEvent) => void;
}

export const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%"
  }
}));

const PasswordInput: FC<PasswordInputProps> = ({ password, onChange }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const _onTogglePassword = () => {
      setShowPassword(!showPassword)
  }

  const _handleMouseDownPassword = (event: SyntheticEvent) => {
      event.preventDefault()
  }

  return (
    <FormControl
      className={classes.textField}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        name="password"
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={_onTogglePassword}
              onMouseDown={_handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
};

export default PasswordInput;