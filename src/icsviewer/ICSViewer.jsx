import React, { useState } from 'react';
import './ICSViewer.css';
import { CalendarDaysIcon, MapPinIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Simple .ics parser (minimal, for demo)
function parseICS(text) {
  const events = [];
  const lines = text.split(/\r?\n/);
  let event = null;
  lines.forEach(line => {
    if (line === 'BEGIN:VEVENT') {
      event = {};
    } else if (line === 'END:VEVENT') {
      if (event) events.push(event);
      event = null;
    } else if (event) {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        event[key] = rest.join(':');
      }
    }
  });
  return events;
}

export default function ICSViewer() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const parsed = parseICS(text);
        setEvents(parsed);
        setError('');
      } catch (err) {
        setError('Failed to parse .ics file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="ics-viewer enhanced">
      <h2 className="ics-title">
        <CalendarDaysIcon className="ics-title-icon" /> ICS File Viewer
      </h2>
      <label className="ics-file-label">
        <span className="ics-file-btn">Choose .ics File</span>
        <input type="file" accept=".ics" onChange={handleFile} className="ics-file-input" />
      </label>
      {error && <div className="ics-error">{error}</div>}
      <div className="ics-events">
        {events.length === 0 && <div className="ics-empty">No events loaded.</div>}
        {events.map((ev, idx) => (
          <div className="ics-event-card" key={idx}>
            <div className="ics-event-header">
              <CalendarDaysIcon className="ics-event-icon summary" />
              <span className="ics-event-summary">{ev.SUMMARY || '(No summary)'}</span>
            </div>
            <div className="ics-event-detail">
              <ClockIcon className="ics-event-icon" />
              <span><strong>Start:</strong> {ev.DTSTART || '(No start)'}</span>
            </div>
            <div className="ics-event-detail">
              <ClockIcon className="ics-event-icon" />
              <span><strong>End:</strong> {ev.DTEND || '(No end)'}</span>
            </div>
            <div className="ics-event-detail">
              <DocumentTextIcon className="ics-event-icon" />
              <span><strong>Description:</strong> {ev.DESCRIPTION || '(No description)'}</span>
            </div>
            <div className="ics-event-detail">
              <MapPinIcon className="ics-event-icon" />
              <span><strong>Location:</strong> {ev.LOCATION || '(No location)'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
