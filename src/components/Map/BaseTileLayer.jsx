import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


const BaseTileLayer = () => {

  const [mapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    if (!mapInstance) return;

    const tileLayer = new TileLayer({
      source: new OSM({ attributions: null }),
    });

    mapInstance.addLayer(tileLayer);

    return () => {
      mapInstance.removeLayer(tileLayer);
    };
  }, [mapInstance]);

  return null;
};

export default BaseTileLayer;