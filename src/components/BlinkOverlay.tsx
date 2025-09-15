'use client'

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for page navigation

interface BlinkOverlayProps {
  targetPath?: string; // optional path to navigate to on click
}

const BlinkOverlay: React.FC<BlinkOverlayProps> = ({ targetPath }) => {
  const [visible, setVisible] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 54, y: 26 });
  const navigate = useNavigate();

  const handleClick = (event: Event) => {
    // Check if a navbar link was clicked
    const clickedElement = event.target as HTMLElement;
    const linkElement = clickedElement.closest('a');
    
    // Only proceed if it's a navbar link
    if (!linkElement || !linkElement.getAttribute('href')) {
      return;
    }
    
    const navigationPath = linkElement.getAttribute('href')!;
    
    // Prevent React Router navigation
    event.preventDefault();
    event.stopPropagation();

    setBlinking(true);
    setVisible(true);

    // Hide navbar
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.opacity = '0';
      navbar.style.transition = 'opacity 0.2s ease-in-out';
    }

    // Blink animation
    setTimeout(() => setBlinking(false), 200);

    // After fully black, navigate
    setTimeout(() => {
      navigate(navigationPath);
      setVisible(false); // fade overlay out
      
      // Show navbar again
      if (navbar) {
        navbar.style.opacity = '1';
      }
    }, 500); // match CSS transition duration
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
    // Use capture phase to intercept navbar clicks before React Router
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const eyeTransition = {
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <>
      {/* SVG eye - now fades out when overlay becomes visible */}
      <svg
        width={200}
        height={120}
        viewBox="0 0 100 60"
        className={`z-10 transition-opacity duration-200 ${visible ? 'opacity-0' : 'opacity-100'}`}
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

      {/* Fullscreen black overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 2147483647 }}
      />
    </>
  );
};

export default BlinkOverlay;