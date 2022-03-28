import React, { useEffect, useState } from "react";
import RouteList from "../components/RouteList";
import axiosAPI from "../shared/Axios";

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

  return <RouteList routeList={routeList} deleteRouteFunction={onDelete} />;
};

export default Home;
