import React from "react";
import styled from "styled-components";

import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
  return (
    <Wrapper>
      <CircularProgress /> 
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;

  img {
    width: 30px;
  }
`
