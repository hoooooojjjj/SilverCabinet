import React from "react";
import Card from "../components/Card";
const Welcome = () => {
  return (
    <div className="Welcome">
      <header></header>
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
