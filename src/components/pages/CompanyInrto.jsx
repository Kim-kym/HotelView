import React from "react";

const CompanyIntro = () => {
  return (
    <div className="relative w-full h-screen">
      {/* 배경 동영상 */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/company-intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 오버레이 (반투명 배경) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* 텍스트 컨텐츠 */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-4">회사 소개</h1>
        <p className="text-lg max-w-2xl">
          저희 회사는 글로벌 여행 서비스를 제공하며, 최고의 고객 경험을
          위해 혁신적인 기술과 서비스를 개발하고 있습니다.
        </p>
      </div>

      {/* 소개 섹션 */}
      <div className="relative bg-white text-gray-900 py-16 px-8 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-6">
          알뜰한 여행의 정석
        </h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          저희는 전 세계 450만 개 이상의 호텔 및 숙소와 협력하여, 합리적인 가격으로 최고의 여행 경험을 제공합니다.
          또한, 24시간 고객센터와 함께 여러분의 편리한 예약을 지원합니다.
          <br />
          <br />
          전 세계 27개국에서 운영되며, 글로벌 네트워크를 통해 편리한 여행 서비스를 제공합니다.
          최고의 기술과 함께 혁신적인 여행 플랫폼을 만들기 위해 노력하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default CompanyIntro;
