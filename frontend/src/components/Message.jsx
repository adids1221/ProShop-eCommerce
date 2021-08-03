import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  let flag = false;
  const timer =
    variant === "danger" ? 8000 : variant === "success" ? 5000 : (flag = true);
  useEffect(() => {
    let timeId;
    if (!flag) {
      timeId = setTimeout(() => {
        setShow(false);
      }, timer);
    }

    return () => {
      clearTimeout(timeId);
      flag = false;
    };
  }, [timer]);

  if (!show) {
    return null;
  }
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
