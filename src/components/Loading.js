import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loading = () => {
  return (
    <div className="Loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
