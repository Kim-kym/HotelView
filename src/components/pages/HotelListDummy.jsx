// src/components/HotelListDummy.js
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../styled/HotelList.css";

function HotelListDummy() {
  // 10개의 더미 데이터
  const dummyHotels = [
    {
      id: 1,
      name: "호텔 프리미어",
      address: "서울특별시 강남구 테헤란로 123",
      rating: 4.5,
      price: "150,000",
      image: "/images/hotel_dummy.jpg",
    },
    {
      id: 2,
      name: "호텔 클래식",
      address: "부산광역시 해운대구 달맞이길 45",
      rating: 4.0,
      price: "120,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+2",
    },
    {
      id: 3,
      name: "호텔 오션뷰",
      address: "제주특별자치도 제주시 해안로 67",
      rating: 4.7,
      price: "200,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+3",
    },
    {
      id: 4,
      name: "호텔 블루",
      address: "인천광역시 연수구 송도동",
      rating: 4.3,
      price: "140,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+4",
    },
    {
      id: 5,
      name: "호텔 로얄",
      address: "대구광역시 중구 동성로",
      rating: 4.6,
      price: "160,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+5",
    },
    {
      id: 6,
      name: "호텔 스카이",
      address: "대전광역시 서구 둔산동",
      rating: 4.2,
      price: "130,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+6",
    },
    {
      id: 7,
      name: "호텔 센트럴",
      address: "광주광역시 북구 운암동",
      rating: 4.1,
      price: "125,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+7",
    },
    {
      id: 8,
      name: "호텔 그랜드",
      address: "울산광역시 남구 삼산동",
      rating: 4.8,
      price: "210,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+8",
    },
    {
      id: 9,
      name: "호텔 다이아몬드",
      address: "경기도 수원시 팔달구",
      rating: 4.4,
      price: "145,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+9",
    },
    {
      id: 10,
      name: "호텔 벨라",
      address: "강원도 춘천시 중앙로",
      rating: 4.5,
      price: "155,000",
      image: "https://via.placeholder.com/300x200?text=Hotel+10",
    },
  ];

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // url 쿼리 파라미터
  // 새로고침 시에도 url에 저장된 정렬 옵션을 이용해 상태 복원
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get("sort") || "recommend";
  // 적용된 정렬 버튼에 색을 입히기 위한 상태 저장
  const [activeSort, setActiveSort] = useState(initialSort);

  // 컴포넌트가 마운트되면 더미 데이터를 설정
  useEffect(() => {
    setHotels(dummyHotels);
    setLoading(false);
    handleSort(initialSort);
  }, []);

  const handleSort = (sortType) => {
    let sortedHotels = [...hotels];
    switch (sortType) {
      case "recommend":
        // 추천 순: 원래 데이터 순서로 복원하거나, 추천 알고리즘 적용 가능
        sortedHotels = [...dummyHotels];
        break;
      case "price":
        sortedHotels.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/,/g, ""));
          const priceB = parseInt(b.price.replace(/,/g, ""));
          return priceA - priceB;
        });
        break;
      case "rating":
        sortedHotels.sort((a, b) => b.rating - a.rating);
        break;
      case "favorites":
        sortedHotels.sort((a, b) => b.favorites - a.favorites);
        break;
      default:
        break;
    }
    setHotels(sortedHotels); // 정렬된 호텔 목록 업데이트
    setActiveSort(sortType); // 현재 활성화된 정렬 기준 업데이트
    setSearchParams({ sort: sortType }); // url 쿼리 파라미터 업데이트
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-background">
        <img src="/images/sea.jpg" alt="sea" />
      </div>

      <div className="hotel-list-wrapper">
        <div className="hotel-list-sortBar-box">
          <div className="hotel-list-sortBar-wrapper">
            <div
              className={`hotel-list-sortBar-button ${
                activeSort === "recommend" ? "active" : ""
              }`}
              role="button"
              onClick={() => handleSort("recommend")}
            >
              자쿠과 추천
            </div>
            <div
              className={`hotel-list-sortBar-button ${
                activeSort === "price" ? "active" : ""
              }`}
              role="button"
              onClick={() => handleSort("price")}
            >
              예약가 낮은 순
            </div>
            <div
              className={`hotel-list-sortBar-button ${
                activeSort === "rating" ? "active" : ""
              }`}
              role="button"
              onClick={() => handleSort("rating")}
            >
              후기 좋은 순
            </div>
            <div
              className={`hotel-list-sortBar-button ${
                activeSort === "favorites" ? "active" : ""
              }`}
              role="button"
              onClick={() => handleSort("favorite")}
            >
              찜 많은 순
            </div>
          </div>
        </div>
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-box">
              <Link to={`/hotels/${hotel.id}`}>
                <div className="hotel-box-background">
                  <img
                    className="hotel-image"
                    src={hotel.image}
                    alt={`호텔 ${hotel.name}`}
                  />
                  <div className="hotel-info">
                    <h2>{hotel.name}</h2>
                    <p>{hotel.address}</p>
                  </div>
                  <div className="hotel-status-wrapper">
                    <div className="hotel-rating">
                      <p>★ {hotel.rating}</p>
                    </div>
                    <div className="hotel-status"></div>
                    <div className="hotel-price">
                      <p>1박당 요금</p>
                      <p>{hotel.price}</p>
                    </div>
                    <div className="reservation-button">
                      <button>
                        <p>예약하기</p>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelListDummy;
