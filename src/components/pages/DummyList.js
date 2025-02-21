// src/data/dummyData.js

export const dummyHotels = [
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
    image: "/images/hotel.png",
  },
  {
    id: 3,
    name: "호텔 오션뷰",
    address: "제주특별자치도 제주시 해안로 67",
    rating: 4.7,
    price: "200,000",
    image: "/images/hotel.png",
  },
  {
    id: 4,
    name: "호텔 블루",
    address: "인천광역시 연수구 송도동",
    rating: 4.3,
    price: "140,000",
    image: "/images/hotel.png",
  },
  {
    id: 5,
    name: "호텔 로얄",
    address: "대구광역시 중구 동성로",
    rating: 4.6,
    price: "160,000",
    image: "/images/hotel.png",
  },
  {
    id: 6,
    name: "호텔 스카이",
    address: "대전광역시 서구 둔산동",
    rating: 4.2,
    price: "130,000",
    image: "/images/hotel.png",
  },
  {
    id: 7,
    name: "호텔 센트럴",
    address: "광주광역시 북구 운암동",
    rating: 4.1,
    price: "125,000",
    image: "/images/hotel.png",
  },
  {
    id: 8,
    name: "호텔 그랜드",
    address: "울산광역시 남구 삼산동",
    rating: 4.8,
    price: "210,000",
    image: "/images/hotel.png",
  },
  {
    id: 9,
    name: "호텔 다이아몬드",
    address: "경기도 수원시 팔달구",
    rating: 4.4,
    price: "145,000",
    image: "/images/hotel.png",
  },
  {
    id: 10,
    name: "호텔 벨라",
    address: "강원도 춘천시 중앙로",
    rating: 4.5,
    price: "155,000",
    image: "/images/hotel.png",
  },
];

export const roomImages = [
  { id: 1, src: "/images/room1.jpg", alt: "방 사진1" },
  { id: 2, src: "/images/room2.jpg", alt: "방 사진2" },
  { id: 3, src: "/images/room3.jpg", alt: "방 사진3" },
  { id: 4, src: "/images/room4.jpg", alt: "방 사진4" },
  { id: 5, src: "/images/room5.jpg", alt: "방 사진5" },
  { id: 6, src: "/images/room6.jpg", alt: "방 사진6" },
];

export const reviews = [
  { id: 1, rating: "★★★★★", date: "2023-01-01", content: "리뷰 내용 1" },
  { id: 2, rating: "★★★★★", date: "2023-02-01", content: "리뷰 내용 2" },
  { id: 3, rating: "★★★★★", date: "2023-03-01", content: "리뷰 내용 3" },
];

export const roomsData = [
  { id: 1, image: "/images/room1.jpg", name: "싱글룸" },
  { id: 2, image: "/images/room2.jpg", name: "더블룸" },
  { id: 3, image: "/images/room3.jpg", name: "스위트룸" },
];

export const reserveDetails = [
  { id: 1, label: "가격", value: "150,000" },
  { id: 2, label: "남은 객실", value: "1" },
];
