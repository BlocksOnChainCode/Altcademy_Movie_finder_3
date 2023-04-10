import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { Home } from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<h1>Movie</h1>} />
      <Route path="/404" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
