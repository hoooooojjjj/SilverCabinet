import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../components/Board";
import NavBar from "../components/NavBar";
import Side from "../components/Side";
import FileList from "../components/FileList";

import { gaeonenameTable } from "../LongTermfilenameTable/gaeone";
import { unyoungnameTable } from "../LongTermfilenameTable/unyoug";
import { pyungganameTable } from "../LongTermfilenameTable/pyungga";
import { gaeonenameTable2 } from "../DayCarefilenameTable/gaeone";
import { unyoungnameTable2 } from "../DayCarefilenameTable/unyoug";
import { pyungganameTable2 } from "../DayCarefilenameTable/pyungga";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";
  });

  const location = useLocation();
  const [currentPath, setcurrentPath] = useState("");
  const [isLongTerm, setisLongTerm] = useState();
  const [isToggle, setisToggle] = useState(true);

  // 컴포넌트가 마운트 될 때 현재 경로 가져오기
  useEffect(() => {
    setcurrentPath(location.pathname);
  }, [location.pathname]);

  // 컴포넌트가 마운트 될 때 요양원 페이지인지, 주간보호 페이지인지 판별
  useEffect(() => {
    if (currentPath === "/LongTerm") {
      setisLongTerm(true);
    } else if (currentPath === "/DayCare") {
      setisLongTerm(false);
    }
  }, [currentPath]);

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
      <div className="Home">
        <header>
          <NavBar whatFileType={whatFileType} isToggle={isToggle} />
        </header>
        <main>
          <Board />
          <Side
            nameTable={isLongTerm ? gaeonenameTable : gaeonenameTable2}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={isLongTerm ? gaeonenameTable : gaeonenameTable2}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
        </main>
        <footer className="Home_footer">
          <Footer />
        </footer>
      </div>
    );
  } else if (whatFile === "운영") {
    return (
      <div className="Home">
        <header>
          <NavBar whatFileType={whatFileType} isToggle={isToggle} />
        </header>
        <main>
          <Board />
          <Side
            nameTable={isLongTerm ? unyoungnameTable : unyoungnameTable2}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={isLongTerm ? unyoungnameTable : unyoungnameTable2}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
        </main>
        <footer className="Home_footer">
          <Footer />
        </footer>
      </div>
    );
  } else if (whatFile === "평가") {
    return (
      <div className="Home">
        <header>
          <NavBar whatFileType={whatFileType} isToggle={isToggle} />
        </header>
        <main>
          <Board />
          <Side
            nameTable={isLongTerm ? pyungganameTable : pyungganameTable2}
            whatFilesnameType={whatFilesnameType}
            whatFile={whatFile}
          />
          <FileList
            nameTable={isLongTerm ? pyungganameTable : pyungganameTable2}
            whatFilesname={whatFilesname}
            whatFile={whatFile}
          />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default Home;
