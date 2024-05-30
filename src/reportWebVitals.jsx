import { getCLS, getFID, getLCP, getFCP, getTTFB, onPerfEntry } from 'web-vitals';

function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getFCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export default reportWebVitals;
