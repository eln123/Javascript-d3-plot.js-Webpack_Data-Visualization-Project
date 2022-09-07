import Papa from "papaparse";

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
