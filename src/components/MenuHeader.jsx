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
      const role = sessionStorage.getItem("userRole");
      setIsLoggedIn(!!role);
      setUserRole(role || "");
      console.log("현재 userRole 상태 업데이트됨:", role);
    };

    updateAuthState();
    window.addEventListener("authChange", updateAuthState);
    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, []);

  // 로그인 버튼은 단순히 로그인 페이지로 이동하도록 하고,
  // 실제 로그인 처리는 SignInPage에서 진행합니다.
  // handleLogin 함수는 MenuHeader에서 직접 사용하지 않습니다.
  // (필요하다면 별도의 로그인 모달이나 기능을 구현할 수 있습니다.)

  const handleLogout = () => {
    // 필요한 인증 관련 키만 제거
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserRole("");
    console.log("로그아웃 완료 - userRole: (이제 없음)");
    window.dispatchEvent(new CustomEvent("authChange"));
    navigate("/");
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
              <Link to="/companyintro">소개</Link>
            </li>
            <li>
              <Link to="/hotels">호텔</Link>
            </li>
            <li>
              <a href="/">장바구니</a>
            </li>
            <li>
              <Link to="/board">고객센터</Link>
            </li>
          </ul>
        </nav>
        <div className="header-right-box">
          {!isLoggedIn && (
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          )}

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
              <button>로그인</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default MenuHeader;