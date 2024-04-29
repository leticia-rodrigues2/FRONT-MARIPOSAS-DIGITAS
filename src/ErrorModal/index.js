import React from "react";
import Alert from '@mui/material/Alert';
const ErrorModal = ({ message ,type }) => {
  return (
    <div className="modal">
        <Alert severity={type}>{message}</Alert>
    </div>
  );
}

export default ErrorModal;
