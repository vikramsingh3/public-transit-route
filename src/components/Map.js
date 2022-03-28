import React, { useEffect, useRef } from "react";

const Map = ({ stops, direction }) => {
  const mapRef = useRef(null);
  const calculatedLabel = (index) => {
    if (direction === "up" && index === 0) return "Start";
    if (direction === "up" && index === stops.length - 1) return "End";
    if (direction === "down" && index === 0) return "End";
    if (direction === "down" && index === stops.length - 1) return "Start";
  };

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: stops[0].lat,
        lng: stops[0].lng,
      },
      zoom: 10,
    });

    const polyline = new window.google.maps.Polyline({
      path: stops.map((stop) => {
        return { lat: stop.lat, lng: stop.lng };
      }),
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(map);

    stops.forEach((element, index) => {
      new window.google.maps.Marker({
        position: element,
        map: map,
        title: element.stopName,
        label: calculatedLabel(index),
      });
    });
  }, []);

  return (
    <div className="rounded border-2 border-green-600 shadow">
      <div ref={mapRef} className="h-full min-h-[400px] md:min-h-full"></div>
    </div>
  );
};

export default Map;
