/* 
 * Author: Tavner Murphy
 * Date: 2/10/2024
 * React Starter App - Bootstrapped with Create React App
 * 
 * Source: Facebook, Inc. (2024). React Starter App. Retrieved from https://react.dev
 * 
 * This project was initialized using Create React App.
 * See documentation at https://create-react-app.dev
*/

import React, { useEffect, useState } from 'react';
import './ConcertsPage.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const TICKETMASTER_API = 'https://app.ticketmaster.com/discovery/v2/events.json';
const API_KEY = 'XzpAgIiHS6LYrTkgPButoiw3LK9uBeNW';

function ConcertsPage() {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Get user data from session storage (backend not implemented yet)
    const storedUser = sessionStorage.getItem('demoUser');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      if (userObj.homeCity) {
        setLocation(userObj.homeCity);
      }
    }
  }, []);

  useEffect(() => {
    if (!location) return;
    fetchConcerts(location);
  }, [location]);

  // Ticketmaster API call
  async function fetchConcerts(city) {
    try {
      const url = `${TICKETMASTER_API}?apikey=${API_KEY}&classificationName=Music&city=${encodeURIComponent(city)}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Error fetching from Ticketmaster:', response.statusText);
        return;
      }

      const data = await response.json();
      const eventsArray = data?._embedded?.events || [];
      setEvents(eventsArray);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }

  function handleSortChange(newSort) {
    setSortBy(newSort);
  }

  // Sort either by date or A-Z 
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.dates.start.dateTime || a.dates.start.localDate);
      const dateB = new Date(b.dates.start.dateTime || b.dates.start.localDate);
      return dateA - dateB;
    } else if (sortBy === 'name') {
      const nameA = (a?.name || '').toLowerCase();
      const nameB = (b?.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    }
    return 0;
  });

  return (
    <div className="concerts-container">
      <NavBar />
      <h1 className="concerts-title">Concerts</h1>

      <div className="concerts-filters">
        <div className="concerts-location-wrapper">
          <input
            className="concerts-location-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="concerts-clear-button"
            onClick={() => setLocation('')}
          >
            x
          </button>
        </div>

        <span className="sort-label">Sort By</span>
        <button className="sort-button" onClick={() => handleSortChange('date')}>
          Date
        </button>
        <button className="sort-button" onClick={() => handleSortChange('name')}>
          A-Z
        </button>
      </div>

      <div className="concerts-grid">
        {sortedEvents.map((event) => {
          const eventId = event.id;
          const eventName = event.name || 'Unknown Event';

          // Get the first image
          const imageObj = event.images?.[0];
          const imageUrl = imageObj ? imageObj.url : 'https://via.placeholder.com/200';

          // Venue details
          let venueName = 'Unknown Venue';
          let city = 'Unknown City';
          let region = '';
          if (event._embedded?.venues?.[0]) {
            const venue = event._embedded.venues[0];
            venueName = venue.name || venueName;
            city = venue.city?.name || city;
            region = venue.state?.stateCode || venue.country?.countryCode || '';
          }

          // Date details
          const dateTime = event.dates.start.dateTime || event.dates.start.localDate;
          const formattedDate = dateTime
            ? new Date(dateTime).toLocaleString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'TBA';

          return (
            <div className="concert-card" key={eventId}>
              <Link to={`/concert/${eventId}`}>
                <img className="concert-card-image" src={imageUrl} alt={eventName} />
              </Link>
              <h3 className="concert-card-title">{eventName}</h3>
              <p>{venueName}</p>
              <p>
                {city}, {region}
              </p>
              <p>{formattedDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConcertsPage;
