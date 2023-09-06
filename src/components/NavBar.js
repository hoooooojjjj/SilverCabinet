import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./components.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const nav = useNavigate();
  return (
    <div className="NavBar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ marginLeft: 0 }}>
          <img
            onClick={() => {
              nav("/");
            }}
            className="NavBar-img"
            style={{ width: 50, height: 50 }}
            src={process.env.PUBLIC_URL + "/assets/Logo.jpg"}
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                style={{ fontSize: 20 }}
                title="서식"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  개원 서식
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  운영 서식
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  평가 서식
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
