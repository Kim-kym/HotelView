// src/components/pages/SignInPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ AuthContext 추가
import "../../styled/SignInPage.css";

function SignInPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ 로그인 함수 가져오기

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(id, password);
    if (success) {
      window.dispatchEvent(new Event("authChange")); // ✅ 로그인 이벤트 발생
      navigate("/"); // 로그인 성공 시 홈으로 이동
    } else {
      setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
