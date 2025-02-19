// // src/components/HotelList.js
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../../styled/HotelList.css";

// function HotelList() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHotels() {
//       try {
//         const response = await fetch("https://localhost:8050/api/hotels");
//         const data = await response.json();
//         setHotels(data);
//       } catch (error) {
//         console.error("호텔 데이터를 불러오는 중 오류 발생:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHotels();
//   }, []);

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div className="hotel-list-container">
//       <div className="hotel-list-background">
//         <img src="/images/sea.jpg" alt="sea"></img>
//         <div className="container">
//           <div className="hotel-list">
//             {hotels.map((hotel) => (
//               <div key={hotel.id} className="hotel">
//                 <Link to={`/hotel/${hotel.id}`}>
//                   <img src={hotel.image} alt={`호텔 ${hotel.name}`} />
//                   <div className="hotel-info">
//                     <h2>{hotel.name}</h2>
//                     <p>주소: {hotel.address}</p>
//                     <p>평점: {hotel.rating} / 5</p>
//                     <p>가격: {hotel.price}</p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HotelList;
