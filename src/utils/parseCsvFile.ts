import Papa from 'papaparse';

interface ParsedCSVInfo {
  id: string;
  name: string;
  start_date_time: string;
  end_date_time: string;
  agency: string;
  type: string;
  borough: string;
  location: string;
  street_side: string;
  police_precinct: string;
  lat: string;
  lng: string;
  url: string;
}

export const parseCsvFile = async (filePath: string): Promise<ParsedCSVInfo[]> => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    const parsedData = Papa.parse<ParsedCSVInfo>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return parsedData.data ?? [];
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};
