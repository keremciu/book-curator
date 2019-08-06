import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import { ErrorWrapper } from "./styles";

const ErrorMessage = ({ error }) =>
  error && (
    <SnackbarContent
      message={
        <ErrorWrapper>
          <ErrorIcon />
          {error.message}
        </ErrorWrapper>
      }
    />
  );

export default ErrorMessage;
