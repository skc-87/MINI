import React, { useState } from 'react';
import { Button } from '@mui/material';

const AirplaneSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%" // Width set to cover the button
    height="100%" // Height set to maintain aspect ratio
    viewBox="0 0 512 512"
    style={{ fill: 'currentColor' }} // Use current color for styling
  >
    <path d="M186.62 464H160a16 16 0 0 1-14.57-22.6l64.46-142.25L113.1 297l-35.3 42.77C71.07 348.23 65.7 352 52 352H34.08a17.66 17.66 0 0 1-14.7-7.06c-2.38-3.21-4.72-8.65-2.44-16.41l19.82-71c.15-.53.33-1.06.53-1.58a.4.4 0 0 0 0-.15a15 15 0 0 1-.53-1.59l-19.84-71.45c-2.15-7.61.2-12.93 2.56-16.06a16.83 16.83 0 0 1 13.6-6.7H52c10.23 0 20.16 4.59 26 12l34.57 42.05l97.32-1.44l-64.44-142A16 16 0 0 1 160 48h26.91a25 25 0 0 1 19.35 9.8l125.05 152l57.77-1.52c4.23-.23 15.95-.31 18.66-.31C463 208 496 225.94 496 256c0 9.46-3.78 27-29.07 38.16c-14.93 6.6-34.85 9.94-59.21 9.94c-2.68 0-14.37-.08-18.66-.31l-57.76-1.54l-125.36 152a25 25 0 0 1-19.32 9.75" />
  </svg>
);

const HomeSearch = () => {
  const [animating, setAnimating] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    setCurtainOpen(true);
    // Stop the animation after 2.5 seconds (adjust the time as needed)
    setTimeout(() => {
      setAnimating(false);
      setCurtainOpen(false);
    }, 2500); // Adjust duration to match the animations
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClick}
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '10px 20px',
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
          },
          overflow: 'hidden', // Hide overflow to show curtain effect
          position: 'relative', // Set position to relative for inner elements
        }}
      >
        Search Destination

        {/* Curtain effect */}
        {curtainOpen && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#15C079FF',
              zIndex: 1,
              animation: 'curtain 3.3s forwards', // Duration changed to 2.5s
              transformOrigin: 'left', // Ensure it opens from the left
            }}
          />
        )}

        {/* Airplane SVG */}
        {animating && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '-100%', // Start off-screen to the left
              transform: 'translateY(-50%)',
              animation: 'fly 2.5s linear forwards', // Duration changed to 2.5s
              width: '100%', // Ensure it takes the full width of the button
              height: '100%', // Ensure it takes the full height of the button
              zIndex: 2, // Ensure it is above the curtain
            }}
          >
            <AirplaneSVG />
          </span>
        )}
      </Button>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fly {
          0% {
            left: -100%; // Start from left off-screen
          }
          50% {
            left: calc(100% - 40px); // Move to a point just before the button exit
          }
          100% {
            left: 100%; // End at right off-screen
          }
        }

        @keyframes curtain {
          0% {
            transform: scaleX(0);  /* Start with scaleX(0) */
          }
          50% {
            transform: scaleX(1);  /* Fully open by halfway */
          }
          100% {
            transform: scaleX(1);  /* Stay open */
          }
        }
      `}</style>
    </div>  
  );
};

export default HomeSearch;
