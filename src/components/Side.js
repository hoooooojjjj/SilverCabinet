import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
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
