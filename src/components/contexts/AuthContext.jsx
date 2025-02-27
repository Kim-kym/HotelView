// AuthContext.jsx (수정 예시)
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // 로그인 함수 추가
  const login = async (email, password) => {
    try {
      // 실제로 백엔드에 로그인 요청
      const response = await api.post(
        "/users/login", // 예: 스프링부트 UserController의 /users/login
        { id: email, password }, // 백엔드가 받는 필드명에 맞춰 전달
        { withCredentials: true }
      );
      // 로그인 성공 → 응답에 유저 정보(예: role) 있다고 가정
      const userData = response.data;
      setIsAuthenticated(true);
      setUserRole(userData.role); // 예: "USER" or "ADMIN"
    } catch (error) {
      console.error("로그인 실패:", error);
      setIsAuthenticated(false);
      setUserRole("");
      throw error; // 혹은 에러 처리
    }
  };

  // 세션 체크 (이미 로그인된 상태인지 확인) - 선택적으로 유지
  const checkAuthStatus = async () => {
    try {
      const response = await api.post("/users/mypage", {}, { withCredentials: true });
      if (response.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
      }
    } catch (error) {
      console.error("세션 확인 오류:", error);
      setIsAuthenticated(false);
      setUserRole("");
    }
  };

  useEffect(() => {
    // 페이지 로드 시 세션 검사 (선택사항)
    checkAuthStatus();
  }, []);

  // 로그아웃
  const logout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserRole("");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
