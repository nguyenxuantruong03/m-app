"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MousePointerClick } from "lucide-react";
import "./style.css";
import { root } from "../color/color";
import {
  translateClickHere,
  translateStore,
} from "@/translate/translate-client";
import { useCurrentUser } from "@/hooks/use-current-user";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface LeafletMapProps {}

const LeafletMap = () => {
  const user = useCurrentUser();
  const mapRef = useRef<null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const clickHereMessage = translateClickHere(languageToUse);
  const storeMessage = translateStore(languageToUse);

  //Customer language
  L.Routing.Localization[languageToUse] = {
    directions: {
      north: "Bắc",
      northeast: "Đông Bắc",
      east: "Đông",
      southeast: "Đông Nam",
      south: "Nam",
      southwest: "Tây Nam",
      west: "Tây",
      northwest: "Tây Bắc",
    },
    instructions: {
      straight: "Đi thẳng",
      slightLeft: "Rẽ nhẹ trái",
      left: "Rẽ trái",
      sharpLeft: "Rẽ mạnh trái",
      slightRight: "Rẽ nhẹ phải",
      right: "Rẽ phải",
      sharpRight: "Rẽ mạnh phải",
      uturn: "Quay đầu",
    },
    maneuvers: {
      merge: "Gộp",
      depart: "Rời đi",
      arrive: "Đến nơi",
      fork: "Giao lộ",
      endOfRoad: "Cuối đường",
      passRoundabout: "Vượt qua vòng xuyến",
      accessRoundabout: "Vào vòng xuyến",
      stayOnRoundabout: "Tiếp tục ở vòng xuyến",
      startAtEndOfStreet: "Bắt đầu ở cuối đường",
      start: "Bắt đầu",
      turn: "Rẽ",
      turnLeft: "Rẽ trái",
      turnRight: "Rẽ phải",
      multiple: "Nhiều hướng",
    },
    errors: {
      locationNotFound: "Không tìm thấy địa điểm",
      cantProjectRouteOnSatellite:
        "Không thể đề xuất đường đi trên hình vệ tinh",
      routeNotFound: "Không tìm thấy đường đi",
      cantFindRoute: "Không thể tìm đường đi",
      requestFailed: "Yêu cầu thất bại",
      tooManyStops: "Quá nhiều điểm dừng",
      unableToSync: "Không thể đồng bộ",
    },
    other: {
      useRouteAnyway: "Sử dụng đường đi này?",
      isCurrently: "Hiện tại",
      poweredBy: "Cung cấp bởi",
    },
  };

  const handleMouseEnter = () => {
    setIsVisible(false);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Wait 5 seconds before setting visibility back to true
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!mapRef.current) {
      // Map initialization
      const map = L.map("map").setView([10.77621, 106.60444], 20);

      // Xem vị trí hiện tại của mình
      L.control.locate().addTo(map);

      // Event listener for location found
      map.on("locationfound", (e: any) => {
        const currentLocation = e.latlng;
        // Routing control
        L.Routing.control({
          waypoints: [currentLocation, L.latLng(10.77621, 106.60444)],
          // @ts-ignore
          language: languageToUse,
          routeWhileDragging: true,
        }).addTo(map);
      });

      // OSM layer
      const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      // Dark map layer
      const dark = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      );

      // Google Streets layer
      const googleStreets = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );
      //Mặc định no sẽ hiện map này
      googleStreets.addTo(map);

      // Google Satellite layer
      const googleSat = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      // Marker
      const myIcon = L.icon({
        iconUrl: "/images/red_marker.png",
        iconSize: [40, 40],
      });
      const singleMarker = L.marker([10.77621, 106.60444], {
        icon: myIcon,
        draggable: true,
      });
      // Popup
      const popupContent = `${storeMessage} Trường Đạt - 457 Lê Văn Quới,Quận Bình Tân, Phường Bình Trị Đông A, TPHCM `;
      const popup = singleMarker.bindPopup(popupContent);
      // Add Marker and Popup to the map
      singleMarker.addTo(map);
      popup.openPopup(); // Open the popup immediately
      // Optionally, you can also add an event listener to open the popup on marker click
      singleMarker.on("click", () => {
        popup.openPopup();
      });

      // Layer control
      const baseMaps = {
        OSM: osm,
        Dark: dark,
        "Google Street": googleStreets,
        "Google Satellite": googleSat,
      };

      L.control.layers(baseMaps).addTo(map);
      mapRef.current = map;
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div
      className={`w-full flex justify-center item-center bg-white py-4 px-2 md:px-12 ${root.bgwhite}`}
    >
      <div
        id="map"
        className="w-full h-[300px] md:h-[500px] relative rounded-md"
      ></div>
      <div
        className={`arrow absolute md:left-[0%] lg:left-[0%] z-[1000] mt-[100px] hidden md:flex shake text-red-500 ${
          !isVisible ? "hidden" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="arrow-click flex font-bold">{clickHereMessage}</div>
        <div className="flex justify-center">
          <MousePointerClick className="w-8 transform rotate-90 arrow-click" />
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
