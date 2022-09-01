import axios from "axios";

import { parse } from "csv-parse/browser/esm/sync";

import Papa from "papaparse";

// export const converter = async (file, func) => {
//   Papa.parse(file, {
//     download: true,
//     header: true,
//     skipEmptyLines: true,

//     complete: func,
//   });
// };

export async function converter(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        return value.trim();
      },
      complete: (results) => {
        return resolve(results);
      },
      error: (error) => {
        return reject(error);
      },
    });
  });
}
