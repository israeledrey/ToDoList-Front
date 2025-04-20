import { useEffect } from 'react';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


const BaseTileLayer = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    const tileLayer = new TileLayer({
      source: new OSM({ attributions: null }),
    });

    map.addLayer(tileLayer);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

export default BaseTileLayer;