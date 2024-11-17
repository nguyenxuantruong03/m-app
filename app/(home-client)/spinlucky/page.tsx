"use client";
import React, { useEffect, useRef, useState } from "react";
import WheelComponent from "./weel";
import TrPortal from "./portal";
import Confetti from "react-confetti";
import Image from "next/image";
import Container from "@/components/ui/container";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
export const revalidate = 86400;

const IMAGES = {
  image1: "/images/gif-lucky1.gif",
  image2: "/images/gif-lucky.gif",
  image3: "/images/gif-lucky1.gif",
  image4: "/images/gif-lucky.gif",
  image5: "/images/gif-lucky.gif",
  image6: "/images/gif-lucky.gif",
  image7: "/images/gif-lucky.gif",
  image8: "/images/gif-lucky1.gif",
  image9: "/images/gif-lucky1.gif",
  image10: "/images/gif-lucky1.gif",
};

const SpinCoinPage: React.FC = () => {
  const param = useParams();
  const router = useRouter();
  const user = useCurrentUser();
  const [portal, setPortal] = useState<boolean>(false);
  const [show, setShow] = useState<string | false>(false);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  //List-onClick-onBlur click mở blur ra ngoài thì tắt đi
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.role === "GUEST" || !user?.id) {
      router.push("/home-product");
    } else {
      axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
        setTotalCoins(response.data.totalCoins);
        setRotation(response.data.latestRotation);
      });
    }

    document.addEventListener("click", handleDocumentClick);
    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [router, user?.id, user?.role, param.storeId]);

  const handleDocumentClick = (event: MouseEvent) => {
    // Check if the clicked element is outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShow(false); // Close the modal
    }
  };

  const objIndex: Record<string, number> = {
    "6000 xu": 1,
    "7000 xu": 2,
    "4000 xu": 3,
    "8000 xu": 4,
    "9000 xu": 5,
    "10000 xu": 6,
    "12000 xu": 7,
    "5000 xu": 8,
    "3000 xu": 9,
    "2000 xu": 10,
  };

  const segments = [
    { value: "6000 xu", probability: 0.99 }, // 0.005%
    { value: "7000 xu", probability: 0.99 }, // 0.005%
    { value: "4000 xu", probability: 0.99 }, // 99%
    { value: "8000 xu", probability: 0.99 }, // 0.005%
    { value: "9000 xu", probability: 0.99 }, // 0.005%
    { value: "10000 xu", probability: 0.99 }, // 0.005%
    { value: "12000 xu", probability: 0.99 }, // 0.005%
    { value: "5000 xu", probability: 0.99 }, // 1.25%
    { value: "3000 xu", probability: 0.00005 }, // 99%
    { value: "2000 xu", probability: 0.00005 }, // 99%
  ];

  const weelColors = (): string[] => {
    let arr: string[] = [];
    let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    segments.forEach(() => {
      let color = colors.shift() || "";
      arr.push(color);
      colors.push(color);
    });

    return arr;
  };
  const segColors = weelColors();

  const onFinished = async (coin: string) => {
    setPortal(false);
    setShow(coin);
    const coinsWon = parseInt(coin.split(" ")[0]); // Assuming "winner" is in the format "X xu"
    const newTotalCoins = totalCoins + coinsWon;
    const newRotation = rotation - 1;
    try {
      // Send the winner data to the server using POST request
      await axios.post(`/api/${param.storeId}/wheelSpin`, {
        userId: user?.id,
        coin: coinsWon,
        rotation: newRotation,
      });
      setTotalCoins(newTotalCoins);
      const response = await axios.get(`/api/${param.storeId}/wheelSpin`);
      setRotation(newRotation);
      setTotalCoins(response.data.totalCoins);
      setRotation(response.data.latestRotation);
    } catch (error) {
      console.error("Failed to save wheel spin data:", error);
    }
  };
  return (
    <Container>
      <div className="mt-36 relative">
        <div className="px-2 md:px-0">
        <h2
          className="flex items-center justify-center"
          style={{
            background:
              "linear-gradient(to right, #EE4040, #F0CF50, #815CD1, #3DA5E0, #34A24F)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "3rem",
            alignItems: "center"
          }}
        >
          Vòng quay May Mắn{" "}
        </h2>
        <p className="flex items-center justify-center text-gray-400 mt-2">
          Vui chơi trúng thưởng{" "}
        </p>
        <p className="flex items-center justify-center text-gray-400 mt-2">
          Khi mua 1.000.000đ sẽ được tặng 2 vòng quay may mắn{" "}
        </p>
        <p className="flex items-center justify-center text-gray-400 mt-2">
          Khi mua 500.000đ sẽ được tặng 1 vòng quay may mắn{" "}
        </p>
        </div>

        <div className="flex justify-center pt-8 pb-16 bg-cover bg-center bg-no-repeat">
          {show && <Confetti width={1200} height={1019} />}
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment={"8"}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="gray"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={true}
            rotation={rotation}
          />
          {portal ? <TrPortal /> : null}
          {show && (
            <div
              className="box p-4 bg-red-300 shadow-xl overflow-hidden w-80 z-20 absolute mt-10 rounded-md"
              ref={modalRef}
            >
              <div className="text-center">
                <Image
                  src={
                    IMAGES[
                      `image${
                        objIndex[show.split("").join("")]
                      }` as keyof typeof IMAGES
                    ]
                  }
                  alt=""
                  width="300"
                  height="50"
                />
              </div>
              <h2 className="text-2xl text-center">
                Chúc mừng bạn đã có {show}
              </h2>
              <div className="flex justify-center">
                <button
                  className="mt-8 w-48 h-14 cursor-pointer text-xl text-white border-none outline-none bg-blue-500 rounded-2xl"
                  onClick={() => setShow(false)}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Total coin */}
      <div className="relative">
        <div className="hidden md:block md:w-40 lg:w-48 absolute md:bottom-[36rem] lg:bottom-80 bg-black bg-opacity-10 p-2 rounded-md">
          <div className="bg-red-300 rounded-md p-2">
            <div className="text-sm text-center">
              Tổng{" "}
              <span className="text-blue-800  font-semibold">{totalCoins}</span>{" "}
              xu
            </div>
            <div className="text-sm text-center">
              Tổng{" "}
              <span className="text-blue-800 font-semibold">{rotation}</span>{" "}
              lượt quay
            </div>
          </div>

          <div className="bg-amber-300 rounded-md mt-2 p-1">
            <div className="text-sm flex md:ml-8 lg:ml-12  items-center">
              Lưu ý <AlertTriangle className=" ml-1 h-5 w-5" />
            </div>
          </div>

          <p className="font-semibold text-sm text-slate-900 dark:text-slate-200">
            {" "}
            Nếu như xu chưa được cập nhật lại bạn có thể F5 để xu được cập nhật
            lại nhanh nhất.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SpinCoinPage;
