import { useEffect } from 'react';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

const TasksLayer = ({ map, tasks, iconUrl }) => {
  useEffect(() => {
    if (!map || !tasks?.length) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });

    tasks.forEach(task => {
      if (task.location) {
        const feature = new Feature({
          geometry: new Point(task.location),
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              scale: 0.04,
              src: iconUrl,
            }),
          })
        );

        vectorSource.addFeature(feature);
      }
    });

    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
    
  }, [map, tasks]);

  return null;
};

export default TasksLayer;