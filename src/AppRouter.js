import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Welcome from "./page/Welcome";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/LongTerm" element={<Home />}></Route>
          <Route path="/Daycare" element={<Home />}></Route>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
