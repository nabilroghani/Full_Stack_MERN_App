import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
