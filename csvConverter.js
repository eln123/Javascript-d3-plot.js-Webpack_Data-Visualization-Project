import axios from "axios";

import { parse } from "csv-parse/browser/esm/sync";

// export const converter = async (url) => {
//   const input = await axios.get(url);
//   const records = parse(input, {
//     columns: true,
//     skip_empty_lines: true,
//   });
//   console.log(records.length);
//   console.log(records[2]);
//   return records;
// };

// const test = async (file) => {
//   const input = await fs.readFile(
//     `/Users/owner/Desktop/juneCohort/capstone/Dashboard_data_visualization/ddf--gapminder--population/ddf--datapoints--population--by--country--year.csv`
//   );
//   const records = parse(input, {
//     columns: true,
//     skip_empty_lines: true,
//   });
//   console.log(records.length);
//   console.log(records[2]);
//   return records;
// };
// test();

import Papa from "papaparse";

// // Parse CSV string
// var data = Papa.parse(csv);

// // Convert back to CSV
// var csv = Papa.unparse(data);

// Parse local CSV file
export const converter = async (file, func) => {
  Papa.parse(file, {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: func,
  });
};
