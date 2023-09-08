import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../components/Board";
import NavBar from "../components/NavBar";
import Side from "../components/Side";
import FileList from "../components/FileList";
const Home = () => {
  const [whatFile, setwhatFile] = useState(); // 어떤 서식인지 - 개원 / 운영 / 평가
  const whatFileType = (type) => {
    switch (type) {
      case "개원":
        setwhatFile("개원");
        break;
      case "운영":
        setwhatFile("운영");
        break;
      case "평가":
        setwhatFile("평가");
        break;
      default:
        break;
    }
  };
  if (whatFile === "개원") {
    return (
      <div>
        <header>
          <NavBar whatFileType={whatFileType} />
        </header>
        <main>
          <Board />
          <Side />
          <FileList />
        </main>
        <footer></footer>
      </div>
    );
  } else if (whatFile === "운영") {
    return (
      <div>
        <header>
          <NavBar whatFileType={whatFileType} />
        </header>
        <main>
          <Board />
          <Side />
          <FileList />
        </main>
        <footer></footer>
      </div>
    );
  } else if (whatFile === "평가") {
    return (
      <div>
        <header>
          <NavBar whatFileType={whatFileType} />
        </header>
        <main>
          <Board />
          <Side />
          <FileList />
        </main>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
