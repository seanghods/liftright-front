import React from "react";

type Props = {
  message?: string;
};

const Response: React.FC<Props> = ({ message }) => {
  return (
    <>
      <div>{message}</div>
    </>
  );
};

export default Response;
