// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
// useNavigate는 사용하지 않으므로 제거 가능
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 추가

  // 마운트 시와 authChange 이벤트 발생 시 sessionStorage를 기반으로 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    // 실제 백엔드 API 호출 코드 (주석 처리)
    /*
    try {
      const response = await fetch("http://localhost:8050/user/session-info", {
        method: "GET",
        credentials: "include", // 쿠키 포함하여 세션 확인
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
    */
    // Dummy 방식: sessionStorage에 userRole이 있으면 로그인 상태로 처리
    const userRole = sessionStorage.getItem("userRole");
    if (userRole) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (username, password) => {
    // 실제 API 호출 코드 (주석 처리)
    /*
    try {
      const response = await fetch("http://localhost:8050/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션 로그인
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true); // 로그인 상태 업데이트
        return true; // 로그인 성공 여부 반환
      } else {
        return false; // 로그인 실패
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      return false;
    }
      */
    // Dummy 로그인 로직: userDummy에 있는 정보 대신 간단한 조건문으로 처리
    if (username === "hong@example.com" && password === "hong123!") {
      sessionStorage.setItem("userRole", "user");
      sessionStorage.setItem("userName", "홍길동");
      sessionStorage.setItem("userId", "1");
      sessionStorage.setItem("userEmail", "hong@example.com");
      setIsAuthenticated(true);
      return true;
    } else if (username === "admin@example.com" && password === "admin123!") {
      sessionStorage.setItem("userRole", "admin");
      sessionStorage.setItem("userName", "관리자");
      sessionStorage.setItem("userId", "2");
      sessionStorage.setItem("userEmail", "admin@example.com");
      setIsAuthenticated(true);
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = async () => {
    // 실제 API 호출 코드 (주석 처리)
    /*
    try {
      await fetch("http://localhost:8050/user/logout", {
        method: "POST",
        credentials: "include", // 서버에서 세션 삭제
      });
      setIsAuthenticated(false); // 로그아웃 상태 변경
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
    */
    // Dummy 로그아웃 로직: sessionStorage에서 관련 항목 제거 후 authChange 이벤트 발생
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    window.dispatchEvent(new CustomEvent("authChange"));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, // 로그인 상태
        handleLogin,     // 로그인 함수
        handleLogout,    // 로그아웃 함수
        checkAuthStatus, // 로그인 상태 확인 함수
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}