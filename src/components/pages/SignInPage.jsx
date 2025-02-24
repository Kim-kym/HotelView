import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/SignInPage.css";
import userDummy from "./UserDummy";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    const user = userDummy.find((u) => u.email === email && u.password === password);
  
    if (user) {
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userEmail", user.email);
  
      console.log("로그인 성공! 저장된 userRole:", sessionStorage.getItem("userRole")); // ✅ 로그 추가
  
      alert(`${user.name}님, 로그인 성공!`);
  
      // ✅ 로그인 이벤트 발생 (전역 상태 업데이트 유도)
      window.dispatchEvent(new CustomEvent("authChange"));
      console.log("authChange 이벤트 발생!");
      
      navigate("/"); // ✅ 로그인 후 메인 페이지 이동
    } else {
      alert("이메일 또는 비밀번호가 틀렸습니다!");
    }
  };
  
  


  // 실제로 사용해야 할 로그인 코드
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:8050/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       sessionStorage.setItem("userRole", result.role); // ✅ 세션 스토리지에 역할 저장

  //       alert("로그인 성공!");
  //       navigate("/"); // ✅ 로그인 후 메인 페이지(`/`)로 이동
  //     } else {
  //       alert("이메일 또는 비밀번호가 틀렸습니다!");
  //     }
  //   } catch (error) {
  //     console.error("로그인 오류:", error);
  //     alert("로그인 중 오류가 발생했습니다.");
  //   }
  



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
        <button type="submit" className="submit-button" >
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
