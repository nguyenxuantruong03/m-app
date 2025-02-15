import SeeWarningSpinModal from "@/components/(client)/modal/see-warning-spin-model7";
import React, { useEffect, useRef, useState } from "react";
interface Segment {
  value: string;
  probability: number;
}

interface WheelProps {
  segments: Segment[];
  segColors: string[];
  winningSegment: string | null;
  onFinished: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  rotation?: number;
}

const getDefaultValues = () => {
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024; // Default to desktop size if `window` is undefined
  if (windowWidth < 768) {
    // Mobile size
    return {
      size: 170,
      centerX: 185,
      centerY: 200,
      canvasWidth: 375,
      canvasHeight: 400,
    };
  } else {
    // Tablet or Desktop size
    return {
      size: 290,
      centerX: 300,
      centerY: 300,
      canvasWidth: 600,
      canvasHeight: 600,
    };
  }
};

const {
  size: defaultSize,
  centerX: defaultCenterX,
  centerY: defaultCenterY,
  canvasWidth: defaultCanvasWidth,
  canvasHeight: defaultCanvasHeight,
} = getDefaultValues();

const WheelComponent: React.FC<WheelProps> = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor,
  contrastColor,
  buttonText,
  isOnlyOnce,
  rotation,
}) => {
  const [openWarningSpin, setOpenWarningSpin] = useState(false);

  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle: NodeJS.Timer | number = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  const [size, setSize] = useState(defaultSize); // Default size for mobile
  const [centerX, setCenterX] = useState(defaultCenterX); // Default centerX for mobile
  const [centerY, setCenterY] = useState(defaultCenterY); // Default centerY for mobile
  const [canvasWidth, setCanvasWidth] = useState(defaultCanvasWidth); // state to manage canvas width
  const [canvasHeight, setCanvasHeight] = useState(defaultCanvasHeight); // state to manage canvas height

  let canvasContext: CanvasRenderingContext2D | null = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * 100;
  const downTime = segments.length * 1000;
  let spinStart = 0;
  let frames = 0;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        // Mobile size
        setSize(170);
        setCenterX(185);
        setCenterY(200);
        setCanvasWidth(375);
        setCanvasHeight(400);
      } else {
        // Tablet or Desktop size
        setSize(290);
        setCenterX(300);
        setCenterY(300);
        setCanvasWidth(600);
        setCanvasHeight(600);
      }
    };

    // Initial size setup
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update canvas when any of the size-related states change
    wheelInit();
  }, [size, centerX, centerY, canvasWidth, canvasHeight]);

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", "1000");
      canvas.setAttribute("height", "600");
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel")?.appendChild(canvas);
    }
    canvas.addEventListener("click", spin);
    canvasContext = canvas.getContext("2d");
  };

  // -------------Xử lý vòng quay nếu như ===0 thì không thể quay được phải sử dụng useRef--------------------
  const rotationRef = useRef(rotation);
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const spin = () => {
    if (rotationRef.current === 0) {
      setOpenWarningSpin(true);
      return;
    }
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay) as NodeJS.Timer;
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext!;
    const segment = segments[key];
    const value = segment.value; // Access the 'value' property

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "20px Nunito";
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext!;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "20px Nunito";
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = " 20px Nunito";
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext!;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fillStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor || "black";
    ctx.font = "20px Nunito";
    currentSegment = segments[i].value;
    isFinished &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const clear = () => {
    const ctx = canvasContext!;
    ctx.clearRect(0, 0, 1000, 500);
  };

  return (
    <>
      <SeeWarningSpinModal
        isOpen={openWarningSpin}
        onClose={() => setOpenWarningSpin(false)}
      />
      <canvas
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
        style={{
          pointerEvents: isFinished && !isOnlyOnce ? "none" : "auto",
        }}
      />
    </>
  );
};

export default WheelComponent;
