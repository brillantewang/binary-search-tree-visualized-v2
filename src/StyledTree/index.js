import React, { useState, useEffect } from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { breakpoints } from '../breakpoints';

const StyledTree = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return width < breakpoints.tablet ? <Mobile /> : <Desktop />;
}

export default StyledTree;
