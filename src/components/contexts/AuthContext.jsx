// AuthContext.jsx (수정 예시)
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인 요청 (세션 유지)
  const login = async (id, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8050/hotel/users/login",
        { id, password },
        { withCredentials: true } // ✅ 세션 유지
      );
      if (response.data) {
        setIsAuthenticated(true);
        setUser({
          id: response.data.id,
          userRole: response.data.userRole || "user", // ✅ 기본값을 "user"로 설정
        });
        sessionStorage.setItem("isAuthenticated", "true");
        return true;
      }
    } catch (error) {
      console.error("로그인 실패", error);
      return false;
    }
  };

  // 자동 로그인 유지 (백엔드에서 세션 확인)
  const checkAuthStatus = async () => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      try {
        const response = await axios.post(
          "http://localhost:8050/hotel/users/mypage",
          {},
          { withCredentials: true }
        );
        if (response.data) {
          setIsAuthenticated(true);
          setUser(response.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("세션 확인 오류:", error);
        setIsAuthenticated(false);
      }
    }
  };

  // 로그아웃 요청
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8050/hotel/users/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setUser(null);
      sessionStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
