import { getCLS, getFID, getLCP, getFCP, getTTFB, onPerfEntry } from 'web-vitals';

function sendToAnalytics(metric) {
  // Aquí puedes implementar la lógica para enviar métricas a servicios de análisis como Google Analytics
  console.log(metric);
}

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
