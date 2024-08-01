// src/reportWebVitals.ts
import { ReportHandler } from 'web-vitals';

const reportWebVitals: ReportHandler = (metric) => {
  console.log(metric);
};

export default reportWebVitals;
