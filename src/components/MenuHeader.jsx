//  최상단 메뉴바

import { Link } from "react-router-dom";
import "../styled/MenuHeader.css";

function MenuHeader() {
  return (
    <header className="page-header">
      <div className="header-container">
        <div className="header-logo">
          <h1>logo</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <a href="/">예약</a>
            </li>
            <li>
              <a href="/">숙소</a>
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
          <button>회원가입</button>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          {/* <button>My</button> */}
        </div>
      </div>
    </header>
  );
}
export default MenuHeader;
