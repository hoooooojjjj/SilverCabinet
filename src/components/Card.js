import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import "./components.css";
import { useNavigate } from "react-router-dom";
function BasicExample({ titleText, text, path }) {
  const nav = useNavigate();
  return (
    <div className="Card">
      <Card id="Card_item">
        <img
          src={process.env.PUBLIC_URL + "/assets/Logo_text.jpg"}
          alt="로고"
        ></img>
        <Card.Body>
          <div id="Card_text">
            <Card.Title id="Card_title_text">
              <strong>{titleText}</strong>
            </Card.Title>
            <Card.Text id="Card_nomal_text">{text}</Card.Text>
          </div>
        </Card.Body>
        <div className="text-center">
          <Button
            onClick={() => {
              nav(`/${path}`);
            }}
            id="Card-btn"
            variant="contained"
          >
            들어가기
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default BasicExample;
