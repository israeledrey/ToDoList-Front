import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import geoJSON from '../../utils/DataType';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';


const TasksLayer = ({ tasks, style }) => {

  const [mapInstance] = useAtom(mapInstanceAtom);
  const { createGeoJSON, getGeoJsonType } = geoJSON();

  useEffect(() => {
    if (!mapInstance || !tasks) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });

    tasks.forEach(task => {
      if (!task || !task.location) return;

      const geoJson = task.location;
      const type = getGeoJsonType(geoJson);
      const coordinates = task.location.features[0]?.geometry?.coordinates;

      let geometry;
      let customStyle;

      switch (type) {
        case 'point':
          geometry = new Point(coordinates);
          customStyle = style;
          break;

        default:
          console.warn("Unsupported geometry type or invalid GeoJSON:", geoJson);
          return;
      }

      const feature = new Feature({ geometry });
      feature.setStyle(style);
      vectorSource.addFeature(feature);
    });

    mapInstance.addLayer(vectorLayer);

    return () => {
      mapInstance.removeLayer(vectorLayer);
    };

  }, [mapInstance, tasks]);

  return null;
};

export default TasksLayer;