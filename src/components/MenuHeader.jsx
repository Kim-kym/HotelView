//  최상단 메뉴바
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styled/MenuHeader.css";

function MenuHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // localStorage에서 로그인 정보 확인
    const userToken = localStorage.getItem("userToken"); // 로그인 시 토큰 저장된다고 가정
    const role = localStorage.getItem("userRole"); // "admin" 또는 "user"로 저장한다고 가정

    if (userToken) {
      setIsLoggedIn(true);
      setUserRole(role); // 역할 설정
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // 로그아웃 시 토큰 삭제
    localStorage.removeItem("userRole"); // 역할 정보 삭제
    setIsLoggedIn(false);
    setUserRole("");
  };

  return (
    <header className="page-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <h1>
              <img src="images/logo.png" alt="Logo" />
            </h1>
          </Link>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <a href="/">예약</a>
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
              {userRole === "admin" ? (
                <Link to="/admin/edit-user">
                  <button>회원 정보 수정</button>
                </Link>
              ) : (
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
