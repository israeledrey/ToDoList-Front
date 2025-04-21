import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import Point from 'ol/geom/Point';




const UserLocationLayer = ({ onLocationSelect }) => {

    const [mapInstance] = useAtom(mapInstanceAtom);
    
    useEffect(() => {
        if (!mapInstance) return;        

        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({ source: vectorSource });
        const iconUrl="https://www.svgrepo.com/show/3322/duck.svg"

        mapInstance.addLayer(vectorLayer);

        const handleClick = (event) => {
            const coordinate = event.coordinate;
            vectorSource.clear();

            const feature = new Feature({
                geometry: new Point(coordinate),
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
            onLocationSelect?.(coordinate);

        };

        mapInstance.on('click', handleClick);

        
    }, [mapInstance, onLocationSelect]);

    return null;
};

export default UserLocationLayer;