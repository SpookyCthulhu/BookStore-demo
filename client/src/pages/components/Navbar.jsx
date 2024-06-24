import React, { useState } from 'react';

const Navbar = () => {

  return (
    <div className="Navbar">
      <img src='images/chiStudios.png' className='Navlogo' id='Navtitle' alt="Chi Studios Logo" />
      <div className='Navbuttons'>
        <button className='navBtn navCheckout'>(0)<i className="fas fa-shopping-cart"></i></button>
        <button className='navBtn profileBtn'><i className="fas fa-user"></i></button>
      </div>
    </div>
  );
};

export default Navbar;