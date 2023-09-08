import React from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const nav = useNavigate();
  return (
    <div className="Welcome">
      <header>
        <Button
          onClick={() => {
            nav("/signin");
          }}
          id="Welcome_btn"
          variant="contained"
        >
          로그인
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
