import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import Auth from "./features/auth";
import Camera from "./features/camera";
import Files from "./features/files";
import Gallery from "./features/gallery";
import GalleryDetail from "./features/gallery/galleryDetail";
import Desktop from "./features/desktop";
import NotFound from "./features/notFound";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { selectStatus } from "./features/auth/authSlice";

function App() {
  const state = useAppSelector(selectStatus);

  return (
    <div className="App">
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
            path="/camera"
            element={
              <ProtectedRoute auth={state}>
                <Camera />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute auth={state}>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery/:id"
            element={
              <ProtectedRoute auth={state}>
                <GalleryDetail />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
