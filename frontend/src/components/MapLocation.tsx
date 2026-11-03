import { ExternalLink, MapPin } from 'lucide-react';

export const HEDIYEH_LOCATION = {
  lat: 36.6709032,
  lng: 48.5350694,
  title: 'مهدکودک و پیش‌دبستانی هدیه',
  shortAddress: 'زنجان، شهرک منظریه، نسیم ۱۰ غربی، قطعه ۱۸۴',
  fullAddress:
    'زنجان، شهرک منظریه، نسیم ۱۰ غربی (خیابان شهید علیرضا حق وردی)، قطعه ۱۸۴، کودکستان هدیه',
  get embedUrl() {
    return `https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=fa&z=17&output=embed`;
  },
  get googleMapsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`;
  },
  get directionsUrl() {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}`;
  },
};

interface MapLocationProps {
  height?: string;
  width?: string;
  className?: string;
}

const MapLocation = ({
  height = '300px',
  width = '100%',
  className = '',
}: MapLocationProps) => {
  return (
    <div
      style={{ height, width }}
      className={`group relative overflow-hidden rounded-2xl border-2 border-border-light bg-cream shadow-sm ${className}`}
    >
      {/* Fallback backdrop shown while Google Maps iframe loads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#f4f6f9] p-4 text-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(30,167,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,167,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md">
          <MapPin size={20} />
        </span>
        <span className="mt-2 text-[12px] font-bold text-ink">{HEDIYEH_LOCATION.title}</span>
        <span className="mt-0.5 text-[11px] text-muted">{HEDIYEH_LOCATION.shortAddress}</span>
      </div>

      {/* Live embedded Google Map */}
      <iframe
        src={HEDIYEH_LOCATION.embedUrl}
        title="موقعیت مهدکودک هدیه روی نقشه گوگل"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="pointer-events-none relative z-[1] h-full w-full border-0 transition duration-300 group-hover:scale-[1.02]"
      />

      {/* Full clickable overlay so pressing anywhere opens exact location in Google Maps */}
      <a
        href={HEDIYEH_LOCATION.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="مشاهده موقعیت دقیق مهدکودک هدیه در گوگل مپ"
        className="absolute inset-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/35 via-transparent to-transparent p-3 transition group-hover:from-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-ink shadow-md transition group-hover:bg-brand group-hover:text-white">
          <MapPin size={14} className="shrink-0" aria-hidden="true" />
          مشاهده در گوگل مپ
          <ExternalLink size={12} className="shrink-0" aria-hidden="true" />
        </span>
      </a>
    </div>
  );
};

export default MapLocation;
