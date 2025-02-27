import "../styled/Footer.css";
import { useState } from "react";

function Footer() {
  // 선택 목록창에서 페이지 이동 (간단 예시)
  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (url) {
      window.location.href = url; // 실제 링크 이동
    }
  };

  return (
    <footer className="site-footer">
      {/* 상단 섹션 */}
      <div className="footer-top">
        {/* 왼쪽: 이용약관/회사정보 */}
        <div className="footer-left">
          <ul className="footer-links">
            <li><a href="#terms">이용약관</a></li>
            <li><a href="#privacy">개인정보처리방침</a></li>
            <li><a href="#faq">자주 묻는 질문</a></li>
            <li><a href="#partners">제휴/광고문의</a></li>
          </ul>

          <div className="footer-company-info">
            <p>
              <strong>(주)자쿠과</strong> | 대표자: 홍길동 | 사업자등록번호: 000-00-00000<br />
              통신판매업신고번호: 2024-서울-0000 | 고객센터: 000-0000-0000<br />
              제주특별자치도 서귀포시 대정읍  (우) 00000<br />
              Email: info@jakugwa.com
            </p>
          </div>
        </div>

        {/* 오른쪽: SNS 아이콘 + 선택 목록 */}
        <div className="footer-right">
          <div className="footer-social-icons">
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/public/images/인스타그램.jpg" alt="인스타그램" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="public/images/페이스북.jpg" alt="페이스북" />
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="public/images/유투브.jpg" alt="유튜브" />
            </a>
            <a 
              href="https://blog.naver.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="public/images/네이버 블로그.png" alt="네이버블로그" />
            </a>

            <a 
              href="https://www.kakaocorp.com/page/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/public/images/카카오톡.png" alt="카카오톡" />
            </a>

          </div>

          {/* 선택 목록창 */}
          <div className="footer-select">
            <select onChange={handleSelectChange} defaultValue="">
              <option value="">-- 이동할 페이지 --</option>
              <option value="/companyIntro">소개</option>
              <option value="/hotels">호텔</option>
              <option value="/cart">장바구니</option>
              <option value="/help">고객센터</option>
              <option value="/mypage">마이페이지</option>
            </select>
          </div>
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="footer-bottom">
        <p>© 2025 자쿠과. All rights reserved.</p>
        <p className="footer-contact">연락처: 000-0000-0000</p>
      </div>
    </footer>
  );
}

export default Footer;
