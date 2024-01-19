import { FC, useEffect, useState } from "react";
import { MapDisplay } from "./components/MapDisplay";
import { FilmingEvent, getFilmingEvents } from "./utils/getFilmingEvents";
import './App.css';

export const App: FC = () => {
  const [filmingEvents, setFilmingEvents] = useState<FilmingEvent[]>([]);

  useEffect(() => {
    getFilmingEvents('data.csv')
      .then((filmingEvents) => setFilmingEvents(filmingEvents))
      .catch((error) => console.error('Error parsing CSV:', error));
  }, []);

  return (
    <>
      <div className="nav">
        <h1>nyc live filming</h1>
        <p className="links">
          <a href="https://colab.research.google.com/drive/1aMqf4AC9Nq9NCW0fl1J2XqOFloFpLCAe?usp=sharing" target="_blank" rel="noopener noreferrer">Colab Notebook</a>
          <a href="https://github.com/tawn33y/nyc-live-filming" target="_blank" rel="noopener noreferrer">Github</a>
        </p>
      </div>
      <MapDisplay filmingEvents={filmingEvents} />
    </>
  );
};
