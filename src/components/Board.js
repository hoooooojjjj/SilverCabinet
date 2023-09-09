import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import "./components.css";
import { userInfoContext } from "../App";
import { useNavigate } from "react-router-dom";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Myfirebase";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "Elvis Presley", "Tupelo, MS", "VISA ⠀•••• 3719", 312.44),
  createData(1, "Paul McCartney", "London, UK", "VISA ⠀•••• 2574", 866.99),
  createData(2, "Tom Scholz", "Boston, MA", "MC ⠀•••• 1253", 100.81),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

export default function Board() {
  const user = useContext(userInfoContext);
  const nav = useNavigate();
  const [bordlist, setbordlist] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "board"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (doc) => {
      const bordlist = doc.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setbordlist(bordlist);
    });
  }, []);

  const handleBoradClick = (doc) => {
    nav(`/boarddetail/${doc.id}`);
  };

  return (
    <div className="Board">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        공지사항
      </Typography>
      {user !== null ? (
        user.uid === "M0VoNwKO0wgNirAhXH1waovgJ1f2" ? (
          <button
            style={{ float: "right" }}
            onClick={() => {
              nav("/boardwrite");
            }}
          >
            글쓰기
          </button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>순번</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>등록날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bordlist.map((doc, index) => (
            <TableRow
              onClick={() => {
                handleBoradClick(doc);
              }}
              key={index}
            >
              <TableCell>{bordlist.length - index}</TableCell>
              <TableCell>{doc.title}</TableCell>
              <TableCell>{doc.creator}</TableCell>
              <TableCell>
                {new Date(doc.createAt).toISOString().slice(0, 10)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
