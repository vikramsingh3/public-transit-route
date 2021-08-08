import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";
import "./Stops.css";

const Stops = ({ grabStops, errorMessage, stops }) => {
  const [stopList, setStopList] = useState([...stops]);

  const addPlaceAsStop = (place) => {
    const { place_id, name, geometry } = place;
    const stop = {
      stopId: place_id,
      stopName: name,
      lat: geometry.location.lat(),
      lng: geometry.location.lng(),
    };
    setStopList((prevStopList) => {
      const found = prevStopList.find(
        (stopItem) => stopItem.stopId === stop.stopId
      );
      return found ? [...prevStopList] : [...prevStopList, stop];
    });
  };

  const deleteStop = (stopId) => {
    setStopList((prevStopList) => {
      const index = prevStopList.findIndex((stop) => stop.stopId === stopId);
      return [
        ...prevStopList.slice(0, index),
        ...prevStopList.slice(index + 1),
      ];
    });
  };

  useEffect(() => {
    grabStops(stopList);
  }, [stopList]);

  return (
    <div className="Stops">
      <p className="Stops__title">Search and select a place to add as "STOP"</p>
      <SearchLocationInput onPlaceSelect={addPlaceAsStop} />
      <p className="Stops__errorMessage">{errorMessage}</p>
      <ul className="Stops__ul">
        {stopList.map((stop) => (
          <li key={stop.stopId} className="Stops__li">
            <span>{stop.stopName}</span>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                deleteStop(stop.stopId);
              }}
              className="Stops__delete"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stops;
