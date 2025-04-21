const DataType = (location) => {
    
    if (!location || !Array.isArray(location)) return null;
  
    // Point: [lon, lat]
    if (typeof location[0] === 'number' && typeof location[1] === 'number') {
      return 'point';
    }
  
    // LineString: [[lon, lat], [lon, lat], ...]
    if (
      Array.isArray(location[0]) &&
      typeof location[0][0] === 'number' &&
      typeof location[0][1] === 'number'
    ) {
      return 'lineString';
    }
  
    // Polygon: [[[lon, lat], [lon, lat], ...]]
    if (
      Array.isArray(location[0]) &&
      Array.isArray(location[0][0]) &&
      typeof location[0][0][0] === 'number'
    ) {
      return 'polygon';
    }
  
    return null;
  }

  export default DataType;