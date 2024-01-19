import { FC } from "react";
import { FilmingEvent } from "../utils/getFilmingEvents";
import './FilmingEventsList.css';

interface FilmingEventsListProps {
  filmingEvents: FilmingEvent[];
  activeFilmingEventId: number | undefined;
  onSetActiveFilmingEventId: (id: number | undefined) => void;
}

export const FilmingEventsList: FC<FilmingEventsListProps> = ({ filmingEvents, activeFilmingEventId, onSetActiveFilmingEventId }) => (
  <div className="filming-events">
    {filmingEvents.map((filmingEvent) => (
      <div
        key={filmingEvent.id}
        className={filmingEvent.id === activeFilmingEventId ? 'active' : ''}
        onClick={() => onSetActiveFilmingEventId(activeFilmingEventId === filmingEvent.id ? undefined : filmingEvent.id)}
      >
        <h3>{filmingEvent.id}</h3>
        <p>{filmingEvent.start_date_time} - {filmingEvent.end_date_time}</p>
        <p>{filmingEvent.location}, {filmingEvent.borough}</p>
      </div>
    ))}
  </div>
  );
