import React, { useEffect, useState } from "react";
import axiosAPI from "../../shared/Axios";
import { useParams, Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import "./RouteView.css";

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
      <div className="RouteView">
        <div className="RouteView__details">
          <Link to="/" className="Button Button_secondary">
            Back
          </Link>
          <p className="RouteView__name">{route.routeName}</p>
          <span className="RouteView__direction">
            Direction : {route.direction.toUpperCase()}
          </span>
          <span className="RouteView__status">
            Status : {route.status.toUpperCase()}
          </span>
          <p className="RouteView__heading">Route path</p>
          <ul className="RouteView__ul">
            {route.stops.map((item, index) => (
              <li key={index} className="RouteView__li">
                {item.stopName}
              </li>
            ))}
          </ul>
        </div>
        <Map
          className="RouteView__map"
          direction={route.direction}
          stops={route.stops}
        />
      </div>
    )
  );
};

export default RouteView;
