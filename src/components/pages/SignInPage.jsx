import { useAuth } from "../contexts/AuthContext";

function SignInPage() {
  const { username, setUsername, password, setPassword, handleLogin } =
    useAuth();

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ 폼 제출 시 새로고침 방지
    handleLogin(); // ✅ 로그인 로직 실행
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="userId"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default SignInPage;
