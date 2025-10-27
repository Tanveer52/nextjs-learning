export default function handler(req, res) {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>404 - You Shouldn’t Be Here 👁️</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          background: radial-gradient(circle at center, #000 0%, #111 100%);
          color: #f00;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Courier New', monospace;
          overflow: hidden;
        }
        h1 {
  font-size: 4rem;
  color: #ff0000;
  text-shadow:
    0 0 10px #ff0000,
    0 0 20px #ff0000,
    0 0 40px #990000,
    0 0 80px #330000;
  letter-spacing: 3px;
  animation: flicker 1.2s infinite alternate, shake 3s infinite ease-in-out;
}



        p {
          font-size: 1.2rem;
          color: #aaa;
          margin-top: 10px;
        }
      @keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.3; }
}

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(1px, -1px); }
}
        .eyes {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 5rem;
          animation: blink 3s infinite;
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="eyes">👀</div>
      <h1>404 - Wrong Turn...</h1>
      <p>You’ve wandered into the forbidden route.</p>
      <p>Disconnect... before it returns a 666 status code 🔥</p>
    </body>
    </html>
  `);
}
