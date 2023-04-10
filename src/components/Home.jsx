import { useState, useEffect } from "react";
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

const CLIENT_ID = "3b8c5cfddbc046f693f29ea1c71060bf";
const CLIENT_SECRET = "bc8877657c0949ceb9414f7a5bacb1ab";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // ? This useEffect is used to get the access token from the spotify api
  useEffect(() => {
    const getAccessToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        },
        body: "grant_type=client_credentials",
      });
      const data = await response.json();
      setAccessToken(data.access_token);
      console.log(data);
      console.log(accessToken);
    };
    getAccessToken();
  }, []);

  // ! Base api call to spotify
  async function handleSearch() {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      console.log(`You pressed the enter key! searchInput: ${searchInput}`);
    }
  };

  const handleClick = () => {
    handleSearch();
    console.log(`You clicked the button! searchterm ${searchInput}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Home Spotify searcher Altcademy</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for a artist"
              type="input"
              onKeyPress={handleKeyPress}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button onClick={handleClick}>Search</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export { Home };
