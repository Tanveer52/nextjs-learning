import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function EventsPage({ data }) {
  const router = useRouter();

  const [events, setEvents] = useState(data);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const categories = events.map((category) => category.category);
    const uinqueCategories = [...new Set(categories)];

    setAvailableCategories(uinqueCategories);
    if (uinqueCategories.length == 1) setSelectedCategory(uinqueCategories[0]);
  }, []);

  async function fetchEventsByCategory(category) {
    const queryString = category ? `category=${category}` : "";
    const res = await fetch(`http://localhost:4000/events?${queryString}`);
    const data = await res.json();
    setEvents(data);
    router.push(
      queryString.length == 0 ? "/events" : `/events?category=${category}`,
      undefined,
      { shallow: true }
    );
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
      <button
        onClick={() => {
          fetchEventsByCategory("");
          setSelectedCategory("");
        }}
        style={{
          marginBottom: "20px",
          marginRight: "5px",
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: "#9d0208",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
      <h2
        style={{
          textAlign: "center",
          color: "#1a202c",
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        Upcoming Events
        {selectedCategory.length != 0 && `For ${selectedCategory}`}
      </h2>

      {events && availableCategories && availableCategories.length > 0 ? (
        availableCategories.map((category) => (
          <button
            onClick={() => {
              fetchEventsByCategory(category);
              setSelectedCategory(category);
            }}
            style={{
              marginBottom: "20px",
              marginRight: "5px",
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#14213d",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))
      ) : (
        <p>No Categories Available</p>
      )}

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

export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? `category=${category}` : "";
  const res = await fetch(`http://localhost:4000/events?${queryString}`);
  const events = await res.json();

  return {
    props: {
      data: events,
    },
  };
}
