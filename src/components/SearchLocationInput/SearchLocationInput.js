import React, { useState, useEffect, useRef } from "react";
import "./SearchLocationInput.css";

let autoComplete;

const SearchLocationInput = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autoComplete.getPlace();
    const query = "";
    setQuery(query);
    onPlaceSelect(place);
  };

  useEffect(() => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        fields: ["name", "place_id", "geometry"],
        componentRestrictions: { country: "in" },
      }
    );
    autoComplete.addListener("place_changed", () => handlePlaceSelect());
  }, []);

  return (
    <div className="SearchLocationInput">
      <input
        className="SearchLocationInput__inputBox"
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a Location"
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;
