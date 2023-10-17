import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Pagination from "react-bootstrap/Pagination";
import "./components.css";
import { userInfoContext } from "../App";
import { useNavigate } from "react-router-dom";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Myfirebase";

export default React.memo(function Board() {
  const user = useContext(userInfoContext);
  const nav = useNavigate();
  const [bordlist, setbordlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const q = query(collection(db, "board"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (doc) => {
      const bordlist = doc.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setbordlist(bordlist);
      setTotalPages(Math.ceil(bordlist.length / postsPerPage));
    });
  }, [postsPerPage]);

  const handleBoradClick = (doc) => {
    nav(`/boarddetail/${doc.id}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let number = 1; number <= totalPages; number++) {
    pageNumbers.push(number);
  }

  const maxPageItems = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bordlist.slice(indexOfFirstPost, indexOfLastPost);

  // 이전 페이지와 다음 페이지 버튼을 표시할지 여부를 계산
  const canShowPreviousButton = currentPage > 1;
  const canShowNextButton = currentPage < totalPages;

  // 페이지네이션 그룹의 첫 번째 페이지 번호 계산
  const firstPageInGroup = Math.max(1, currentPage - 2);
  // 페이지네이션 그룹의 마지막 페이지 번호 계산
  const lastPageInGroup = Math.min(
    totalPages,
    firstPageInGroup + maxPageItems - 1
  );

  return (
    <div className="Board">
      <Typography sx={{ mt: 1, mb: 0 }} variant="h6" component="div">
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
      <div id="Board_table">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell id="BoradCell_num">순번</TableCell>
              <TableCell id="BoradCell_title">제목</TableCell>
              <TableCell id="BoradCell">작성자</TableCell>
              <TableCell id="BoradCell">등록날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((doc, index) => (
              <TableRow
                id="Board_table_body"
                onClick={() => {
                  handleBoradClick(doc);
                }}
                key={index}
              >
                <TableCell>
                  {bordlist.length - indexOfLastPost - index + 5}
                </TableCell>
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
      <div>
        <Pagination id="Board_pagination_div">
          {canShowPreviousButton && (
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
          )}
          {pageNumbers
            .slice(firstPageInGroup - 1, lastPageInGroup)
            .map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
          {canShowNextButton && (
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
          )}
        </Pagination>
      </div>
    </div>
  );
});
