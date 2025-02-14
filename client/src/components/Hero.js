import React from 'react';
const Hero = ({ hero = 'defaultHero', children }) => {
  return (
    <header className={hero}>
      {children}
    </header>
  );
};

// Use default parameter instead of defaultProps
export default Hero;
