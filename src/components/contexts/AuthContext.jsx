import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ✅ 새로고침 시 sessionStorage에서 로그인 상태 불러오기
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(
    sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
  );

  const navigate = useNavigate();

  // ✅ 로그인 함수 (로그인 시 sessionStorage에 저장)
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
          userRole: response.data.userRole || "user", // ✅ 기본값 설정
        });

        // ✅ 로그인 상태를 sessionStorage에 저장 (새로고침 후에도 유지)
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("user", JSON.stringify({
          id: response.data.id,
          userRole: response.data.userRole || "user",
        }));

        return true;
      }
    } catch (error) {
      console.error("로그인 실패", error);
      return false;
    }
  };

  // ✅ 로그아웃 함수 (로그아웃 시 sessionStorage 삭제)
  const logout = async () => {
    try {
      console.log("로그아웃 요청 시작");

      const response = await axios.post(
        "http://localhost:8050/hotel/users/logout",
        {},
        { withCredentials: true }
      );

      console.log("로그아웃 응답:", response.data);
      setIsAuthenticated(false);
      setUser(null);

      // ✅ 로그아웃 시 sessionStorage에서 로그인 정보 삭제
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("user");

      window.dispatchEvent(new Event("authChange")); // ✅ UI 업데이트 트리거
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
