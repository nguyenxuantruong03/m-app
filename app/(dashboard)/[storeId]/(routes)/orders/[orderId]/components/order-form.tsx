"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { OrderColumn } from "../../components/columns";
import {toast} from "react-hot-toast";
import { EyeOff, Search } from "lucide-react";
interface OrderProps {
  data: OrderColumn[];
}
//Customer Tiếng Việt
L.Routing.Localization["vi"] = {
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
    cantProjectRouteOnSatellite: "Không thể đề xuất đường đi trên hình vệ tinh",
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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

//-----------------------Code LeftLet----------------------
const OrderForm: React.FC<OrderProps> = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Function to toggle search visibility ẩn hoặc mở
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const extractRelevantAddress = (fullAddress: string): string => {
    const addressComponents = fullAddress.split(", ");
    const relevantAddress = `${addressComponents[0]} ${
      addressComponents[addressComponents.length - 3]
    }`;
    return relevantAddress;
  };

  const addressOrder = data.map((datas) =>
    extractRelevantAddress(datas?.address)
  );

  useEffect(() => {
    const map = L.map("map").setView([10.77621, 106.60444], 16);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "Leaflet &copy; " + mapLink + ", contribution",
      maxZoom: 20,
    }).addTo(map);
    //-------------------------------Routing của data từ nhà đến địa chỉ của khách ------------------------------------
    const motoIcon = L.icon({
      iconUrl: "/moto-map.png",
      iconSize: [35, 50],
    });

    const motoMarker = L.marker([10.77621, 106.60444], {
      icon: motoIcon,
    }).addTo(map);

    const waypoints = [
      [10.77621, 106.60444], // Điểm xuất phát
      ...addressOrder.map((address) => `${address}`), // Điểm đến
    ];

    const geocodeAndSetWaypoints = async () => {
      try {
        const waypointsLatLng = await Promise.all(waypoints.map(geocode));
        // Hiển thị popup ở điểm đến
        waypointsLatLng.slice(1).forEach((coord, index) => {
          const destinationMarker = L.marker(coord).addTo(map);
          destinationMarker
            .bindPopup(`Điểm đến - ${addressOrder[index]}`)
            .openPopup();
        });
        // Dùng để hiển thị vị trí hiện tại
        L.control.locate().addTo(map);
        //Dùng để routting giữa điểm A và điểm B
        L.Routing.control({
          waypoints: waypointsLatLng,
          language: "vi",
        })
          .on("routesfound", function (e: any) {
            const routes = e.routes;
            console.log("2", routes);

            e.routes[0].coordinates.forEach(function (coord: any, index: any) {
              setTimeout(function () {
                motoMarker.setLatLng([coord.lat, coord.lng]);
              }, 500 * index);
            });
          })
          .addTo(map);
      } catch (error) {
        console.error(error);
        toast.error("Địa chỉ không đúng");
      }
    };

    geocodeAndSetWaypoints();

    //-------------------------------------Các biểu đồ ----------------------------------------------------------------
    // Biểu đồ mặc định
    const osm = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "Leaflet &copy; " + mapLink + ", contribution",
      maxZoom: 20,
    }).addTo(map);

    // Additional layers
    const watercolor = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}",
      {
        minZoom: 1,
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: "jpg",
      }
    );

    const dark = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    );

    const googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const googleSat = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const baseMaps = {
      "Map mặc định": osm,
      "Map màu nước ": watercolor,
      Tối: dark,
      "Google Street": googleStreets,
      "Google Satellite": googleSat,
    };
    //Hiển thị các loại map
    L.control.layers(baseMaps).addTo(map);

    //------------------------------------------------------,,,,,,,,,,,,----------------------------------//
    //Khi Search thì nó chuyển Routing đến chỗ Search
    const searchBtnClickHandler = async () => {
      try {
        const inputElement = document.getElementById(
          "search-map"
        ) as HTMLInputElement | null;
        const address = inputElement?.value;

        if (address) {
          const waypointsLatLng = await Promise.all([
            geocode("10.77621, 106.60444"), // Starting point
            geocode(address), // Searched location
          ]);

          // Remove existing routing control if any
          map.eachLayer((layer: any) => {
            if (layer instanceof L.Routing.Control) {
              map.removeControl(layer);
            }
          });

          // Update routing control with new waypoints
          L.Routing.control({
            waypoints: waypointsLatLng,
            language: "vi",
          })
            .on("routesfound", function (e: any) {
              const routes = e.routes;
              console.log("2", routes);

              e.routes[0].coordinates.forEach(function (
                coord: any,
                index: any
              ) {
                setTimeout(function () {
                  motoMarker.setLatLng([coord.lat, coord.lng]);
                }, 500 * index);
              });
            })
            .addTo(map);
          setSearchValue("");
        }
      } catch (error) {
        console.error(error);
        toast.error("Địa chỉ không đúng");
      }
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        searchBtnClickHandler();
      }
    };

    // Attach the onKeyPress event to the input field
    const searchInput = searchInputRef.current;
    searchInput?.addEventListener("keypress", handleKeyPress as any);

    const searchBtn = document.getElementById("search-btn");
    searchBtn?.addEventListener("click", searchBtnClickHandler);

    //Xem tọa độ
    map.on("mousemove", function (e: any) {
      document.getElementsByClassName("coordinate")[0].innerHTML =
        "lat: " + e.latlng.lat + "lng: " + e.latlng.lng;
    });

    return () => {
      // Clean up event listener when the component is unmounted
      searchBtn?.removeEventListener("click", searchBtnClickHandler);
      searchInput?.removeEventListener("keypress", handleKeyPress as any);
      map.remove();
    };
  }, []);

  const geocode = async (location: string | number[]): Promise<any> => {
    try {
      const address = Array.isArray(location)
        ? `${location[0]}, ${location[1]}`
        : location;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return L.latLng(lat, lon);
      } else {
        throw new Error(`Geocoding failed for location: ${location}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
      {/* Search input and button */}
      {isSearchVisible && (
        <div className="flex items-center absolute z-[999] top-[160px] left-[260px]">
          <input
            ref={searchInputRef}
            id="search-map"
            type="text"
            placeholder="Nhập địa chỉ."
            className="border-slate-800 border-solid border-2 p-2 rounded-md mr-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button id="search-btn">
            <Search className="w-9 h-9 p-1 border-slate-800 rounded-full border-solid border-2 bg-white" />
          </button>
        </div>
      )}
      {/* Toggle */}
      <div
        onClick={toggleSearchVisibility}
        className="absolute z-[999] left-[260px] top-[120px]"
      >
        <p>
          {isSearchVisible ? (
            <EyeOff className="w-8 h-8 p-1 border-slate-800 rounded-full border-solid border-2 bg-white" />
          ) : (
            <Search className="w-8 h-8 p-1 border-slate-800 rounded-full border-solid border-2 bg-white" />
          )}
        </p>
      </div>
      {/* Tọa độ sử dùng className coordinate để handle */}x
      <div className=" left-2/4 absolute z-[999] top-[90%]">
        <div className="leaflet-control coordinate"></div>
      </div>
    </>
  );
};

export default OrderForm;
