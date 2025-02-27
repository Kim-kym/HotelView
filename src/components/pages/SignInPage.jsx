// src/components/pages/SignInPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ AuthContext 추가
import "../../styled/SignInPage.css";
<<<<<<< HEAD
// 더미 데이터 사용 대신 AuthContext의 login 함수 사용
import { useAuth } from "../contexts/AuthContext";
=======
>>>>>>> kkm

function SignInPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth(); // AuthContext에서 login 함수를 가져옴

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // AuthContext의 login 함수를 호출하면 api.js에 설정된 axios 인스턴스를 사용하여 백엔드에 로그인 요청을 보냄
      await login(email, password);
      alert("로그인 성공!");
      navigate("/"); // 로그인 후 메인 페이지로 이동
    } catch (err) {
      console.error("로그인 에러:", err);
      alert("이메일 또는 비밀번호가 틀렸습니다!");
=======
  const { login } = useAuth(); // ✅ 로그인 함수 가져오기

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(id, password);
    if (success) {
      window.dispatchEvent(new Event("authChange")); // ✅ 로그인 이벤트 발생
      navigate("/"); // 로그인 성공 시 홈으로 이동
    } else {
      setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
>>>>>>> kkm
    }
  };

  return (
    <div className="signin-container">
      <h1>로그인</h1>
      <form className="signin-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
<<<<<<< HEAD
=======
        {errorMessage && <p className="error">{errorMessage}</p>}
>>>>>>> kkm
        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
