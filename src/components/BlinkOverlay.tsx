import React, { useState, useEffect } from "react";

const BlinkOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 54, y: 26 });

  const handleClick = () => {
    // Start blink animation
    setBlinking(true);
    // Show overlay
    setVisible(true);
    
    // Stop blink after 200ms
    setTimeout(() => setBlinking(false), 200);
    // Hide overlay after 1000ms (1 second)
    setTimeout(() => setVisible(false), 1000);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const eyeCenterX = 50;
    const eyeCenterY = 30;
    const reflectionRadius = 4; // Distance from pupil center to edge
    
    // Get mouse position relative to the viewport
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Calculate direction from center of screen to mouse
    const deltaX = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2);
    const deltaY = (mouseY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    // Normalize and position the reflection around the edge of the pupil
    const angle = Math.atan2(deltaY, deltaX);
    const reflectionX = eyeCenterX + Math.cos(angle) * reflectionRadius;
    const reflectionY = eyeCenterY + Math.sin(angle) * reflectionRadius;
    
    setMousePosition({
      x: reflectionX,
      y: reflectionY
    });
  };

  useEffect(() => {
    // Add click event listener to the entire document
    document.addEventListener('click', handleClick);
    // Add mouse move listener for eye tracking
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Shared transition style for all eye elements
  const eyeTransition = {
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <>
      {/* Eye component with mouse tracking and blinking */}
      <svg
        width={200}
        height={120}
        viewBox="0 0 100 60"
        className="z-10"
      >        
        {/* Eye shape - condenses during blink */}
        <path
          d={blinking 
            ? "M 5 30 Q 50 30 95 30 Q 50 30 5 30 Z"  // Fully closed - straight line
            : "M 5 30 Q 50 2 95 30 Q 50 58 5 30 Z"   // Normal open eye
          }
          fill="#fff"
          stroke="#000"
          strokeWidth={2}
          style={eyeTransition}
        />
        
        {/* Iris - condenses vertically and fades during blink */}
        <ellipse 
          cx={50} 
          cy={30} 
          rx={12} 
          ry={blinking ? 0 : 12}  // Fully condense during blink
          fill="#fff" 
          stroke="#000" 
          strokeWidth="1"
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 1
          }}
        />
        
        {/* Pupil - condenses vertically and fades during blink */}
        <ellipse 
          cx={50} 
          cy={30} 
          rx={5.5} 
          ry={blinking ? 0 : 5.5}  // Fully condense during blink
          fill="#000" 
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 1
          }}
        />
        
        {/* Light reflection - moves around edge of pupil, condenses and fades during blink */}
        <ellipse 
          cx={mousePosition.x} 
          cy={mousePosition.y} 
          rx={2} 
          ry={blinking ? 0 : 2}  // Fully condense during blink
          fill="#fff" 
          style={{
            ...eyeTransition,
            opacity: blinking ? 0 : 0.9
          }}
        />
      </svg>

      {/* Fullscreen black overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 pointer-events-none z-50 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

export default BlinkOverlay;