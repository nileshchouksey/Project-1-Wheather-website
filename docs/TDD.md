
Technical Design Document (TDD)
Project Name: React Weather Dashboard WEATHER PRO

📌 Objectives
- Define the technical design and structure for the React Weather Dashboard.
- Provide real-time weather and forecast data in a clean, user-friendly interface.
- Ensure modular, reusable components with maintainable code and responsive design.
- Support dynamic visuals (backgrounds, dark mode) and interactive mapping for enhanced UX.

🏗️ Architecture
- Frontend: ReactJS application.
- Data Source: OpenWeatherMap API (Current Weather + Forecast).
- Communication: Axios or Fetch API for HTTP requests.
- Environment Variables: API keys stored securely in .env.
- Error Handling: Centralized in Api.js with graceful fallbacks.
- Routing: React Router for clean navigation across pages (Dashboard, API Docs, etc.).

⚙️ Technical Stack
- Framework: ReactJS (with JSX).
- Language: JavaScript (ES6+).
- Styling: TailwindCSS (utility-first, responsive design).
- API: OpenWeatherMap (REST endpoints).
- Mapping: Leaflet.js for interactive maps.
- Build Tools: Vite (fast dev + optimized builds).
- Version Control: Git + GitHub.

🧩 Components / Modular UI Pieces
| Component       | Responsibility | 
| WeatherCard.jsx | Displays current weather details (temperature, humidity, wind, AQI if extended).| 
| SearchBox.jsx   | Input field for city search, triggers API calls. | 
| ForecastList.jsx| Renders 5-day forecast cards in a scrollable list. | 
|  Navbar.jsx|    | Navigation bar with branding, theme toggle (light/dark mode).|
|  Dashboard.jsx  | Main weather dashboard view with dynamic backgrounds and Leaflet map integration. | 
|  Footer.jsx     | Simplified footer with Quick Links. | 
|  App.jsx        | Root component, manages global state and passes props to children.|



🔄 Data Flow & API Integration
- Api.js
- Fetches weather and forecast data from OpenWeatherMap.
- Handles network requests, retries, and error states.
- Formats raw API response into structured objects for components.
- Flow:
- User enters city in SearchBox.jsx.
- App.jsx updates city state.
- Api.js fetches data using the city name.
- Response stored in weatherData.
- WeatherCard.jsx, ForecastList.jsx, and Dashboard.jsx render data via props.
- Leaflet map updates location markers dynamically.

🗂️ State Management
- city → Stores user-entered city name.
- weatherData → Stores API response (current + forecast).
- isLoading → Boolean flag for fetch status.
- error → Stores error messages for failed requests.
- theme → Tracks light/dark mode preference.
- background → Dynamically changes based on weather conditions.

🎨 Styling & UX
- TailwindCSS for utility-first styling.
- Responsive layout for desktop, tablet, and mobile.
- Dark mode toggle integrated into Navbar.jsx.
- Animated/dynamic background based on weather conditions.
- Interactive Leaflet map for city visualization.
- Accessibility improvements (ARIA labels, keyboard navigation).

