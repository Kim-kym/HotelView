import React, { useState } from "react";
import JejuMap from "../maps/JejuMap";
import ReserveForm from "../forms/ReserveForm";
import HomeHotelList from "./HomeHotelList";
import "../../styled/MapWithSearch.css";
import dummyHotels from "./DummyList"; // ✅ 올바른 데이터 import

function MapWithSearch() {

  const [hotels, setHotels] = useState(dummyHotels || []);

  console.log("호텔 데이터:", hotels); // ✅ hotels 데이터 확인

  return (
    <div className="map-search-container">
      <div className="map-container">
        <JejuMap />
      </div>
      <div className="search-container">
        <ReserveForm setHotels={setHotels} />
      </div>
      <div className="hotel-list-container">
        <HomeHotelList hotels={hotels} />
      </div>
    </div>
  );
}

export default MapWithSearch;
