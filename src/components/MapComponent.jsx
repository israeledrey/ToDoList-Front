import { useEffect, useRef } from "react";
import { fromLonLat } from 'ol/proj';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import Link from 'ol/interaction/Link';
import { Style, Icon } from 'ol/style';
import { Feature } from 'ol'; 
import { Vector as VectorLayer } from 'ol/layer'; 
import { Vector as VectorSource } from 'ol/source'; 
import Point from 'ol/geom/Point';
import { useTasksContext } from "../providers/TasksContext";



const MapComponent = ({ style, center, zoom, iconUrl, mode }) => {
  const {setFormState, tasksList} = useTasksContext();
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);
  const vectorLayerRef = useRef(null);


  
  useEffect(() => {
    if (!mapRef.current) return;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource; 

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    vectorLayerRef.current = vectorLayer


    console.log("Creating a new map...");
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({ attributions: null }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });


    if (mode === "user") {
      map.on("click", function (event) {
        const coordinate = event.coordinate; 
        console.log("Clicked coordinate:", coordinate);
  
        const iconFeature = new Feature({
          geometry: new Point(coordinate),
        });
      
        iconFeature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              scale: 0.04,
              src: iconUrl || "https://www.svgrepo.com/show/3322/duck.svg",
            }),
          })
        );
        
        
        setFormState((prevValue) => ({
          ...prevValue,
          location: coordinate
        }));
       
        // onLocationSelect(coordinate);  
        vectorSource.addFeature(iconFeature);  
      });
    }
   

    // if (mode === "admin") {
      
    //   console.log("tasksList:", tasksList);
    //   tasksList.forEach((task) => {
    //     if (task.location) { 
    //       console.log("task.location");
    //       const iconFeature = new Feature({
    //         geometry: new Point(task.location),
    //       });
    
    //       iconFeature.setStyle(
    //         new Style({
    //           image: new Icon({
    //             anchor: [0.5, 1],
    //             scale: 0.04,
    //             src: iconUrl || "https://www.svgrepo.com/show/3322/duck.svg",
    //           }),
    //         })
    //       );
    
    //       vectorSourceRef.current.addFeature(iconFeature); 
    //     }
    //   });
    // }
    map.addInteraction(new Link());



    return () => {
      map.setTarget(null);
    };
  }, [ zoom, iconUrl]);


  useEffect(()=>{
    if (mode === "admin") {
      tasksList.forEach((task) => {
        if (task.location) { 
          const iconFeature = new Feature({
            geometry: new Point(task.location),
          });
    
          iconFeature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                scale: 0.04,
                src: iconUrl || "https://www.svgrepo.com/show/3322/duck.svg",
              }),
            })
          );
    
          vectorSourceRef.current.addFeature(iconFeature); 
        }
      });
    }
  }, [iconUrl, mode, tasksList])

  return <div ref={mapRef} style={style} />;
};

export default MapComponent;