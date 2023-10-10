import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Welcome from "./page/Welcome";
import Signup from "./page/SignUp";
import BoardWrite from "./page/BoardWrite";
import BoardDetail from "./page/BoardDetail";
import FileDetail from "./page/FileDetail";
import Intro from "./page/Intro";
import FindPassword from "./page/FindPassword";
import { Loading } from "./components/Loading";
import { userIsLoginContext } from "./App";
import { Login } from "./page/Login";

const AppRouter = ({ isLoading }) => {
  const isLogin = useContext(userIsLoginContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoading ? (
            <Route path="/" element={<Loading />}></Route>
          ) : isLogin ? (
            <Route path="/" element={<Welcome />}></Route>
          ) : (
            <Route path="/" element={<Login />}></Route>
          )}
          <Route path="/LongTerm" element={<Home />}></Route>
          <Route path="/Daycare" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/boardwrite" element={<BoardWrite />}></Route>
          <Route path="/boarddetail/:id" element={<BoardDetail />}></Route>
          <Route path="/filedetail/?" element={<FileDetail />}></Route>
          <Route path="/intro" element={<Intro />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
