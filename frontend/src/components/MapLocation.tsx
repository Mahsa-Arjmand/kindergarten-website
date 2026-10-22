import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface MapLocationProps {
  address?: string;
  height?: string;
  width?: string;
  lat?: number;
  lng?: number;
}

const MapLocation = ({
  address = 'مهدکودک هدیه، زنجان، شهرک منظریه، نسیم ۱۰ غربی، خیابان شهید علیرضا حق وردی، قطعه ۱۸۴',
  height = '200px',
  width = '100%',
  lat = 36.6707529,
  lng = 48.5353899
}: MapLocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Initialize map centered on exact location
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 16,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    mapInstanceRef.current = map;

    // Add marker at exact location
    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: 'مهدکودک هدیه',
      animation: window.google.maps.Animation.DROP,
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{ height, width, borderRadius: '12px', overflow: 'hidden' }}
      className="border border-border-light"
      aria-label="نقشه مهدکودک هدیه"
    />
  );
};

export default MapLocation;
