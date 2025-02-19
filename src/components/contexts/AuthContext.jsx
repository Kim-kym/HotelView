import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ 로그인 상태 추가

  // ✅ 로그인 상태 유지 (Spring Boot 세션 확인)
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/session-info", {
        method: "GET",
        credentials: "include", // ✅ 쿠키 포함하여 세션 확인
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("세션 확인 오류:", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8050/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ 세션 로그인
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true); // ✅ 로그인 상태 업데이트
        return true; // ✅ 로그인 성공 여부 반환
      } else {
        return false; // ❌ 로그인 실패
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        credentials: "include", // ✅ 서버에서 세션 삭제
      });

      setIsAuthenticated(false); // ✅ 로그아웃 상태 변경
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, // ✅ 로그인 상태 추가
        handleLogin,
        handleLogout, // ✅ 로그아웃 함수 추가
        checkAuthStatus, // ✅ 로그인 상태 확인 함수 추가
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
