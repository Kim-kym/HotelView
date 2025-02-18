// 로그인 상태를 전역적을 관리하기 위한 context 파일.
// 어떤 컴포넌트에서든 편하게 로그인 상태값을 불러올 수 있도록 함

import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);
        alert("로그인 성공!");
        navigate("/dashboard");
      } else {
        alert("로그인 실패!");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 요청 중 오류 발생");
    }
  };

  return (
    <AuthContext.Provider
      value={{ username, setUsername, password, setPassword, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
