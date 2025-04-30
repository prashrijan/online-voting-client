import React, { Children, createContext, useContext, useState } from 'react';

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  const [electionData, setElectionData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    visibility: 'public',
    coverImageFile: null,
    coverImagePreview: null,
  });

  const updateElectionData = (key, value) => {
    setElectionData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ElectionContext.Provider value={{ electionData, updateElectionData }}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => useContext(ElectionContext);
