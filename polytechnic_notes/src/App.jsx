import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Hero from "./Pages/Hero.jsx";
import Upload from "./Pages/Upload";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import DownloadPage from "./Pages/DownloadPage.jsx";
import SyllabusPage from "./Pages/Syllabuspage.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <div className="main">
      <Analytics />
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/hero" element={<Hero />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/syllabus" element={<SyllabusPage />} />
            </Route>

          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
