import { parseCsvFile } from "./parseCsvFile";

export interface FilmingEvent {
  id: number;
  name: string;
  start_date_time: string;
  end_date_time: string;
  agency: string;
  type: string;
  borough: string;
  location: string;
  street_side: string;
  police_precinct: string;
  lat: number;
  lng: number;
  url: string;
}

const getFormattedDate = (dateTime: string): string => new Date(dateTime).toString().split(' GMT')[0];

export const getFilmingEvents = async (filePath: string): Promise<FilmingEvent[]> => {
  const data = await parseCsvFile(filePath);

  return data.map((item) => ({
    id: parseInt(item.id, 10),
    name: item.name,
    start_date_time: getFormattedDate(item.start_date_time),
    end_date_time: getFormattedDate(item.end_date_time),
    agency: item.agency,
    type: item.type,
    borough: item.borough,
    location: item.location,
    street_side: item.street_side,
    police_precinct: item.police_precinct,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lng),
    url: item.url,
  }));
};
