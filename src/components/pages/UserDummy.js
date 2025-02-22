const userDummy = [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      password: "password123!",
      profileImage: "https://via.placeholder.com/150",
      point: 1000,
      role: "user",
      reservations: [
        {
          id: 101,
          hotelName: "호텔 프리미어",
          location: "서울특별시 강남구 테헤란로 123",
          checkIn: "2024-04-15",
          checkOut: "2024-04-17",
          price: "300,000",
          status: "예약 완료"
        },
        {
          id: 102,
          hotelName: "제주 오션뷰 호텔",
          location: "제주특별자치도 제주시 해안로 67",
          checkIn: "2024-05-02",
          checkOut: "2024-05-05",
          price: "450,000",
          status: "결제 대기"
        }
      ]
    },
    {
      id: 2,
      name: "관리자",
      email: "admin@example.com",
      password: "admin123!",
      profileImage: "https://via.placeholder.com/150",
      role: "admin",
      reservations: [] // 어드민은 예약 데이터가 필요 없음
    }
  ];
  
  export default userDummy;
  