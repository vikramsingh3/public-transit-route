import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import SearchLocationInput from "./SearchLocationInput";

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
    <div className="bg-green-700 p-6 md:p-10 rounded-lg">
      <p className="font-bold">Search and select a place to add as "STOP"</p>
      <SearchLocationInput onPlaceSelect={addPlaceAsStop} />
      {errorMessage && (
        <span className="bg-red-600 rounded px-3 py-0 text-xs my-3">
          {errorMessage}
        </span>
      )}
      <ul className="flex flex-col gap-2 mt-4">
        {stopList.map((stop) => (
          <li
            key={stop.stopId}
            className="bg-amber-300 px-4 py-1 rounded text-green-600 font-bold flex flex-row items-center justify-between hover:scale-105 transition duration-200"
          >
            <span>{stop.stopName}</span>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                deleteStop(stop.stopId);
              }}
              className="cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stops;
