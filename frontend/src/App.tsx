import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./pages/view";
import Edit from "./pages/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
