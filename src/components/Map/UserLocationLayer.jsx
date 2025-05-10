import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';




const UserLocationLayer = ({ value, onLocationSelect, style }) => {

    const [mapInstance] = useAtom(mapInstanceAtom);

    useEffect(() => {
        if (!mapInstance) return;

        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({ source: vectorSource });

        mapInstance.addLayer(vectorLayer);

        if (value) {
            const feature = new Feature({
                geometry: new Point(value),
            });

            feature.setStyle(style);
            vectorSource.addFeature(feature);
        }


        const handleClick = (event) => {
            const coordinate = event.coordinate;
            vectorSource.clear();

            const feature = new Feature({
                geometry: new Point(coordinate),
            });

            feature.setStyle(style);

            vectorSource.addFeature(feature);
            onLocationSelect?.(coordinate);

        };

        mapInstance.on('click', handleClick);


    }, [mapInstance, onLocationSelect, value]);

    return null;
};

export default UserLocationLayer;