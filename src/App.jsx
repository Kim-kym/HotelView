import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import ReserveForm from "./components/contents/ReserveForm";
import JejuMap from "./components/maps/JejuMap";
import LoginPage from "./components/contents/LoginPage";

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

        {/* 스프링부트 API 연결 확인 */}
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", textAlign: "center" }}>
        <h2>Spring Boot API 연결 테스트</h2>
        <p>{message}</p>
      </div>
    </Router>
  );

}

export default App;
