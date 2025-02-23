import React, { useState, useEffect } from "react";
import JejuMap from "../maps/JejuMap";
import ReserveForm from "../forms/ReserveForm";
import HomeHotelList from "./HomeHotelList";
import "../../styled/MapWithSearch.css";
import { dummyHotels } from "./DummyList"; // ✅ 올바른 데이터 import

function MapWithSearch() {
  const [hotels, setHotels] = useState(dummyHotels || []);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="map-search-container">
      <div className={`video-background ${isHidden ? "hidden" : ""}`}>
        <video autoPlay loop muted className="background-video">
          <source src="/videos/jeju6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
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
