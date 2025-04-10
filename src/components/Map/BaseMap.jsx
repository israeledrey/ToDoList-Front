import { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const BaseMap = ({ children, center, zoom , className}) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({ attributions: null }),
        }),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });

    setMapInstance(map);

    return () => {
      map.setTarget(null);
    };
  }, [zoom]);

  return (
    <div ref={mapRef} className={className}>
      {mapInstance && children(mapInstance)}
    </div>
  );
};

export default BaseMap;