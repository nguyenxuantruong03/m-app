"use client"
import React, { useState, useEffect } from 'react';
import './backtotop.scss'
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = window.scrollY; // Use window.scrollY to get the scroll position
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []); // Add an empty array as the second argument to run this effect only once

  return (
    <div className='fixed right-4 bottom-[72px] md:bottom-[40px] font-2xl z-[99999] cursor-pointer'>
      <div 
      className="scroll"
      onClick={scrollToTop}
      style={{ display: visible ? 'block' : 'none' }}
      ></div>
     
    </div>
  );
};

export default ScrollButton;
