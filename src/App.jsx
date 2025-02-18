import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import ReserveForm from "./components/forms/ReserveForm";
import JejuMap from "./components/maps/JejuMap";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
    <Router>
      <MenuHeader />
      <Routes>
        <Route
          path="/"
          element={
            <JejuMap>
              <ReserveForm />
            </JejuMap>
          }
        />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 회원가입 페이지 */}
        <Route
          path="/reserve"
          element={
            <JejuMap>
              <ReserveForm />
            </JejuMap>
          }
        />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );

}

export default App;
