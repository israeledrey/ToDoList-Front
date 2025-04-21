import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import DataType from '../../utils/DataType';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

const TasksLayer = ({ tasks }) => {

  const [mapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    if (!mapInstance || !tasks) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });
    const iconUrl = "https://www.svgrepo.com/show/3322/duck.svg";

    tasks.forEach(task => {
      if (!task || !task.location) return;

      const type = DataType(task.location);
      
        let geometry;
        let style;

        switch (type) {
          case 'point':
            geometry = new Point(task.location);
              style = new Style({
                image: new Icon({
                  anchor: [0.5, 1],
                  scale: 0.04,
                  src: iconUrl,
                }),
              });
            break;

          default:
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