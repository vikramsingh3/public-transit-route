import React from "react";
import { Link } from "react-router-dom";
import "./RouteList.css";

const RouteList = ({ routeList, deleteRouteFunction }) => {
  return (
    <ul className="RouteList">
      {routeList.map((route) => {
        const { routeId, routeName, status } = route;
        return (
          <li key={routeId} className="RouteList__item">
            <span className="RouteList__name">{routeName}</span>
            <span className="RouteList__status">{status}</span>
            <div className="RouteList__buttons">
              <Link
                to={"/route-view/" + routeId}
                className="Button Button_primary"
              >
                View
              </Link>
              <Link
                to={"/route-edit/" + routeId}
                className="Button Button_secondary"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  deleteRouteFunction(routeId);
                }}
                className="Button Button_danger"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RouteList;
