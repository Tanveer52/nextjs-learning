import React, { useState } from "react";

function EventsPage({ data }) {
  const [events, setEvents] = useState(data);

  async function fetchEventsByCategory(category) {
    const res = await fetch(
      `http://localhost:4000/events?category=${category}`
    );
    const data = await res.json();
    setEvents(data);
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f9fafc",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1a202c",
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        Upcoming Events
      </h2>

      <button
        onClick={() => fetchEventsByCategory("Hackathon")}
        style={{ marginBottom: "20px" }}
      >
        Filter Events
      </button>

      {events && events.length > 0 ? (
        events.map((event, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "#2d3748", marginBottom: "6px" }}>
              {event.title}
            </h3>
            <p style={{ color: "#4a5568", margin: "0 0 4px" }}>
              📅 <strong>Date:</strong> {event.date}
            </p>
            <p style={{ color: "#4a5568", margin: "0 0 4px" }}>
              📍 <strong>Location:</strong> {event.location}
            </p>
            <p style={{ color: "#4a5568", margin: "0 0 4px" }}>
              😺 <strong>Category:</strong> {event.category}
            </p>
            <p style={{ color: "#718096", fontSize: "14px", marginTop: "8px" }}>
              {event.description}
            </p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#718096" }}>
          No events available.
        </p>
      )}
    </div>
  );
}

export default EventsPage;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/events");
  const events = await res.json();

  return {
    props: {
      data: events,
    },
  };
}
