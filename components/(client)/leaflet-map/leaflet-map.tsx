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
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/use-current-user";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const LeafletMap = () => {
  const t = useTranslations("map")
  const user = useCurrentUser()
  const languageToUse = user?.language || "vi"
  const mapRef = useRef<null>(null);
  const [isVisible, setIsVisible] = useState(true);

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
      const popupContent = `${t("form.store")} Trường Đạt - 457 Lê Văn Quới,Quận Bình Tân, Phường Bình Trị Đông A, TPHCM `;
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
        <div className="arrow-click flex font-bold">{t("form.clickHere")}</div>
        <div className="flex justify-center">
          <MousePointerClick className="w-8 transform rotate-90 arrow-click" />
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
