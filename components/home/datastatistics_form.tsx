"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { OrderColumn } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/columns";

interface OrderProps {
    data: OrderColumn[];
  }

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const LeafletMap:React.FC<OrderProps> = ({data}) => {
  useEffect(() => {
    const map = L.map("map").setView([10.77621, 106.60444], 16);
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 18,
    }).addTo(map);

    // Xem vị trí hiện tại của mình
    L.control.locate().addTo(map);

    const extractRelevantAddress = (fullAddress: string): string => {
        const addressComponents = fullAddress.split(", ");
        const relevantAddress = `${addressComponents[0]} ${
          addressComponents[addressComponents.length - 3]
        }`;
        return relevantAddress;
      };

    data.forEach((location) => {// Sử dụng API geocoding để lấy tọa độ từ tên địa chỉ
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            extractRelevantAddress(location.address)
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            const marker = L.marker([lat, lon]).addTo(map);
            const popupContent = `
                <p>Địa chỉ: ${location.address} - Email: ${location.email} - Sđt: ${location.phone} - Sản phẩm: ${location.products} </p> 
              `;
            marker.bindPopup(popupContent);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

    return () => {
      map.remove();
    };
  }, [data]);

  return (
    <div>
      <div
        id="map"
        className="max-w-full h-[800px] rounded-md"
      />
    </div>
  );
};

export default LeafletMap;
