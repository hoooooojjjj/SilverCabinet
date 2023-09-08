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
import "./components.css";
import { storage } from "../Myfirebase";
import { ref, listAll } from "firebase/storage";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({
  nameTable,
  whatFilesname,
  whatFile,
}) {
  const [fileNames, setFileNames] = useState([]);
  const [filename, setFileName] = useState("");

  useEffect(() => {
    setFileName("");
    nameTable.map((name, index) => {
      // 처음엔 맨 위 파일이 렌더링
      if (index === 0) {
        setFileName(name);
        const pyunggaFolderRef = ref(storage, `${whatFile}/${name}`);

        listAll(pyunggaFolderRef)
          .then((res) => {
            const names = res.items.map((item) => item.name);
            setFileNames(names);
          })
          .catch((error) => {
            console.error("파일 목록을 가져오는 중 오류 발생:", error);
          });
      }
      // 이후 파일을 side에서 선택하면 그 파일로 리렌더링
      if (name === whatFilesname) {
        setFileName(name);
        const pyunggaFolderRef = ref(storage, `${whatFile}/${name}`);

        listAll(pyunggaFolderRef)
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

  console.log(fileNames);

  const [dense, setDense] = React.useState(false);
  return (
    <Box id="FileList">
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          {whatFile} {`${filename}`}
        </Typography>
        <Demo>
          <List dense={dense}>
            {fileNames.map((filename, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={filename} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
