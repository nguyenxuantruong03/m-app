"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  updateImage: string | null;
  email: string | null;
}

export const ZoomImageAttendanceModal: React.FC<ZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  updateImage,
  email,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  // State for image position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [autoZoomingIn, setAutoZoomingIn] = useState(false); // State for auto ZoomIn
  const [autoZoomingOut, setAutoZoomingOut] = useState(false); // State for auto ZoomOut

  // Reference to the image element
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Đè chuột nó sẽ tự động zoomIn hoặc zoomOut
  useEffect(() => {
    let zoomInInterval: NodeJS.Timeout | undefined;
    let zoomOutInterval: NodeJS.Timeout | undefined;

    if (autoZoomingIn) {
      zoomInInterval = setInterval(() => {
        handleZoomIn(); // Auto ZoomIn
      }, 100); // Adjust interval as needed for zoom speed
    }

    if (autoZoomingOut) {
      zoomOutInterval = setInterval(() => {
        handleZoomOut(); // Auto ZoomOut
      }, 100); // Adjust interval as needed for zoom speed
    }

    return () => {
      if (zoomInInterval) clearInterval(zoomInInterval);
      if (zoomOutInterval) clearInterval(zoomOutInterval);
    };
  }, [autoZoomingIn, autoZoomingOut]);

  // Effect for handling image dragging and zooming
  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    // Mouse down event handle for starting image drag
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    // Mouse move event handle for dragging the image
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    // Mouse up event handle for ending image drag
    const handleMouseUp = () => {
      isDragging = false;
    };

    // Wheel event handler for zooming
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    };

    if (image) {
      // Add event listeners
      image.addEventListener("mousedown", handleMouseDown);
      image.addEventListener("mousemove", handleMouseMove);
      image.addEventListener("mouseup", handleMouseUp);
      image.addEventListener("wheel", handleWheel);
    }

    // Remove event listeners on component unmount
    return () => {
      if (image) {
        image.removeEventListener("mousedown", handleMouseDown);
        image.removeEventListener("mousemove", handleMouseMove);
        image.removeEventListener("mouseup", handleMouseUp);
        image.removeEventListener("wheel", handleWheel);
      }
    };
  }, [imageRef, scale]);

  // Zoom in function
  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };

  // Zoom out function
  const handleZoomOut = () => {
    setScale((scale) => Math.max(scale - 0.1, 1));
  };

  const handleMouseDownZoomIn = () => {
    setAutoZoomingIn(true);
  };

  const handleMouseUpZoomIn = () => {
    setAutoZoomingIn(false);
  };

  const handleMouseDownZoomOut = () => {
    setAutoZoomingOut(true);
  };

  const handleMouseUpZoomOut = () => {
    setAutoZoomingOut(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
        title={`Người dùng: ${email}`}
        description={`Ảnh được cập nhật vào ngày-${updateImage}`}
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="4xl"
        textCenter={true}
      >
    <div className="flex items-center justify-center">
        <div className="relative overflow-hidden">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={`404`}
            className="max-w-6xl max-h-screen rounded-md z-50"
            style={{
              width: "40vw",
              height: "auto",
              cursor: "move",
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            }}
            draggable={false}
          />
          <div className="absolute top-0 left-0 m-4 space-x-2">
            <Button
              variant="secondary"
              onClick={handleZoomIn}
              onMouseDown={handleMouseDownZoomIn}
              onMouseUp={handleMouseUpZoomIn}
              onMouseLeave={handleMouseUpZoomIn}
            >
              <ZoomIn />
            </Button>
            <Button
              variant="secondary"
              onClick={handleZoomOut}
              onMouseDown={handleMouseDownZoomOut}
              onMouseUp={handleMouseUpZoomOut}
              onMouseLeave={handleMouseUpZoomOut}
            >
              <ZoomOut />
            </Button>
          </div>
        </div>
        </div>
      </Modal>
  );
};
