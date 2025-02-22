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

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuHeader />
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
