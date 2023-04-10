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
import { Link } from "react-router-dom";

const CLIENT_ID = "3b8c5cfddbc046f693f29ea1c71060bf";
const CLIENT_SECRET = "bc8877657c0949ceb9414f7a5bacb1ab";

const Artist = ({ artist, setSelectedId }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={artist.image} />
      <Card.Body>
        <Card.Title>{artist.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Link to={`/artist/`} onClick={(e) => setSelectedId(artist.id)}>
          Go to artist
        </Link>
      </Card.Body>
    </Card>
  );
};

const Grid = ({ artists }) => {
  return (
    <Container>
      <Row>
        {artists.map((artist, index) => (
          <Col key={index}>
            <Artist artist={artist} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedId, setSelectedId] = useState("");

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
    setArtists(
      data.artists.items.map((item) => ({
        id: item.id,
        name: item.name,
        image:
          item.images.length > 0
            ? item.images[0].url
            : "placeholder.js/100px180", // Use a placeholder image if no image is available
      }))
    );
  }

  const handleArtistCall = async (id) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = () => {
    handleSearch();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Home Spotify searcher Altcademy</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for an artist"
              type="input"
              onKeyPress={handleKeyPress}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button onClick={handleClick}>Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <Grid artists={artists} handleArtistCall={handleArtistCall} />
    </Container>
  );
};

export { Home };
