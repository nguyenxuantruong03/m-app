"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useCurrentUser } from "@/hooks/use-current-user";
import toast from "react-hot-toast";
import { socket } from "@/app/socket";
import { useTranslations } from "next-intl";

interface Location {
  lat: number;
  lng: number;
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface LocationproductProps {
  userShipperId: string;
  locationLat: number | undefined;
  locationLng: number | undefined;
}

const LocationProduct = ({userShipperId,locationLat,locationLng}:LocationproductProps) => {
  const t= useTranslations("map")
  const user = useCurrentUser();
  const [userALocation, setUserALocation] = useState<Location | null>(null);
  const [myLocation, setMyLocation] = useState<Location | null>(null);
  const [map, setMap] = useState<any>(null);
  const [routingControl, setRoutingControl] =
    useState<L.Routing.Control | null>(null);
  const [marker, setMarker] = useState<any>(null); // State lưu trữ marker

  //language
  const languageToUse = user?.language || "vi";

  useEffect(() => {
    const mapInstance = L.map("map").setView(
      userALocation
        ? [userALocation.lat, userALocation.lng] // Ưu tiên userALocation
        : locationLat !== undefined && locationLng !== undefined
        ? [locationLat, locationLng] // Nếu có user.locationLat và user.locationLng
        : [10.77621, 106.60444], // Fallback về tọa độ mặc định
      16
    );
    setMap(mapInstance);

    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 18,
    }).addTo(mapInstance);

    if (languageToUse === "vi") {
          L.Routing.Localization["vi"] = {
            directions: {
              north: t("directions.north"),
              northeast: t("directions.northeast"),
              east: t("directions.east"),
              southeast: t("directions.southeast"),
              south: t("directions.south"),
              southwest: t("directions.southwest"),
              west: t("directions.west"),
              northwest: t("directions.northwest"),
            },
            instructions: {
              straight: t("instructions.straight"),
              slightLeft: t("instructions.slightLeft"),
              left: t("instructions.left"),
              sharpLeft: t("instructions.sharpLeft"),
              slightRight: t("instructions.slightRight"),
              right: t("instructions.right"),
              sharpRight: t("instructions.sharpRight"),
              uturn: t("instructions.uturn"),
            },
            maneuvers: {
              merge: t("maneuvers.merge"),
              depart: t("maneuvers.depart"),
              arrive: t("maneuvers.arrive"),
              fork: t("maneuvers.fork"),
              endOfRoad: t("maneuvers.endOfRoad"),
              passRoundabout: t("maneuvers.passRoundabout"),
              accessRoundabout: t("maneuvers.accessRoundabout"),
              stayOnRoundabout: t("maneuvers.stayOnRoundabout"),
              startAtEndOfStreet: t("maneuvers.startAtEndOfStreet"),
              start: t("maneuvers.start"),
              turn: t("maneuvers.turn"),
              turnLeft: t("maneuvers.turnLeft"),
              turnRight: t("maneuvers.turnRight"),
              multiple: t("maneuvers.multiple"),
            },
            errors: {
              locationNotFound: t("errors.locationNotFound"),
              cantProjectRouteOnSatellite: t("errors.cantProjectRouteOnSatellite"),
              routeNotFound: t("errors.routeNotFound"),
              cantFindRoute: t("errors.cantFindRoute"),
              requestFailed: t("errors.requestFailed"),
              tooManyStops: t("errors.tooManyStops"),
              unableToSync: t("errors.unableToSync"),
            },
            other: {
              useRouteAnyway: t("other.useRouteAnyway"),
              isCurrently: t("other.isCurrently"),
              poweredBy: t("other.poweredBy"),
            },
          };
        } else {
          delete L.Routing.Localization["vi"]; // Remove any custom localization for non-Vietnamese languages
        }

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };

        setMyLocation(currentLocation);

        const myMarker = L.marker([latitude, longitude]).addTo(map);
        myMarker.bindPopup(t("form.you")).openPopup();
      },
      (error) => {
        toast.error(t("form.message"));
      }
    );
  }, [map]);

  useEffect(() => {
    const handleLocationUpdate = (locationData: {
      location: Location | null;
      userId: string;
    }) => {
      const { location, userId } = locationData;

      if (!map) return;

      if (userId === userShipperId) {
        // Thay "specificUserId" bằng giá trị userId bạn muốn kiểm tra
        if (location) {
          setUserALocation(location);

          if (marker) {
            marker.setLatLng([location.lat, location.lng]); // Cập nhật vị trí marker
            marker.setPopupContent(t("form.shipperComing")); // Cập nhật nội dung popup (nếu cần)
            marker.openPopup(); // Mở popup nếu cần
          } else {
            const newMarker = L.marker([location.lat, location.lng]).addTo(map);
            newMarker
              .bindPopup(t("form.shipperComing"))
              .openPopup();
            setMarker(newMarker);
          }

          if (myLocation) {
            if (routingControl) {
              map.removeControl(routingControl);
            }
            const control = L.Routing.control({
              waypoints: [
                L.latLng(myLocation.lat, myLocation.lng),
                L.latLng(location.lat, location.lng),
              ],
              routeWhileDragging: true,
              createMarker: () => null,
              language: languageToUse,
            }).addTo(map);
            setRoutingControl(control);
          }
        }
      } else {
        // Nếu không đúng userId, set về vị trí mặc định
        map.setView([10.77621, 106.60444], 16); // Ví dụ vị trí Hồ Chí Minh
        if (marker) {
          marker.remove();
          setMarker(null);
        }
      }
    };

    socket.on("update-location", handleLocationUpdate);

    return () => {
      socket.off("update-location", handleLocationUpdate);
    };
  }, [
    map,
    myLocation,
    routingControl,
    marker,
    userShipperId,
    userALocation,
    languageToUse,
  ]); // Chú ý thêm vào dependencies

  useEffect(() => {
    if (!map || !myLocation || !userShipperId || userALocation) return;

    // Xác định điểm đến: Nếu không có userALocation, sử dụng user.locationLat và user.locationLng
    const destination =
      !userALocation &&
      locationLat !== undefined &&
      locationLng !== undefined
        ? { lat: locationLat, lng: locationLng }
        : userALocation;

    // Cập nhật marker và routing nếu có điểm đến
    if (destination) {
      // Xóa marker hiện tại nếu có
      if (marker) {
        marker.remove();
      }

      // Tạo marker cho shipper (destination)
      const shipperMarker = L.marker([destination.lat, destination.lng]).addTo(
        map
      );
      shipperMarker.bindPopup(t("form.shipper")).openPopup();
      setMarker(shipperMarker); // Lưu shipperMarker vào state

      // Cập nhật routing control
      if (routingControl) {
        map.removeControl(routingControl); // Xóa control cũ trước khi thêm control mới
      }

      // Cập nhật routing từ bạn (myLocation) đến shipper (destination)
      const control = L.Routing.control({
        waypoints: [
          L.latLng(myLocation.lat, myLocation.lng), // Điểm xuất phát
          L.latLng(destination.lat, destination.lng), // Điểm đến
        ],
        routeWhileDragging: true,
        createMarker: () => null, // Không tạo marker mặc định
        language: languageToUse, // Sử dụng ngôn ngữ đã cấu hình
      }).addTo(map);

      setRoutingControl(control); // Lưu routing control vào state
    }
  }, [map, myLocation]);

  return (
    <div>
      <div
        id="map"
        className="w-full h-[400px] sm:h-[600px] lg:h-[800px]"
      />

      
    </div>
  );
};

export default LocationProduct;
