"use client";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import "./style.css";
import { Button } from "@/components/ui/button";
import {
  SwitchCamera,
  CameraIcon,
  Trash2,
  SendHorizontal,
  ArrowLeftToLine,
  TriangleAlert,
  X,
  Check,
} from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { QrReader } from "react-qr-reader"; // Thư viện quét mã QR
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { translateCamera } from "@/translate/translate-dashboard";

interface QRResult {
  text: string;
  rawBytes: any;
  numBits: number;
  resultPoints: any[];
  format: string;
  timestamp: number;
  resultMetadata: any;
}

interface EventProps {
  id: string;
  isCheckAttendanceImage: boolean;
  isCheckNFC: boolean;
}

interface CameraPorps {
  onClose: () => void;
  loading: boolean;
  dataEventCamera: string | undefined;
  setShowCameraModal: Dispatch<SetStateAction<boolean>>;
  languageToUse: string
}
const Camera: React.FC<CameraPorps> = ({
  onClose,
  loading,
  dataEventCamera,
  setShowCameraModal,
  languageToUse
}) => {
  const userId = useCurrentUser();
  const params = useParams();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingfetch, setLoadingfetch] = useState(true);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // Default to back camera
  const [qrResult, setQrResult] = useState<QRResult | null>(null);
  const [showVideo, setShowVideo] = useState(true);
  const [data, setALldata] = useState<EventProps[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageNFC, setShowMessageNFC] = useState<boolean | null>(null);
  const [qrCodeValid, setQrCodeValid] = useState<boolean | null>(null);

  //language
  const cameraMessage = translateCamera(languageToUse)

  const getVideo = () => {
    // Kiểm tra xem truy cập vào camera đã được phép hay không
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Yêu cầu truy cập vào camera với constraints mong muốn
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 1280,
            height: 720,
            facingMode: facingMode, // Chọn camera trước hoặc sau
          },
        })
        .then((stream) => {
          let video = videoRef.current as HTMLVideoElement | null;
          if (video) {
            // Thiết lập thuộc tính của video element
            video.srcObject = stream;
            video.autoplay = true; // Auto play video
            video.muted = true; // Tắt tiếng để tránh tiếng vang
            video.playsInline = true; // Chơi video trong khung của trang
            video.play();
          } else {
            toast.error(cameraMessage.cameraNotFound);
          }
        })
        .catch((err) => {
          toast.error(cameraMessage.somethingWentWrong);
        });
    } else {
      toast.error(cameraMessage.browserNotSupported);
    }
  };

  const filteredData = data && data.filter((item) => item.id === dataEventCamera);
  const isCheckAttendanceImages = filteredData.map((item) => item.isCheckAttendanceImage);
  const isCheckAttendanceNFC = filteredData.map((item) => item.isCheckNFC);

  const takePhoto = () => {
    // Ẩn video
    setShowVideo(false);
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current as HTMLCanvasElement | null;

    if (photo) {
      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext("2d");

      if (ctx) {
        if (video) {
          ctx.drawImage(video, 0, 0, width, height);
          setHasPhoto(true);

          // Chuyển đổi ảnh thành dataURL và truyền vào máy quét mã QR
          const dataURL = photo.toDataURL("image/jpeg", 0.8);
          handleScan(dataURL);
        } else {
          toast.error(cameraMessage.browserNotSupported);
        }
      } else {
        toast.error(cameraMessage.cannotLoadImage2D);
      }
    } else {
      toast.error(cameraMessage.imageNotFound);
    }
  };

  const closePhoto = () => {
    setShowVideo(true); // Đảm bảo hiển thị video khi đóng ảnh
    let photo = photoRef.current as HTMLCanvasElement | null;
    if (photo) {
      let ctx = photo.getContext("2d");

      ctx?.clearRect(0, 0, photo.width, photo.height);
    }

    setHasPhoto(false);
    getVideo();
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user"); // Toggle between front and back camera
    setHasPhoto(false); // Reset photo state when switching cameras
  };

  const handleScan = (data: any) => {
    if (data) {
      setQrResult(data); // Lưu kết quả của quét mã QR
    }
  };

  const updatePhoto = async () => {
    let photo = photoRef.current as HTMLCanvasElement | null;
    if (photo) {
      const dataURL = photo.toDataURL("image/jpeg", 0.8);
      if (qrResult?.text === userId?.urlimageCheckAttendance) {
        if (isCheckAttendanceImages[0] === false) {
          setIsLoadingData(true);
          await axios
            .post(`/api/${params.storeId}/checkattendance`, {
              photo: dataURL,
              qrResult: qrResult?.text || "",
              datacamera: dataEventCamera,
            })
            .then((response) => {
              setShowVideo(false);
              setShowCameraModal(false);
              setIsLoadingData(false);
              toast.success(cameraMessage.imageUploadedSuccess);
            })
            .catch((error) => {
              setIsLoadingData(false);
              toast.error(cameraMessage.somethingWentWrong);
            });
        } else {
          toast.error(cameraMessage.alreadyCheckedInToday);
        }
      } else {
        toast.error(cameraMessage.invalidQrCode);
      }
    } else {
      toast.error(cameraMessage.imageNotFound);
    }
  };

  useEffect(() => {
    getVideo();
  }, [facingMode]);

  //Show message khi đã chụp ảnh rồi
  useEffect(() => {
    setShowMessage(isCheckAttendanceImages[0]);
  }, [isCheckAttendanceImages]);

  useEffect(() => {
    setShowMessageNFC(isCheckAttendanceNFC[0]);
  }, [isCheckAttendanceNFC]);

  //Check nếu như qr code đúng thì Check sai thì X
  useEffect(() => {
    if (qrResult?.text === userId?.urlimageCheckAttendance) {
      // QR code matches user's image check attendance
      setQrCodeValid(true);
    } else {
      // QR code doesn't match user's image check attendance
      setQrCodeValid(false);
    }
  }, [qrResult]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/checkattendance`
        );
        // Update state with the received events
        setALldata(response.data);
        setLoadingfetch(false);
      } catch (error: unknown) {
        setLoadingfetch(false);
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response
            .data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        } else {
          // Hiển thị thông báo lỗi mặc định cho người dùng
          toast.error(cameraMessage.somethingWentWrong);
        }
      }
    };
    fetchData(); // Call the asynchronous function
  }, [params.storeId]);

  return (
    <div className="  relative">
      {showVideo && (
        <div className="relative">
          <video
            className="w-full mx-auto"
            ref={videoRef}
          ></video>
          <Button
            className="absolute bottom-2 left-8 xl:left-5 z-20"
            variant="outline"
            onClick={() => {
              if (isCheckAttendanceImages[0] === false) {
                takePhoto();
              } else if (loadingfetch) {
                // Nếu đang tải dữ liệu, không thực hiện gì khi click
                toast.loading(cameraMessage.loadingData);
              } else {
                toast.error(cameraMessage.alreadyCheckedInToday);
              }
            }}
            disabled={loadingfetch}
          >
            <CameraIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={switchCamera}
            disabled={loadingfetch || isLoadingData}
            className="absolute bottom-2 left-32 xl:left-28 z-20"
          >
            <SwitchCamera className="w-5 h-5" />
          </Button>
          <Button
            className="absolute bottom-2 left-56 xl:left-52 z-20"
            disabled={loading || isLoadingData}
            variant="outline"
            onClick={onClose}
          >
            <ArrowLeftToLine className="w-5 h-5" />
          </Button>
          {showMessage && (
            // Sử dụng showMessage để kiểm soát việc hiển thị thông báo
            <p className=" absolute top-2 left-1/2  transform -translate-x-1/2 border-yellow-400 border-2 flex items-center p-3">
              <TriangleAlert className="w-4 h-4 text-yellow-400 mr-3" /> {cameraMessage.alreadyCheckedIn}
            </p>
          )}
          {showMessageNFC && (
            // Sử dụng showMessage để kiểm soát việc hiển thị thông báo
            <p className=" absolute top-2 left-1/2  transform -translate-x-1/2 border-yellow-400 border-2 flex items-center p-3">
              <TriangleAlert className="w-4 h-4 text-yellow-400 mr-3" /> {cameraMessage.checkedInByNfc}
            </p>
          )}
        </div>
      )}
      <div className="result">
        <canvas
          className={`${
            hasPhoto ? "w-full mx-auto" : "hidden"
          }`}
          ref={photoRef}
          ></canvas>
          {hasPhoto && (
          <>
            <Button
              className="absolute bottom-2 left-8 xl:left-5 z-20"
              onClick={updatePhoto}
              variant="outline"
              disabled={loadingfetch || isLoadingData}
            >
              <SendHorizontal className="w-5 h-5" />
            </Button>
            <Button
              className="absolute bottom-2 left-32 xl:left-28 z-20"
              onClick={closePhoto}
              variant="outline"
              disabled={loadingfetch || isLoadingData}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
            <Button
              className="absolute bottom-2 left-56 xl:left-52 z-20"
              disabled={loading || loadingfetch || isLoadingData}
              variant="outline"
              onClick={onClose}
            >
              <ArrowLeftToLine className="w-5 h-5" />
            </Button>
            {qrCodeValid !== null && (
              <p
                className={`absolute top-4 xl:top-auto xl:bottom-2 left-1/2 transform -translate-x-1/2 z-10 border-${
                  qrCodeValid ? "green" : "red"
                }-500 border-2 p-3 flex items-center`}
              >
                {qrCodeValid ? (
                  <>
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    {cameraMessage.qrCodeCorrect}
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-red-500 mr-3" />
                    {cameraMessage.qrCodeIncorrect}
                  </>
                )}
              </p>
            )}
            <div className="qr-scanner hidden">
              <QrReader
                scanDelay={300}
                onResult={handleScan}
                constraints={{ facingMode: facingMode }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Camera;
