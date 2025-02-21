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
    <p> 자쿠과는 **여행을 더욱 특별하게 만들어주는 맞춤형 호텔 예약 서비스**입니다.
          제주도에서 시작된 자쿠과는, 사용자의 취향과 여행 목적에 맞는 호텔을 추천하고,
          최상의 고객 서비스를 제공합니다.
      </p>
    </div>
      {/* 특별한 서비스 소개 */}
      <div className="special-service">
        <h2>자쿠과만의 특별한 서비스</h2>
        <p>
          ✅ AI 기반 **맞춤형 호텔 추천 시스템** <br />
          ✅ 24시간 **실시간 고객 지원 및 상담** <br />
          ✅ **포인트 적립 & 할인 혜택 제공** <br />
          ✅ **프리미엄 회원 전용 VIP 라운지 이용** <br />
        </p>
      </div>
      
      {/* 소개 섹션 */}
      <div className="company-content">
        <h2>최고의 호텔 관리 시스템</h2>
        <p>
          저희는 전 세계 호텔과 협력하여 고객이 최고의 서비스를 받을 수 있도록
          호텔 예약, 결제 및 리뷰 시스템을 제공합니다.
        </p>

        {/* 추가 이미지 */}
        {/* <div className="company-images">
          <img src="/images/hotel1.jpg" alt="호텔 내부" />
          <img src="/images/hotel2.jpg" alt="고급 호텔" />
        </div> */}

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
