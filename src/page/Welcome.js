import React, { useContext } from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userIsLoginContext } from "../App";
import { signOut } from "firebase/auth";
import { auth } from "../Myfirebase";
const Welcome = () => {
  const nav = useNavigate();
  const islogin = useContext(userIsLoginContext);
  return (
    <div className="Welcome">
      <header>
        <Button
          onClick={() => {
            if (islogin) {
              if (window.confirm("로그아웃 하시겠습니까?")) {
                signOut(auth);
              }
            } else {
              nav("/signin");
            }
          }}
          id="Welcome_btn"
          variant="contained"
        >
          {islogin ? "로그아웃" : "로그인"}
        </Button>
      </header>
      <main>
        <div className="Welcome_Card">
          <Card
            titleText={"요양원 서식"}
            text={"요양원 운영을 위한 서식을 다운받을 수 있습니다"}
            path={"LongTerm"}
          />
          <Card
            titleText={"주간보호 서식"}
            text={"주간보호 운영을 위한 서식을 다운받을 수 있습니다"}
            path={"DayCare"}
          />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Welcome;
