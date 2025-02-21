// import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* 상단 제주도 바다 이미지 */}
    <div className="relative w-full h-[400px]">
      <img
      src="/images/sea.jpg"
      alt="제주도 바다"
      className="w-full h-full object-cover"/>
      <div className="absolute insert-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center">
      <h1 className="text-5xl font-bold drop-shadow-lg">회사 소개</h1>
      <p className="text-lg mt-2 drop-shadow-lg">고객을 위한 최고의 호텔 관리 시스템</p>
      </div>
      </div>

        {/* 소개 섹션 */}
        <div className="bg-gray-100 py-16 px-8 md:px-20 text-gray-900">
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">최고의 호텔 관리 시스템</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center">
        저희는 전 세계 호텔과 협력하여 고객이 최고의 서비스를 받을 수 있도록
        호텔 예약, 결제 및 리뷰 시스템을 제공합니다. <br />
        <br />
        고객 만족도를 최우선으로 두고, 최고의 기술과 함께 혁신적인 호텔 관리 플랫폼을 개발하고 있습니다.
        </p>
            
        {/* 홈 이동 버튼 */}
        <div className="text-center mt-8">
         <button onClick={() => navigate("/")}
         className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
          홈으로 돌아가기
        </button>  
        </div>
        </div>

        {/* 하단 회사 설명 섹션 */}
        <div className="bg-white py-16 px-8 md:px-20 text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">우리 회사는?</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center">
          저희는 고객 중심의 호텔 관리 시스템을 제공하며, 24시간 실시간 예약과
          결제 시스템을 통해 고객이 언제든지 편리하게 호텔을 이용할 수 있도록 돕습니다.
          <br />
          <br />
          또한, 맞춤형 추천 서비스와 고객 리뷰 시스템을 통해 보다 나은 경험을 제공합니다.
        </p>
        </div>

        {/* 로고 클릭 시 홈으로 이동 */}
        <div className="flex justify-center mt-10">
          <img src="/images/logo.JPG" 
               alt="Logo"
               className="curosr-pointer w-32"
               onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default CompanyIntro;
