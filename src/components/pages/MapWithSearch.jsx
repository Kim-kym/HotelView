import React from "react";
import JejuMap from "../maps/JejuMap";
import ReserveForm from "../forms/ReserveForm";
import "../../styled/MapWithSearch.css";

function MapWithSearch() {
  return (
    <div className="map-search-container">
      <div className="map-container">
        <JejuMap />
      </div>
      <div className="search-container">
        <ReserveForm />
      </div>
    </div>
  );
}

export default MapWithSearch;
