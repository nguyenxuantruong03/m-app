"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslations } from "next-intl";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface LocationproductProps {
  locationLat?: number;
  locationLng?: number;
}

const LocationDeliveredProduct = ({ locationLat, locationLng }: LocationproductProps) => {
  const t = useTranslations()
  const [map, setMap] = useState<any>(null);
  const user = useCurrentUser();

  // Language setup
  const languageToUse = user?.language || "vi";

  // Default coordinates if no location provided
  const defaultLat = 10.77621;
  const defaultLng = 106.60444;

  // Check if both locationLat and locationLng are available
  const useLat = locationLat && locationLng ? locationLat : defaultLat;
  const useLng = locationLng && locationLat ? locationLng : defaultLng;

  useEffect(() => {
    const mapInstance = L.map("map").setView([useLat, useLng], 16); // Set the map view to the given or default coordinates
    setMap(mapInstance);

    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 18,
    }).addTo(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [useLat, useLng]); // Run this effect whenever useLat or useLng changes

  useEffect(() => {
    if (!map) return;

    // Create a marker at the given or default location
    const DeliveredMarker = L.marker([useLat, useLng]).addTo(map);

    // Show a specific message based on whether both coordinates are provided
    const popupMessage = locationLat && locationLng 
      ? t("location.delivered")
      : t('location.addressNotFound'); // Default message if no coordinates are provided

    DeliveredMarker.bindPopup(popupMessage).openPopup();
  }, [map, useLat, useLng, locationLat, locationLng]); // This effect runs after the map is set up

  return (
    <div>
      <div id="map" className="w-full h-[400px] sm:h-[600px] lg:h-[800px]" />
    </div>
  );
};

export default LocationDeliveredProduct;
