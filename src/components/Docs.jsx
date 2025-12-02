import React from "react";

export default function Docs() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>API Documentation</h1>
      <p>This is a placeholder page for API docs.</p>
      <ul>
        <li><strong>GET /weather</strong> – Fetch current weather data</li>
        <li><strong>GET /onecall</strong> – Fetch hourly forecast</li>
        <li><strong>GET /forecast</strong> – Fetch 5‑day forecast</li>
      
      </ul>
    </div>
  );
}