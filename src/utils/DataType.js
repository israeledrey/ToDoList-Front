const geoJSON = () => {

  const createGeoJSON = (coordinate) => {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coordinate
          },
          properties: {}
        }
      ]
    };
  };

  const getGeoJsonType = (data) => {
    if (
      data?.type === "FeatureCollection" &&
      Array.isArray(data.features) &&
      data.features.length > 0 &&
      data.features[0]?.geometry?.type
    ) {
      return data.features[0].geometry.type.toLowerCase();
    }
    return null;
  };

  return { createGeoJSON, getGeoJsonType };
};

export default geoJSON;