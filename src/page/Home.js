import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../components/Board";
import NavBar from "../components/NavBar";
import Side from "../components/Side";
import FileList from "../components/FileList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Myfirebase";

import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();
  const [currentPath, setcurrentPath] = useState("");
  const [isLongTerm, setisLongTerm] = useState();
  const [isToggle, setisToggle] = useState(true);

  // 요양원 개원 서식 파일 가져오기
  const [nameTable, setnameTable] = useState([]);

  const getData = async (collection, doc1) => {
    const docs = await getDoc(doc(db, collection, doc1));
    setnameTable(docs.data()["file"]);
  };

  useEffect(() => {
    // title 변경
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";

    // 이전 저장된 데이터 보여주기
    isLongTerm
      ? getData("LongTermfilenameTable", localStorage.getItem("type") || "개원")
      : getData("DayCarefilenameTable", localStorage.getItem("type") || "개원");
  }, [isLongTerm]);

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

  // 각 서식의 어떤 파일 이름인지
  const [whatFilesname, setwhatFilesname] = useState("");

  // 컴포넌트가 언마운트될 때 마지막으로 선택한 걸 저장 후 다시 마운트 됐을 때 저장된 거 보여주기
  useEffect(() => {
    return () => {
      localStorage.setItem("type", whatFile);
    };
  });

  // useCallback 으로 최적화
  const whatFileType = useCallback(
    (type) => {
      switch (type) {
        case "개원":
          setwhatFile((whatFile) => "개원");
          isLongTerm
            ? getData("LongTermfilenameTable", "개원")
            : getData("DayCarefilenameTable", "개원");
          break;
        case "운영":
          setwhatFile((whatFile) => "운영");
          isLongTerm
            ? getData("LongTermfilenameTable", "운영")
            : getData("DayCarefilenameTable", "운영");
          break;
        case "평가":
          setwhatFile((whatFile) => "평가");
          isLongTerm
            ? getData("LongTermfilenameTable", "평가")
            : getData("DayCarefilenameTable", "평가");
          break;
        default:
          break;
      }
    },
    [isLongTerm]
  );

  // useCallback 으로 최적화
  const whatFilesnameType = useCallback((type) => {
    setwhatFilesname((whatFilesname) => type);
  }, []);

  if (whatFile === "개원") {
    return (
      <div className="Home">
        <div className="not_footer">
          <header>
            <NavBar whatFileType={whatFileType} isToggle={isToggle} />
          </header>
          <main>
            <Board />
            <Side
              nameTable={nameTable}
              whatFilesnameType={whatFilesnameType}
              whatFile={whatFile}
            />
            <FileList
              nameTable={nameTable}
              whatFilesname={whatFilesname}
              whatFile={whatFile}
            />
          </main>
        </div>
        <footer className="Home_footer">
          <Footer />
        </footer>
      </div>
    );
  } else if (whatFile === "운영") {
    return (
      <div className="Home">
        <div className="not_footer">
          <header>
            <NavBar whatFileType={whatFileType} isToggle={isToggle} />
          </header>
          <main>
            <Board />
            <Side
              nameTable={nameTable}
              whatFilesnameType={whatFilesnameType}
              whatFile={whatFile}
            />
            <FileList
              nameTable={nameTable}
              whatFilesname={whatFilesname}
              whatFile={whatFile}
            />
          </main>
        </div>
        <footer className="Home_footer">
          <Footer />
        </footer>
      </div>
    );
  } else if (whatFile === "평가") {
    return (
      <div className="Home">
        <div className="not_footer">
          <header>
            <NavBar whatFileType={whatFileType} isToggle={isToggle} />
          </header>
          <main>
            <Board />
            <Side
              nameTable={nameTable}
              whatFilesnameType={whatFilesnameType}
              whatFile={whatFile}
            />
            <FileList
              nameTable={nameTable}
              whatFilesname={whatFilesname}
              whatFile={whatFile}
            />
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default Home;
