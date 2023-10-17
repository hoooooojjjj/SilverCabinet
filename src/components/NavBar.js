import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./components.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function NavBar({ whatFileType, isToggle }) {
  const nav = useNavigate();

  const handleFileTypeClick = (e) => {
    whatFileType(e.target.name);
  };
  return (
    <div className="NavBar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ marginLeft: 0 }}>
          <div className="NavBar_home">
            <img
              onClick={() => {
                nav("/");
              }}
              className="NavBar-img"
              style={{ width: 50, height: 50 }}
              src={process.env.PUBLIC_URL + "/assets/Logo.jpg"}
              alt="로고"
            ></img>
            <Navbar.Brand>
              <Link id="NavBar-Link" to={"/"}>
                실버캐비넷
              </Link>
            </Navbar.Brand>
            <Link
              style={{ fontSize: 20, marginRight: 10, marginLeft: 10 }}
              id="NavBar-Link"
              to={"/"}
            >
              홈
            </Link>
          </div>
          {isToggle && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown
                    style={{ fontSize: 20 }}
                    title="서식"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item name="개원" onClick={handleFileTypeClick}>
                      개원 서식
                    </NavDropdown.Item>
                    <NavDropdown.Item name="운영" onClick={handleFileTypeClick}>
                      운영 서식
                    </NavDropdown.Item>
                    <NavDropdown.Item name="평가" onClick={handleFileTypeClick}>
                      평가 서식
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    style={{ fontSize: 20 }}
                    title="소개"
                    id="basic-nav-dropdown"
                  >
                    <Link to={"/intro"}>대표 소개</Link>
                    <Link to={"/intro"}>회사 소개</Link>
                    <Link to={"/intro"}>사이트 소개</Link>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default React.memo(NavBar);
