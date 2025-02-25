import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 추가
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  //  로그인 상태 확인 함수 (백엔드 세션 활용)
  const checkAuthStatus = async () => {
    try {
      const response = await api.post("/user/login", {}, { withCredentials: true });
      if (response.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
      } else {
        setIsAuthenticated(false);
        setUserRole("");
      }
    } catch (error) {
      console.error("세션 확인 오류:", error);
      setIsAuthenticated(false);
    }
  };

  // 로그인 필요한 페이지에서 로그인 상태 확인 및 리디렉트
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/reservation") || path.startsWith("/mypage") || path.startsWith("/admin")) {
      checkAuthStatus().then(() => {
        if (!isAuthenticated) {
          navigate("/login"); // ✅ 로그인 상태가 아니면 로그인 페이지로 이동
        }
      });
    }
  }, [isAuthenticated, navigate]);

  // 로그아웃 함수
  const logout = async () => {
    try {
      await api.post("/user/logout");
      setIsAuthenticated(false);
      setUserRole("");
      navigate("/"); // 홈페이지로 이동
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };
 
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}