import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../Myfirebase";
import { userInfoContext } from "../App";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const nav = useNavigate();

  const user = useContext(userInfoContext);

  const [board, setboard] = useState({
    title: "",
    content: "",
  });

  // 공지사항 db에 저장
  const onCreateBoard = async () => {
    const docRef = await addDoc(collection(db, "board"), {
      title: board.title,
      content: board.content,
      createAt: new Date().getTime(),
      creator: user.displayName,
    });
    alert("등록되었습니다");
    nav("/LongTerm");
  };

  const handleChange = (e) => {
    setboard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={board.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={board.content}
            onChange={handleChange}
            rows={10}
          />
        </Form.Group>
      </Form>
      <button onClick={onCreateBoard}>등록하기</button>
    </div>
  );
};

export default BoardWrite;
