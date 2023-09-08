import Button from "react-bootstrap/Button";
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
            <Card.Title>{titleText}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </div>
        </Card.Body>
        <div className="text-center">
          <Button
            onClick={() => {
              nav(`/${path}`);
            }}
            id="Card-btn"
            variant="primary"
          >
            들어가기
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default BasicExample;
