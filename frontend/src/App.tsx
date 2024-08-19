import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./pages/view";
import Edit from "./pages/edit";
import PostEditor from "./pages/postEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/postEditor/:section_id" element={<PostEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
