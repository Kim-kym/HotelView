import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 추가
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // 마운트 시와 authChange 이벤트 발생 시 sessionStorage를 기반으로 로그인 상태 확인
  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  //  로그인 상태 확인 함수 
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

  // 세션 만료 감지 (1분마다 체크)
  useEffect(() => {
    checkAuthStatus();  // 처음 마운트 시 로그인 상태 확인

    const interval = setInterval(() => {
      checkAuthStatus();  // 1분마다 로그인 상태 확인
    }, 60000); // 1분마다 실행

    return () => clearInterval(interval);  // 언마운트 시 인터벌 해제
  }, []);
  
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