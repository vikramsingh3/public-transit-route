import React, { useEffect, useState } from "react";
import axiosAPI from "../shared/Axios";
import { useParams, Link } from "react-router-dom";
import Map from "../components/Map";

const RouteView = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  const fetchRouteData = async () => {
    try {
      const response = await axiosAPI.get("/routes/" + id + ".json");
      setRoute(response.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRouteData();
  }, []);

  return (
    route && (
      <>
        <Link
          to="/"
          className="px-3 py-2 rounded bg-amber-300 hover:bg-amber-400 text-green-600 font-semibold"
        >
          Back
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 mb-8 ">
          <div className="bg-green-600 shadow p-10 rounded text-white min-h-[400px]">
            <div className="text-2xl mb-4">{route.routeName}</div>
            <div className="mb-4">
              <span className="font-bold">Direction : </span>
              {route.direction.toUpperCase()}
            </div>
            <div className="mb-4">
              <span className="font-bold">Status : </span>
              {route.status.toUpperCase()}
            </div>
            <p className="text-lg font-bold">Route path</p>
            <ul
              className={`flex ${
                route.direction.toUpperCase() === "UP"
                  ? "flex-col"
                  : "flex-col-reverse"
              } gap-3`}
            >
              {route.stops.map((item, index) => (
                <li
                  key={index}
                  className="border-amber-300 border-2 border-dashed rounded-full px-3 py-1"
                >
                  {item.stopName}
                </li>
              ))}
            </ul>
          </div>
          <Map direction={route.direction} stops={route.stops} />
        </div>
      </>
    )
  );
};

export default RouteView;
