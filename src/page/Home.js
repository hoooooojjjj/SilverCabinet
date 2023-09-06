import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../components/Board";
import NavBar from "../components/NavBar";
import Side from "../components/Side";
import FileList from "../components/FileList";
const Home = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Board />
        <Side />
        <FileList />
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
