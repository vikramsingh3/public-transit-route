import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoute from "./pages/CreateRoute";
import RouteEdit from "./pages/RouteEdit";
import RouteView from "./pages/RouteView";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const loadScript = (url, callback) => {
  if (!window.google) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = () => callback();
  } else {
    callback();
  }
};

function App() {
  const [mapsAPI, setMapsAPI] = useState(false);
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => {
        setMapsAPI(true);
      }
    );
  }, []);

  return (
    <div className="bg-green-400 min-h-screen font-mono">
      <BrowserRouter>
        <Header />
        <div className="container mx-auto">
          <div className="px-10 py-10 md:py-20">
            {mapsAPI && (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create-route" component={CreateRoute} />
                <Route path="/route-view/:id" component={RouteView} />
                <Route path="/route-edit/:id" component={RouteEdit}></Route>
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
