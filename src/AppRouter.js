import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Welcome from "./page/Welcome";
import Signin from "./page/Signin";
import Signup from "./page/SignUp";
import BoardWrite from "./page/BoardWrite";
import BoardDetail from "./page/BoardDetail";
import FileDetail from "./page/FileDetail";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/LongTerm" element={<Home />}></Route>
          <Route path="/Daycare" element={<Home />}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/boardwrite" element={<BoardWrite />}></Route>
          <Route path="/boarddetail/:id" element={<BoardDetail />}></Route>
          <Route path="/filedetail/?" element={<FileDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
