import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "./components.css";

const Side = ({ nameTable }) => {
  return (
    <div className="Side">
      {nameTable.map((name, index) => (
        <ListItemButton key={index}>
          <ListItemText primary={name} />
        </ListItemButton>
      ))}
    </div>
  );
};
export default Side;
