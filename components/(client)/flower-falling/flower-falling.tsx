"use client";
import "./flower-falling.css";
import React, { useEffect, useState } from "react";
import gsap, { Sine, Linear } from "gsap";

const FlowerFalling: React.FC = () => {
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const total = 10; // Increase for denser snow effect
    const warp = document.getElementById("container");

    const animm = (elm: HTMLElement) => {
      gsap.to(elm, {
        duration: R(4, 10),
        y: screenHeight + 100,
        ease: Linear.easeNone,
        repeat: -1,
        delay: R(-10, 0),
      });
      gsap.to(elm, {
        duration: R(4, 8),
        x: "+=100",
        rotationZ: R(0, 180),
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut,
      });
      gsap.to(elm, {
        duration: R(2, 8),
        rotationX: R(0, 360),
        rotationY: R(0, 360),
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut,
        delay: R(-5, 0),
      });
    };

    const createDot = () => {
      const Div = document.createElement("div");
      gsap.set(Div, {
        attr: { class: "dot" },
        x: R(0, screenWidth),
        y: R(-200, -150),
        z: R(-200, 200),
      });
      Div.style.background = "url(/images/flower_snow.webp)";
      Div.style.backgroundSize = "100% 100%";
      warp?.appendChild(Div);
      animm(Div);
    };

    for (let i = 0; i < total; i++) {
      createDot();
    }

    function R(min: number, max: number) {
      return min + Math.random() * (max - min);
    }
  }, [screenHeight, screenWidth]);

  return <div id="container"></div>;
};

export default FlowerFalling;
