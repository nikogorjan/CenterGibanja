import React, { createContext, useState } from 'react';

export const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </SelectedDataContext.Provider>
  );
};