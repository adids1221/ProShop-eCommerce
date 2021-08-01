import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  const timer = variant === "danger" ? 8000 : 5000;
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, timer);

    return () => {
      clearTimeout(timeId);
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
