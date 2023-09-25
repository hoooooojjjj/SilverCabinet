import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Myfirebase";
import Navbar from "../components/NavBar";

import Button from "@mui/material/Button";
import Footer from "../components/Footer";
const BoardDetail = () => {
  const [boradDetail, setboradDetail] = useState({});

  const nav = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "board", `${id}`), (doc) => {
      setboradDetail((args) => doc.data());
    });
  }, []);
  const { id } = useParams();
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="BoardDetail">
          <h2>공지사항</h2>
          <div className="BoardDetail_content">
            <br />
            <h6>제목 : {boradDetail.title}</h6>
            <h6> 작성자 : {boradDetail.creator}</h6>
            <p>{boradDetail.content}</p>
          </div>
          <Button
            onClick={() => {
              nav(-1);
            }}
            variant="contained"
          >
            뒤로가기
          </Button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default BoardDetail;
