import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import Files from "./features/files";
import Desktop from "./features/desktop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./features/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { selectStatus } from "./features/auth/authSlice";

function App() {
  const state = useAppSelector(selectStatus);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/files"
            element={
              <ProtectedRoute auth={state}>
                <Files />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute auth={state}>
                <Desktop />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
