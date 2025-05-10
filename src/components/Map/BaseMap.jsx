import { useEffect, useRef, Children, cloneElement } from 'react';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../../atoms/tasksAtoms';

import BaseTileLayer from './BaseTileLayer';

import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';


const BaseMap = ({ children, center, zoom , className}) => {

  const mapRef = useRef(null);
  const [ mapInstance, setMapInstance ] = useAtom(mapInstanceAtom);

  const injectMapToChildren = () => {
    return Children.map(children, (child) =>
      cloneElement(child, { map: mapInstance })
    );
  };
  
  useEffect(() => {
    
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
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
      {mapInstance && (
         <>
         <BaseTileLayer map={mapInstance} />
         {injectMapToChildren()}
       </>
      )}
    </div>
  );
};

export default BaseMap;