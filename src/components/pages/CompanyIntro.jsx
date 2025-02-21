// import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/CompanyIntro.css";


const CompanyIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="company-intro-container">
      {/* 상단 제주도 바다 이미지 섹션 */}
      <div className="company-header">
        <h1>회사 소개</h1>
        <p>고객을 위한 최고의 호텔 관리 시스템</p>
      </div>

      {/* 소개 섹션 */}
      <div className="company-content">
        <h2>최고의 호텔 관리 시스템</h2>
        <p>
          저희는 전 세계 호텔과 협력하여 고객이 최고의 서비스를 받을 수 있도록
          호텔 예약, 결제 및 리뷰 시스템을 제공합니다.
        </p>

        {/* 추가 이미지 */}
        <div className="company-images">
          <img src="/images/hotel1.jpg" alt="호텔 내부" />
          <img src="/images/hotel2.jpg" alt="고급 호텔" />
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <button className="back-to-home" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>

      {/* 로고 클릭 시 홈으로 이동 */}
      <div className="logo-container">
        <img
          src="/images/logo.JPG"
          alt="회사 로고"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default CompanyIntro;
