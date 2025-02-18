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
  const [message, setMessage] = useState("서버 응답 대기 중...");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setMessage(JSON.stringify(response.data))) // 데이터를 JSON 형태로 변환해서 출력
      .catch(error => setMessage(`에러 발생: ${error.message}`));
    }, []);

  return (
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
        <Route path="/login" element={<LoginPage />} />
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
  );

}

export default App;
