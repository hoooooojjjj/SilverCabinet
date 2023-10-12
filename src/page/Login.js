import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Container } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Myfirebase";

export const Login = () => {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";
  });

  const nav = useNavigate();

  // 로그인 인풋 요소 가져오기
  const email = useRef();
  const password = useRef();

  const [signUp, setsignUp] = useState({
    email: "",
    password: "",
  }); // 이메일, 비밀번호 입력값

  // 이메일 및 비밀번호 input change 됐을 때
  const handleChange = (e) => {
    setsignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인
  const onSignIn = () => {
    signInWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        // Signed in
        nav("/");
      })
      .catch((error) => {
        alert("이메일과 비밀번호를 다시 확인해주세요");
      });
  };

  // 구글 로그인
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        nav("/");
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="Login">
      <img
        src={process.env.PUBLIC_URL + "/assets/Logo_text.jpg"}
        alt="배경화면"
      ></img>
      <div className="Login_right_wrap">
        <div className="Login_right">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/Logo.jpg"}
                alt="로고"
                className="logo"
              ></img>
              <TextField
                margin="normal"
                label="아이디"
                required
                fullWidth
                name="email"
                autoFocus
                value={signUp.email}
                onChange={handleChange}
                ref={email}
              />
              <TextField
                margin="normal"
                label="비밀번호"
                type="password"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                value={signUp.password}
                onChange={handleChange}
                ref={password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSignIn}
                sx={{ mt: 3, mb: 2 }}
                id="login"
              >
                로그인
              </Button>
              <p className="social_text">
                <b>소셜 계정으로 로그인하기</b>
              </p>
              <img
                src={process.env.PUBLIC_URL + "/assets/google_login.png"}
                className="google_login"
                onClick={googleSignIn}
                alt="구글로 로그인"
              />
              <br />
              <Link to="/findPassword" style={{ color: "black" }}>
                비밀번호 찾기
              </Link>
              <br />
              계정이 없으신가요?
              <Link to="/signup" style={{ color: "black" }}>
                회원가입하러가기
              </Link>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
};
