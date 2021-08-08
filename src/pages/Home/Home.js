import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RouteList from "../../components/RouteList/RouteList";
import axiosAPI from "../../shared/Axios";

import "./Home.css";

const Home = () => {
  const [routeList, setRouteList] = useState([]);

  const populateRoutesList = async () => {
    const response = await axiosAPI.get("/routes.json");
    const data = response.data;
    setRouteList((prevRouteList) => {
      if (!data) return [];
      const refinedRoutelist = Object.keys(data).map((routeId) => {
        return { ...data[routeId], routeId };
      });
      return refinedRoutelist;
    });
  };

  const onDelete = async (id) => {
    try {
      await axiosAPI.delete("/routes/" + id + ".json/");
      populateRoutesList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    populateRoutesList();
  }, []);

  return (
    <div className="Home">
      <div className="Home__title">Public Transit Route</div>
      <Link to="/create-route" className="Button Button_primary">
        Create new route
      </Link>
      <RouteList routeList={routeList} deleteRouteFunction={onDelete} />
    </div>
  );
};

export default Home;
