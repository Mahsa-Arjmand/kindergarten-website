declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latlng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
  }

  class LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean);
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
  }

  interface GeocoderRequest {
    address?: string;
  }

  interface GeocoderResult {
    geometry: {
      location: LatLng;
    };
  }

  type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

  class Marker {
    constructor(opts?: MarkerOptions);
    addListener(eventName: string, handler: Function): void;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    animation?: Animation;
  }

  enum Animation {
    DROP,
    BOUNCE,
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map: Map, anchor?: Marker): void;
  }

  interface InfoWindowOptions {
    content?: string | Element;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers?: Array<{ [key: string]: any }>;
  }
}
