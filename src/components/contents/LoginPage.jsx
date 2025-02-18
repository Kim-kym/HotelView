import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleLogin = async () => {
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token); // JWT 토큰 저장
        alert("로그인 성공!");
        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate("/"); // 홈 페이지로 이동
      } else {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 요청 중 오류 발생");
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 로그인 버튼 클릭 시 handleLogin 실행 */}
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
