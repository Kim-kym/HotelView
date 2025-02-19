import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../../styled/SignInPage.css";

function SignInPage() {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(username, password); // ✅ 로그인 성공 여부 반환
    if (success) {
      navigate("/"); // ✅ 로그인 성공 후 대시보드로 이동
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <div className="signin-container">
      <h1>로그인</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username" //
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="submit-button">로그인</button>
      </form>
    </div>
  );
}

export default SignInPage;
