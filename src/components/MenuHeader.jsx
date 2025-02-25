import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import "../styled/MenuHeader.css";
import "../styled/MyPage.css";

function MenuHeader() {
  const { isAuthenticated, userRole, logout } = useAuth();

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
          {!isAuthenticated && (
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

          {isAuthenticated ? (
            <button onClick={logout}>로그아웃</button>
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