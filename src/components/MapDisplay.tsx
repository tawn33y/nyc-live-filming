import { FC, useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { FilmingEventsList } from './FilmingEventsList';
import { FilmingEvent } from '../utils/getFilmingEvents';
import './MapDisplay.css';

interface MapDisplayProps {
  filmingEvents: FilmingEvent[];
}

export const MapDisplay: FC<MapDisplayProps> = ({ filmingEvents }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | undefined>();
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([]);

  const closeAllInfoWindows = (): void => {
    infoWindows.forEach((selectedInfoWindow) => selectedInfoWindow?.close());
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GMAPS_API_KEY,
      version: 'weekly',
    });

    // create map
    loader.load().then((google) => {
      const bounds = new google.maps.LatLngBounds();

      filmingEvents.forEach((filmingEvent) => {
        const latLng = new google.maps.LatLng(filmingEvent.lat, filmingEvent.lng);
        bounds.extend(latLng);
      });
      const map = new google.maps.Map(mapRef.current!, {
        center: bounds.getCenter(),
        zoom: 14,
      });
      setMap(map);
    });
  }, [filmingEvents]);

  // create markers
  useEffect(() => {
    if (!map) return;

    closeAllInfoWindows();

    let newInfoWindows: google.maps.InfoWindow[] = [];
    filmingEvents.forEach((filmingEvent, index) => {
      const marker = new window.google.maps.Marker({
        position: { lat: filmingEvent.lat, lng: filmingEvent.lng },
        map: map,
        title: `Marker ${index + 1}`,
      });

      let contentString = `<div style='width:20rem'>`;
      contentString += `<h2>${filmingEvent.id}</h2>`;
      contentString += `<p><b>When</b>: ${filmingEvent.start_date_time} - ${filmingEvent.end_date_time}</p>`;
      contentString += `<p><b>Where</b>: ${filmingEvent.location}</p>`;
      contentString += `<p><b>Borough</b>: ${filmingEvent.borough}</p>`;
      contentString += `<p><b>Street side</b>: ${filmingEvent.street_side}</p>`;
      contentString += `<p><b>Police Precint</b>: ${filmingEvent.police_precinct}</p>`;
      contentString += `</div>`;

      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      newInfoWindows = [...newInfoWindows, infoWindow];

      if (selectedMarkerId === filmingEvent.id) {
        closeAllInfoWindows();
        infoWindow.open(map, marker);
      }

      marker.addListener('click', () => {
        closeAllInfoWindows();

        if (selectedMarkerId !== filmingEvent.id) {
          infoWindow.open(map, marker);
          setSelectedMarkerId(filmingEvent.id);
        }
      });
    });

    setInfoWindows(newInfoWindows);
  }, [filmingEvents, map, selectedMarkerId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMarkerId]);

  return (
    <div className="listings">
      <FilmingEventsList
        filmingEvents={filmingEvents}
        activeFilmingEventId={selectedMarkerId}
        onSetActiveFilmingEventId={setSelectedMarkerId}
      />
      <div ref={mapRef} className='map-display' />
    </div>
  );
};
