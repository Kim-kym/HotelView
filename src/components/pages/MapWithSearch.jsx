import React, { useState, useEffect } from "react";
import JejuMap from "../maps/JejuMap";
import ReserveForm from "../forms/ReserveForm";
import HomeHotelList from "./HomeHotelList";
import "../../styled/MapWithSearch.css";
import { dummyHotels } from "./DummyList"; // ✅ 올바른 데이터 import

function MapWithSearch() {
  const [hotels, setHotels] = useState(dummyHotels || []);
  // const [scrollY, setScrollY] = useState(0);
  // const [videoOpacity, setVideoOpacity] = useState(1);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const newScrollY = window.scrollY;
  //     const scrollDiff = newScrollY - lastScrollY;

  //     let newOpacity = Math.max(1 - newScrollY / 800, 0);

  //     if (scrollDiff < 0) {
  //       newOpacity = Math.min(videoOpacity + 0.02, 1);
  //     }

  //     setVideoOpacity(newOpacity);
  //     setLastScrollY(newScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [videoOpacity, lastScrollY]);

  return (
    <div className="map-search-container">
      {/* <div
        className="video-background"
        style={{ opacity: videoOpacity, transition: "opacity 1s ease-in-out" }}
      >
        <video autoPlay loop muted className="background-video">
          <source src="/videos/jeju6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
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
