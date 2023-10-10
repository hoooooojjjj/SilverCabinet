import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import Form from "react-bootstrap/Form";
import "./components.css";
import { storage } from "../Myfirebase";
import { ref, listAll } from "firebase/storage";
import { json, useNavigate } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({
  nameTable,
  whatFilesname,
  whatFile,
}) {
  const nav = useNavigate();

  const [fileNames, setFileNames] = useState([]);
  const [filename, setFileName] = useState(localStorage.getItem("file") || "");

  const [search, setsearch] = useState("");
  const [filteredFileNames, setFilteredFileNames] = useState([]);

  // 컴포넌트가 언마운트될 때 마지막으로 선택한 걸 저장 후 다시 마운트 됐을 때 저장된 거 보여주기
  useEffect(() => {
    return () => {
      localStorage.setItem("file", filename);
      localStorage.setItem("files", JSON.stringify(fileNames));
    };
  });

  useEffect(() => {
    // 서식 변경 할때 초기화
    setFileName(localStorage.getItem("file") || "");
    setFileNames(JSON.parse(localStorage.getItem("files")) || "");

    nameTable.map((name) => {
      // 파일을 side에서 선택하면 그 파일로 리렌더링
      if (name === whatFilesname) {
        setFileName((args) => name);
        const FolderRef = ref(storage, `${whatFile}/${name}`);
        // 파일 이름을 리스트로 가져오기
        listAll(FolderRef)
          .then((res) => {
            const names = res.items.map((item) => item.name);
            setFileNames(names);
          })
          .catch((error) => {
            console.error("파일 목록을 가져오는 중 오류 발생:", error);
          });
      }
    });
  }, [whatFilesname, whatFile]);

  useEffect(() => {
    if (search) {
      const searchNormalized = search.normalize("NFC"); // 검색어를 정규화
      const filteredNames = fileNames.filter((file) => {
        const fileNormalized = file.normalize("NFC"); // 파일 이름을 정규화
        return fileNormalized.includes(searchNormalized);
      });
      setFilteredFileNames(filteredNames); // 필터링된 파일 이름을 상태로 저장
    } else {
      setFilteredFileNames(fileNames); // 검색어가 없으면 전체 파일 이름 표시
    }
  }, [search, fileNames]); // search와 fileNames 상태를 모두 감시

  const [dense, setDense] = React.useState(false);
  return (
    <Box id="FileList">
      <Grid item xs={12} md={6}>
        {filteredFileNames && (
          <>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              {whatFile} {`${filename}`}
            </Typography>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>파일 검색하기</Form.Label>
                <Form.Control
                  type="text"
                  className="FileList_search"
                  placeholder="검색어를 입력해주세요"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </>
        )}
        <Demo>
          <List dense={dense}>
            {filteredFileNames.map((filenames, index) => (
              <ListItem
                key={index}
                id="FileList_item"
                onClick={() => {
                  nav(
                    `/fileDetail?fileType=${whatFile}&file=${filename}&name=${filenames}`
                  );
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={filenames} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
