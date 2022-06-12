import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(375);


  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowWidth;
}