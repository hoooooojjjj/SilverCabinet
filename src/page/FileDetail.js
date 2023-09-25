import React from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Myfirebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/NavBar";

import Button from "@mui/material/Button";
import Footer from "../components/Footer";

const FileDetail = () => {
  // query stirng -> ?키=값&키=값&키=값....
  const [searchParams, setsearchParams] = useSearchParams();
  const fileType = searchParams.get("fileType"); // searchParams는 키를 매개변수로 보내 전달받은 값을 사용할 수 있음
  const file = searchParams.get("file");
  const name = searchParams.get("name");

  const nav = useNavigate();
  const fileDown = async () => {
    try {
      const url = await getDownloadURL(
        ref(storage, `${fileType}/${file}/${name}`)
      );

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}`; // Specify the file name you want to use
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div className="FileDown">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="FileDown_content">
          <h2 className="FileDown_h2">{name}</h2>
          <div className="FileDown_p">
            <p>
              <b>분량</b> : 2 page
            </p>
            <p>
              <b>파일 포멧</b> : docs
            </p>
            <p>
              <b>무료/유료</b> : 무료
            </p>
          </div>
          {/* <SelectCard
            img1={process.env.PUBLIC_URL + "/assets/demo_file_img.png"}
            img2={process.env.PUBLIC_URL + "/assets/demo_file_img.png"}
            img3={process.env.PUBLIC_URL + "/assets/demo_file_img.png"}
          /> */}
          <div className="FileDown_btn">
            <Button id="FileDown_btn1" onClick={fileDown} variant="contained">
              파일 다운로드
            </Button>
            <Button
              id="FileDown_btn2"
              onClick={() => {
                nav(-1);
              }}
              variant="contained"
            >
              뒤로 가기
            </Button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FileDetail;
