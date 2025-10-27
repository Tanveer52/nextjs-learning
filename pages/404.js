import React, { useEffect, useState } from "react";

export default function CuteSpooky404() {
  const [message, setMessage] = useState(
    "You’re lost... but it’s kinda cute here, right?"
  );
  const [flash, setFlash] = useState(false);
  const [ghosts, setGhosts] = useState([]);

  const spookySayings = [
    "Boo... but like, nicely 💕",
    "You’ve entered the sweet abyss 🍬",
    "Careful, the bunnies bite 🩸",
    "404 souls found 👻",
    "Stay forever… it’s cozy here 🕯️",
    "Oopsie! You tripped into the void 🌙",
    "Hehehe... wanna play a game? 🎠",
  ];

  // Floating ghosts
  useEffect(() => {
    const g = Array.from({ length: 5 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      emoji: Math.random() > 0.5 ? "👻" : "🧁",
    }));
    setGhosts(g);
  }, []);

  // Flicker and changing message
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessage(
        spookySayings[Math.floor(Math.random() * spookySayings.length)]
      );
    }, 3000);
    const flashInterval = setInterval(() => setFlash(Math.random() > 0.8), 200);
    return () => {
      clearInterval(msgInterval);
      clearInterval(flashInterval);
    };
  }, []);

  // CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floaty {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes flicker {
        0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
        20%, 24%, 55% { opacity: 0.5; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      body { cursor: none; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        background: flash
          ? "radial-gradient(circle, #ffe6ea, #1b001b)"
          : "radial-gradient(circle, #ffccff, #330033)",
        color: flash ? "#ff3366" : "#fff",
      }}
    >
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>{message}</p>

      {/* floating ghosts */}
      {ghosts.map((g, i) => (
        <div
          key={i}
          style={{
            ...styles.ghost,
            left: g.left,
            top: g.top,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.emoji}
        </div>
      ))}

      <a href="/" style={styles.button}>
        ✨ Return to Safety ✨
      </a>

      {/* Cute but creepy floating heart ring */}
      <div style={styles.heartRing}>
        {"💖💀💖💀💖💀".split("").map((c, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Comic Sans MS', cursive",
    textAlign: "center",
    transition: "background 0.5s",
  },
  title: {
    fontSize: "9rem",
    textShadow: "0 0 20px #ff66cc, 0 0 40px #ff3366",
    animation: "flicker 2s infinite",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "3rem",
    animation: "floaty 3s ease-in-out infinite",
  },
  ghost: {
    position: "absolute",
    fontSize: "3rem",
    animation: "floaty 5s ease-in-out infinite",
    opacity: 0.8,
  },
  button: {
    marginTop: "2rem",
    padding: "0.8rem 1.8rem",
    borderRadius: "20px",
    border: "2px solid #ff66cc",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    backgroundColor: "#660066",
    boxShadow: "0 0 10px #ff66cc, 0 0 30px #ff3366",
    transition: "0.3s",
  },
  heartRing: {
    position: "absolute",
    bottom: "10%",
    animation: "spin 8s linear infinite",
    fontSize: "1.5rem",
    letterSpacing: "0.3rem",
    opacity: 0.8,
  },
};
