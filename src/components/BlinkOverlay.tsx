'use client'

import React, { useState, useEffect } from "react";

const BlinkOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 54, y: 26 });

  const handleClick = () => {
    setBlinking(true);
    setVisible(true);
    
    setTimeout(() => setBlinking(false), 200);
    setTimeout(() => setVisible(false), 1000);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const eyeCenterX = 50;
    const eyeCenterY = 30;
    const reflectionRadius = 4;
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const deltaX = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2);
    const deltaY = (mouseY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    const angle = Math.atan2(deltaY, deltaX);
    const reflectionX = eyeCenterX + Math.cos(angle) * reflectionRadius;
    const reflectionY = eyeCenterY + Math.sin(angle) * reflectionRadius;
    
    setMousePosition({
      x: reflectionX,
      y: reflectionY
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const eyeTransition = {
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <>
      <svg
        width={200}
        height={120}
        viewBox="0 0 100 60"
        className="z-10"
      >        
        <path
          d={blinking 
            ? "M 5 30 Q 50 30 95 30 Q 50 30 5 30 Z"
            : "M 5 30 Q 50 2 95 30 Q 50 58 5 30 Z"
          }
          fill="#fff"
          stroke="#000"
          strokeWidth={2}
          style={eyeTransition}
        />
        
        <ellipse 
          cx={50} 
          cy={30} 
          rx={12} 
          ry={blinking ? 0 : 12}
          fill="#fff" 
          stroke="#000" 
          strokeWidth="1"
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 1
          }}
        />
        
        <ellipse 
          cx={50} 
          cy={30} 
          rx={5.5} 
          ry={blinking ? 0 : 5.5}
          fill="#000" 
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 1
          }}
        />
        
        <ellipse 
          cx={mousePosition.x} 
          cy={mousePosition.y} 
          rx={2} 
          ry={blinking ? 0 : 2}
          fill="#fff" 
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 0.9
          }}
        />
      </svg>

      {/* Fullscreen black overlay with maximum z-index */}
      <div
        className={`fixed inset-0 bg-black pointer-events-none transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          zIndex: 2147483647,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000'
        }}
      />
    </>
  );
};

export default BlinkOverlay;