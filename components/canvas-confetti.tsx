"use client";
// components/Fireworks.js
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface FireworksComponentProps {
  particleCount?: number;
  colors?: string[];
  position?: Position;
  width?: string;
  height?: string;
  left?: string;
  bottom?: string;
  zindex?: number;
  duration?: number;
}

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

const FireworksComponent: React.FC<FireworksComponentProps> = ({
  particleCount = 3, // default particle count
  colors = ["#dc2626", "#facc15", "#22c55e"], // default colors
  position = "absolute", // default position
  width = "5%",
  height = "5%", // default height
  left,
  bottom,
  zindex,
  duration = 3 * 1000
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, { resize: true });

    // Tính thời gian kết thúc dựa trên thời gian và thời lượng hiện tại
    const end = Date.now() + duration;

    (function frame() {
      myConfetti({
        particleCount: particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      myConfetti({
        particleCount: particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [particleCount, colors, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: position,
        width: width,
        height: height,
        left: left,
        bottom: bottom,
        zIndex: zindex,
      }}
    />
  );
};

export default FireworksComponent;
