// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import CompanyIntro from "./components/pages/CompanyIntro";
// 소개 추가
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
// import HotelList from "./components/pages/HotelList";
import HotelListDummy from "./components/pages/HotelListDummy";
import MyPage from "./components/pages/MyPage";
import Admin from "./components/pages/Admin";
import MapWithSearch from "./components/pages/MapWithSearch";
import HotelDetail from "./components/pages/HotelDetail";
import HotelReserve from "./components/pages/HotelReserve";
import PasswordCheck from "./components/pages/PasswordCheck";
import EditProfile from "./components/pages/EditProfile";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const styles = document.createElement("style");
    styles.innerHTML = `
      .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .content-wrapper {
        margin-top: 80px;
      }
    `;
    document.head.appendChild(styles);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="fixed-header">
          <MenuHeader />
        </div>
        <Routes>
          <Route path="/" element={<MapWithSearch />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/password-check" element={<PasswordCheck />} />
          <Route path="/mypage/edit" element={<EditProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/hotels" element={<HotelList />} /> */}
          <Route path="/hotels" element={<HotelListDummy />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/reservation/:id" element={<HotelReserve />} />
          {/* 회원가입 페이지 */}
          <Route path="/reserve" element={<MapWithSearch />} />
          <Route path="/companyIntro" element={<CompanyIntro />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
