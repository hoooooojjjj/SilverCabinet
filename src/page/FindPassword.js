import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

import { auth } from "../Myfirebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Signup() {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";
  });

  // 이메일 입력
  const [email, setEmail] = useState("");

  // 비밀번호 찾기 - 비밀번호 재설정 이메일 보내기
  const findPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("비밀번호 재설정 메일이 발송되었습니다.");
      })
      .catch((error) => {
        alert("해당 이메일로 가입된 계정이 없습니다.");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/Logo.jpg"}
          alt="로고"
          className="logo"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        ></img>
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <br />
        <p>이메일 계정으로 찾기</p>
        <p>이메일 계정의 주소로 비밀번호 재설정 메일이 발송됩니다.</p>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                style={{ width: 500 }}
                required
                fullWidth
                id="id"
                label="이메일 입력"
                autoComplete="id"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={findPassword}
          >
            발송하기
          </Button>
          <Link style={{ marginLeft: 200, color: "black" }} to="/">
            로그인하러가기
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
