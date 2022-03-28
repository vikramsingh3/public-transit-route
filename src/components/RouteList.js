import React from "react";
import { Link } from "react-router-dom";

const RouteList = ({ routeList, deleteRouteFunction }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {routeList.map((route) => {
        const { routeId, routeName, status } = route;
        return (
          <li
            key={routeId}
            className="bg-green-600 p-10 rounded text-white shadow flex flex-col gap-4 hover:scale-110 transition"
          >
            <div className=" text-2xl">{routeName}</div>
            <div>{status}</div>
            <div className="flex gap-2">
              <Link
                to={"/route-view/" + routeId}
                className="px-3 py-2 rounded bg-amber-300 hover:bg-amber-400 text-green-600 font-semibold"
              >
                View
              </Link>
              <Link
                to={"/route-edit/" + routeId}
                className="px-3 py-2 rounded border-2 border-amber-300 hover:border-amber-400 text-amber-300 hover:text-amber-400 font-semibold"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  deleteRouteFunction(routeId);
                }}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
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
