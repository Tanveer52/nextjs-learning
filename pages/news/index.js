import React from "react";

function NewsPage({ news }) {
  const containerStyle = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#f7f8fc",
    minHeight: "100vh",
    padding: "50px 20px",
    color: "#333",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#222",
    textAlign: "center",
    letterSpacing: "1px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginTop: "20px",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const titleCard = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0070f3",
    marginBottom: "10px",
  };

  const contentStyle = {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "15px",
  };

  const authorStyle = {
    fontSize: "13px",
    color: "#777",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🗞️ Latest Tech News</h1>
      <div style={gridStyle}>
        {news.map((item) => (
          <div
            key={item.id}
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(-6px)",
                boxShadow: "0 8px 22px rgba(0,0,0,0.15)",
              })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
          >
            <h3 style={titleCard}>{item.headline}</h3>
            <p style={contentStyle}>{item.content}</p>
            <p style={authorStyle}>
              {item.author} •{" "}
              {new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;

export async function getServerSideProps() {
  const rawData = await fetch("http://localhost:4000/news");
  const data = await rawData.json();

  return {
    props: {
      news: data,
    },
  };
}
