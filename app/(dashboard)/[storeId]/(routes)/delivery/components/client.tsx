"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";
import {
  getDeliveryClient,
  getLocationClientDelivery,
} from "@/translate/translate-dashboard";
import { Button } from "@/components/ui/button";
import { socket } from "@/app/socket";
import { MapPin, MapPinOff } from "lucide-react";
import toast from "react-hot-toast";

interface OrderProps {
  data: OrderColumn[];
}

interface Location {
  lat: number;
  lng: number;
}

const OrderClient: React.FC<OrderProps> = ({ data }) => {
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const deliveryClientMessage = getDeliveryClient(languageToUse);
  const locationClientDeliveryMessage =
    getLocationClientDelivery(languageToUse);
    
//Xử lý chia sẻ vị trí hiện tại giao hạn
  const [isConnected, setIsConnected] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false); // Track if location is being shared
  const [watchId, setWatchId] = useState<number | null>(null); // Store the watch ID to stop geolocation when needed

  useEffect(() => {
    if (user?.id) {
      socket.emit("set-user-id", user.id);
      socket.emit("check-share-status", { userId: user.id });
    }

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("update-location", (location: Location | null) => {
      setLastLocation(location);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update-location");
    };
  }, [user]);

  const shareLocation = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const location: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          socket.emit("share-location", { location, userId: user?.id });
          setLastLocation(location);
        },
        (error) => {
          toast.error(locationClientDeliveryMessage.error);
        },
        { enableHighAccuracy: true }
      );
      setWatchId(id);
      setIsSharingLocation(true);
    } else {
      toast.error(locationClientDeliveryMessage.geolocation);
    }
  };

  const stopSharingLocation = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId); // Stop the geolocation watch
      setWatchId(null);
      setIsSharingLocation(false); // Mark location sharing as inactive
      socket.emit("stop-sharing-location", { userId: user?.id }); // Notify server that location sharing stopped
    }
  };

  const isUserAllowedToShare =
    user?.role === "SHIPPER" || user?.role === "ADMIN";

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${deliveryClientMessage.delivery} (${data.length})`}
          description={deliveryClientMessage.manageDelivery}
        />
        <div className="flex space-x-3">
          <Downloadfile
            data={data}
            filename="orders"
            languageToUse={languageToUse}
          />

          {isSharingLocation ? (
            <Button onClick={stopSharingLocation} disabled={!isConnected}>
              <span className="flex space-x-2">
                <MapPinOff className="w-5 h-5" />
                {locationClientDeliveryMessage.stopShare}
              </span>
            </Button>
          ) : (
            <Button onClick={() => shareLocation()} disabled={!isUserAllowedToShare || !isConnected}>
              <span className="flex space-x-2">
                <MapPin className="w-5 h-5" />
                {locationClientDeliveryMessage.share}
              </span>
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <DataTable
        languageToUse={languageToUse}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        open={false}
        setOpen={() => false}
      />
    </>
  );
};

export default OrderClient;
