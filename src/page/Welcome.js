import React, { useContext, useEffect } from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import { userIsLoginContext } from "../App";
import { signOut } from "firebase/auth";
import { auth } from "../Myfirebase";
const Welcome = () => {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";
  });

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
            }
          }}
          id="Welcome_btn"
          variant="contained"
        >
          로그아웃
        </Button>
      </header>
      <main>
        <h4>
          <strong>요양원 / 주간보호 서식의 창구</strong> 블랙엔젤의
          실버캐비넷입니다.
        </h4>
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
