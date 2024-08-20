import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./pages/view";
import Edit from "./pages/edit";
import PostView from "./pages/post_view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/post/:section_id" element={<PostView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
