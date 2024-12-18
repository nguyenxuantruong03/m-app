import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ImageModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  data: string;
  width: number;
  height: number;
  alt?: string
}

const ImageModal = ({ setOpen, isOpen, data, width, height, alt }: ImageModalProps) => {
  return (
    <>
      {isOpen && data && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999999]"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
          >
            <Image
              className="rounded-lg"
              src={data}
              alt={alt ? alt : "404"}
              width={width}
              height={height}
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute cursor-pointer top-2 right-2 flex items-center justify-center text-xl rounded-full text-slate-900 w-6 h-6 bg-gray-300 hover:bg-gray-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
