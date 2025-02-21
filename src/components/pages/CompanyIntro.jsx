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

      {/* "자쿠과" 브랜드 소개 */}
      <div className="company-description">
        <h2>자쿠과란?</h2>
        <p>
          <strong>자쿠과</strong>는 **여행을 더욱 특별하게 만들어주는 맞춤형 호텔 예약 서비스**입니다.  
          제주도에서 시작된 자쿠과는, 사용자의 취향과 여행 목적에 맞는 호텔을 추천하고,  
          **최상의 고객 서비스를 제공합니다.**  
        </p>
      </div>

      {/* 특별한 서비스 소개 */}
      <div className="special-service">
        <h2>자쿠과만의 특별한 서비스</h2>
        <p>
          ✅ **AI 기반 맞춤형 호텔 추천 시스템** <br />
          ✅ **24시간 실시간 고객 지원 및 상담** <br />
          ✅ **포인트 적립 & 할인 혜택 제공** <br />
          ✅ **프리미엄 회원 전용 VIP 라운지 이용** <br />
        </p>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <div className="text-center mt-8">
        <button className="back-to-home" onClick={() => navigate("/")}>
          H O M E
        </button>
      </div>
    </div>
  );
};

export default CompanyIntro;
