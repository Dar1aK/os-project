import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Files from "./features/files";
import Desktop from "./features/desktop";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/files" element={<Files />} />
          <Route path="/" element={<Desktop />} />
          {/* <Route path="/:id" element={<Detail />} /> */}
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
