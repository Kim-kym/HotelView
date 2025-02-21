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
      const role = sessionStorage.getItem("userRole");
      setIsLoggedIn(!!role);
      setUserRole(role || "");
    };

    // ✅ 처음 실행할 때 세션 상태 확인
    updateAuthState();

    // ✅ 커스텀 이벤트 감지하여 로그인 상태 업데이트
    window.addEventListener("authChange", updateAuthState);

    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // 세션 로그아웃 처리
    window.dispatchEvent(new CustomEvent("authChange")); // ✅ 상태 변경 이벤트 발생
    navigate("/");
  };
  const handleLogout = () => {
    sessionStorage.clear(); //  세션 로그아웃 처리
    setIsLoggedIn(false);
    setUserRole("");
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
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
              <Link to="/login">
                <button>로그인</button>
              </Link>
            </>
          ) : (
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
              <button onClick={handleLogout}>로그아웃</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default MenuHeader;
