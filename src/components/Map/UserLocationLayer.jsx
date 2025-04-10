import { useEffect } from 'react';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';



const UserLocationLayer = ({ map, iconUrl, onLocationSelect }) => {
    useEffect(() => {
        if (!map) return;        

        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({ source: vectorSource });

        map.addLayer(vectorLayer);

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

        map.on('click', handleClick);

        
    }, [map, onLocationSelect]);

    return null;
};

export default UserLocationLayer;