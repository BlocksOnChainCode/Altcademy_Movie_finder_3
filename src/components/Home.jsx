import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col className="col-12">
          <h1>Home</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquid
            aliquam nesciunt provident error dolore, perferendis enim voluptatum
            adipisci maiores reiciendis, repellendus sint! Officia optio
            consequatur maiores, maxime delectus ipsa.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export { Home };
