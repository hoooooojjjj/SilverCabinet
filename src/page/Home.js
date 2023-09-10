import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../components/Board";
import NavBar from "../components/NavBar";
import Side from "../components/Side";
import FileList from "../components/FileList";

import { gaeonenameTable } from "../LongTermfilenameTable/gaeone";
import { unyoungnameTable } from "../LongTermfilenameTable/unyoug";
import { pyungganameTable } from "../LongTermfilenameTable/pyungga";
import { userInfoContext } from "../App";

const Home = () => {
  const user = useContext(userInfoContext);

  const [whatFile, setwhatFile] = useState(
    localStorage.getItem("type") || "개원"
  ); // 어떤 서식인지 - 개원 / 운영 / 평가
  const [whatFilesname, setwhatFilesname] = useState("");

  // 컴포넌트가 언마운트될 때 마지막으로 선택한 걸 저장 후 다시 마운트 됐을 때 저장된 거 보여주기
  useEffect(() => {
    return () => {
      localStorage.setItem("type", whatFile);
    };
  });
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
  const whatFilesnameType = (type) => {
    setwhatFilesname(() => type);
  };
  if (whatFile === "개원") {
    return (
      <div>
        <header>
          <NavBar whatFileType={whatFileType} />
        </header>
        <main>
          <Board />
          <Side
            nameTable={gaeonenameTable}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={gaeonenameTable}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
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
          <Side
            nameTable={unyoungnameTable}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={unyoungnameTable}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
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
          <Side
            nameTable={pyungganameTable}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={pyungganameTable}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
        </main>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
