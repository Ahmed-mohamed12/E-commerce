import React, { createContext, useState, useEffect } from 'react';

const ScreenSizeContext = createContext();

const ScreenSizeProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const screenSize = {
    screenWidth,
    screenHeight
  };

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export { ScreenSizeContext, ScreenSizeProvider };