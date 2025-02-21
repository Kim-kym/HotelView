//  최상단 메뉴바
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/MenuHeader.css";
import "../styled/MyPage.css";

function MenuHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthState = () => {
      setTimeout(() => { // ✅ 상태 업데이트 보장
        const role = sessionStorage.getItem("userRole");
        setIsLoggedIn(!!role);
        setUserRole(role || "");
        console.log("현재 userRole 상태 업데이트됨:", role); // ✅ 로그 확인
      }, 0);
    };
  
    updateAuthState();
    window.addEventListener("authChange", updateAuthState);
  
    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, []);


  const handleLogin = (role) => {
    console.log("handleLogin 함수 실행됨! role:", role);
    sessionStorage.setItem("userRole", role);
    window.dispatchEvent(new CustomEvent("authChange"));
    console.log("로그인 완료 - 저장된 userRole:", sessionStorage.getItem("userRole")); // ✅ 콘솔 확인
  };

  const handleLogout = () => {
    sessionStorage.clear(); // 세션 로그아웃 처리
    setIsLoggedIn(false);

    setTimeout(() => {
      setUserRole(""); // ✅ 상태 즉시 반영 보장
      console.log("로그아웃 완료 - userRole:", userRole); // ✅ 콘솔에서 확인
      window.dispatchEvent(new CustomEvent("authChange"));
      navigate("/");
    }, 0);
  };
  
  return (
    <header className="page-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <h1>
              <img src="/images/logo.JPG" alt="Logo" />
            </h1>
          </Link>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/company">소개</Link> {/* 링크로 수정한 부분 */}
            </li>
            <li>
              <Link to="/hotels">호텔</Link>
            </li>
            {/* <li>
              <a href="/">즐겨찾기</a>
            </li> */}
            <li>
              <a href="/">장바구니</a>
            </li>
            {/* <li>
              <a href="/">이벤트/혜택</a>
            </li> */}
            <li>
              <a href="/">고객 센터</a>
            </li>
          </ul>
        </nav>
        <div className="header-right-box">
          {/* 로그인 상태에 따라 버튼 표시 */}
          {!isLoggedIn && (
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          )}

          {/* userRole에 따라 버튼 표시 */}
          {userRole && (
            <>
              {userRole === "admin" && (
                <Link to="/admin">
                  <button>회원 관리</button>
                </Link>
              )}
              {userRole === "user" && (
                <Link to="/mypage">
                  <button>마이페이지</button>
                </Link>
              )}
            </>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link to="/login">
              <button onClick={() => handleLogin("user")}>로그인</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
export default MenuHeader;
