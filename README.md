Weather Pro - Real-time Weather Forecast

A modern, professional weather application built with React and Tailwind CSS. Get accurate weather forecasts with real-time data, hourly forecasts, 5-day predictions, and interactive maps for any city worldwide.
🌐 Live Demo
Check out the deployed project here:  
👉 [https://weatherpro11.vercel.app/]

## ✨ Features

- 🔍 **Search by City** - Search weather for any city worldwide
- 🌡️ **Current Weather** - Real-time weather conditions with detailed metrics
- ⏰ **24-Hour Forecast** - Extended hourly weather predictions
- 📅 **5-Day Forecast** - Complete weather outlook for the week
- 🗺️ **Interactive Maps** - Visualize specified location on maps
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast & Optimized** - Built with Vite for optimal performance
- 🎨 **Modern UI** - Beautiful design with smooth background changes
- 🔒 **Error Handling** - Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 7** - Next-generation frontend tooling
- **Axios** - HTTP client for API calls
- **React Leaflet** - Interactive maps
- **OpenWeatherMap API** - Weather data source

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** (or pnpm/yarn)
- **OpenWeatherMap API Key** - [Get it free here](https://openweathermap.org/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd  Project-1-Wheather-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   
   > 💡 Copy `.env.example` to `.env` and add your API key

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 📦 Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory with:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Removed console logs and debuggers
- Optimized assets

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally at `http://localhost:4173`

## 🚢 Deployment

### Deployment Platforms

#### **Vercel** (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable:
   - `VITE_WEATHER_API_KEY` = your API key
4. Deploy!

#### **Netlify**

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable:
   - `VITE_WEATHER_API_KEY` = your API key
5. Deploy!

#### **GitHub Pages**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

#### **Traditional Hosting (Apache/Nginx)**

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder contents to your web server

3. Configure your server to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable gzip compression
   - Set proper cache headers

**Nginx Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/weather-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Environment Variables for Deployment

Make sure to set `VITE_WEATHER_API_KEY` in your deployment platform's environment variables section.

## 📁 Project Structure

```
weather-app/
├── public/                 # Static assets
├── src/
│   ├── components/ 
        |     DashBoard.jsx       # React components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer component
│   │   ├── SearchBox.jsx    # City search input
│   │   ├── WeatherCard.jsx # Current weather display
│   │   ├── HourlyForecast.jsx # 24-hour forecast
│   │   ├── ForecastList.jsx # 5-day forecast
│   │   └── MapView.jsx     # Interactive map
│   ├── api.js              # API integration
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.cjs     # Tailwind configuration
└── README.md               # This file
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run clean` - Remove dist directory

## 🔧 Configuration

### API Configuration

The app uses OpenWeatherMap API. Make sure to:
1. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Set it in `.env` file as `VITE_WEATHER_API_KEY`
3. For production, set it in your deployment platform's environment variables

### Build Optimization

The project is configured with:
- **Code splitting** - Separate chunks for React and Leaflet
- **Minification** - Terser for optimal bundle size
- **Tree shaking** - Unused code elimination
- **Asset optimization** - Optimized images and fonts

## 🐛 Troubleshooting

### API Key Issues

- Ensure `VITE_WEATHER_API_KEY` is set correctly
- Check that the API key is valid and active
- Verify the key has necessary permissions

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `npm run clean && npm run build`
- Check Node.js version: `node --version` (should be 18+)

### Map Not Loading

- Ensure Leaflet CSS is imported (already in `main.jsx`)
- Check browser console for CORS errors
- Verify internet connection
