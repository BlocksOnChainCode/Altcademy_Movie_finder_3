import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { Home } from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist" element={<h1>Artist Details</h1>} />
      <Route path="/404" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
