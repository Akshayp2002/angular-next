"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Memoize the icon so it doesn't cause re-renders
    const icon = useMemo(() => {
        if (typeof window === 'undefined') return null;
        return new L.DivIcon({
            className: 'custom-div-icon',
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="w-16 h-16 bg-white rounded-full border-[3px] border-white shadow-lg flex items-center justify-center overflow-hidden">
                        <img src="/avatar.png" class="w-12 h-12 object-contain" alt="avatar" />
                    </div>
                    <div class="absolute -inset-2 bg-blue-400/20 rounded-full animate-pulse"></div>
                </div>`,
            iconSize: [64, 64],
            iconAnchor: [32, 32],
        });
    }, []);

    // Do not render anything until we are on the client
    if (!isMounted || !icon) return null;

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={[10.8505, 76.2711]}
                zoom={7}
                zoomControl={false}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                {/* Wrapping children in a simple component or using a key 
                  can sometimes help, but TileLayer must be a direct child 
                  of MapContainer to receive the map instance.
                */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[10.8505, 76.2711]} icon={icon} />
            </MapContainer>
        </div>
    );
}