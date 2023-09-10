import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "./components.css";

const Side = ({ nameTable, whatFilesnameType, whatFile }) => {
  return (
    <div>
      <div className="Side_title_div">
        <ListItemText id="Side_title" primary={`${whatFile} 서식`} />
      </div>
      <div className="Side">
        <div className="SideLeft">
          {nameTable.slice(0, 20).map((name, index) => (
            <ListItemButton
              onClick={() => {
                whatFilesnameType(name);
              }}
              key={index}
              id="Side_item"
            >
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </div>
        <div className="SideLeft">
          {nameTable.slice(20, 40).map((name, index) => (
            <ListItemButton
              onClick={() => {
                whatFilesnameType(name);
              }}
              key={index}
              id="Side_item"
            >
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Side;
