import { FC, useEffect, useState } from "react";
import { MapDisplay } from "./components/MapDisplay";
import { FilmingEvent, getFilmingEvents } from "./utils/getFilmingEvents";

export const App: FC = () => {
  const [filmingEvents, setFilmingEvents] = useState<FilmingEvent[]>([]);

  useEffect(() => {
    getFilmingEvents('data.csv')
      .then((filmingEvents) => setFilmingEvents(filmingEvents))
      .catch((error) => console.error('Error parsing CSV:', error));
  }, []);

  return (
    <>
      <h1>live filming nyc</h1>
      <MapDisplay filmingEvents={filmingEvents} />
    </>
  );
};
