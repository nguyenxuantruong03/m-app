"use client"
import React, { useEffect, useState } from "react";

interface HeadingDescriptionProps {
  heading?: string;
  description?: string;
  fontSizeheading?: string;
  fontSizedescription?: string;
  color?: string;
  textalign?: string;
  fontweightdes?: string | number;
  colordes?: string;
  fontweighthed?: string;
  marginhed?: string;
}

const HeadingDescription: React.FC<HeadingDescriptionProps> = ({
  fontweightdes,
  textalign,
  fontSizeheading,
  heading,
  description,
  color,
  fontSizedescription,
  colordes,
  fontweighthed,
  marginhed,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check if window is available (browser-side)
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Update screen size check
    };

    // Set initial screen size check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const headingStyle: React.CSSProperties = {
    textAlign: (textalign as React.CSSProperties["textAlign"]) || "center",
    fontSize: isSmallScreen ? "25px" : fontSizeheading || "36px", // Smaller font size for mobile
    marginBlockStart: "0em",
    marginBlockEnd: "0em",
    color: color || "#333",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: fontweighthed || 900,
    margin: isSmallScreen ? "20px 0 3px 0" : marginhed || "0px",
  };
  const descriptionStyle: React.CSSProperties = {
    textAlign: (textalign as React.CSSProperties["textAlign"]) || "center",
    fontSize: isSmallScreen ? "30px" : fontSizedescription || "15px", // Smaller font size for mobile
    fontFamily: "'Poppins', sans-serif",
    fontWeight: fontweightdes || 600,
    color: colordes || "#b1b4b9",
  };

  return (
    <div className="head-desc">
      <h2 className="heading" style={headingStyle}>
        {heading}
      </h2>
      <div className="description" style={descriptionStyle}>
        {description}
      </div>
    </div>
  );
};

export default HeadingDescription;
