import React from "react";
import ClockLoader from "react-spinners/ClockLoader";
import { css } from "styled-components";

export const Loading = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 20vh;
  `;

  return <ClockLoader color={"#fff"} loading={true} size={60} css={override} />;
};
