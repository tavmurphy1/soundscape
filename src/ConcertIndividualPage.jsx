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
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './ConcertIndividualPage.css';

const TICKETMASTER_API = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'XzpAgIiHS6LYrTkgPButoiw3LK9uBeNW';

function ConcertIndividualPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const url = `${TICKETMASTER_API}/${eventId}.json?apikey=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          console.error('Error fetching event:', response.statusText);
          return;
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchEventDetails();
  }, [eventId]);

  if (!eventData) {
    return (
      <div className="concert-individual-container">
        <NavBar />
        <p>Loading event details...</p>
      </div>
    );
  }

  // Extract relevant info from eventData
  const name = eventData.name || 'Unknown Event';
  let venueName = 'Unknown Venue';
  let city = 'Unknown City';
  let region = '';
  let ticketUrl = '#';

  if (eventData._embedded?.venues?.[0]) {
    const venue = eventData._embedded.venues[0];
    venueName = venue.name || venueName;
    city = venue.city?.name || city;
    region = venue.state?.stateCode || venue.country?.countryCode || '';
  }
   // Set Ticketmaster URL
  if (eventData.url) {
    ticketUrl = eventData.url;
  }

  const dateTime = eventData.dates?.start?.dateTime || eventData.dates?.start?.localDate;
  const formattedDate = dateTime
    ? new Date(dateTime).toLocaleString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'TBA';

  const imageObj = eventData.images?.[0];
  const imageUrl = imageObj ? imageObj.url : 'https://via.placeholder.com/300';

  // Show confirmation popup
  function handleBuyTickets() {
    setShowPopup(true);
  }

  // '_blank' opens link in a new tab. then closes popup
  function handleConfirmPurchase() {
    window.open(ticketUrl, '_blank');
    setShowPopup(false);
  }

  // Just close popup
  function handleCancelPurchase() {
    setShowPopup(false);
  }

  return (
    <div className="concert-individual-container">
      <NavBar />
      <div className="concert-individual-content">
        <h1 className="concert-artist-name">{name}</h1>
        <h2 className="concert-venue-name">{venueName}</h2>
        <p>{city}, {region}</p>
        <p>{formattedDate}</p>

        <img className="concert-artist-image" src={imageUrl} alt={name} />

        <br />
        <button className="concert-buy-button" onClick={handleBuyTickets}>
          Purchase Tickets
        </button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>You're leaving SoundScape</h2>
              <p>
                You are about to be redirected to a third party website to purchase tickets.
                Click "Continue" to proceed or "Cancel" to stay on this page.
              </p>
              <div className="popup-buttons">
                <button className="popup-continue" onClick={handleConfirmPurchase}>Continue</button>
                <button className="popup-cancel" onClick={handleCancelPurchase}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConcertIndividualPage;