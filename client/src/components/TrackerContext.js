import React, { useEffect, useState } from "react";

export const TrackerContext = React.createContext(null);

export const TrackerProvider = ({ children }) => {
  const [trackerItems, setTrackerItems] = useState([]);
  const handleTrackItem = (item) => {
    setTrackerItems([...trackerItems, item]);
  };

  return (
    <TrackerContext.Provider
      value={{
        trackerItems,
        setTrackerItems,
        handleTrackItem,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
