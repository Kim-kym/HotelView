import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/SignInPage.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8020/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        sessionStorage.setItem("userRole", result.role); // ✅ 세션 스토리지에 역할 저장

        alert("로그인 성공!");
        navigate("/"); // ✅ 로그인 후 메인 페이지(`/`)로 이동
      } else {
        alert("이메일 또는 비밀번호가 틀렸습니다!");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signin-container">
      <h1>로그인</h1>
      <form className="signin-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
