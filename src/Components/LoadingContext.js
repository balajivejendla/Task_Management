import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('default');

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingType, setLoadingType }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);