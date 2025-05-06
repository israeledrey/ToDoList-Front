
export const buildQueryParams = (paramsObj) => {
    return Object.entries(paramsObj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  };

