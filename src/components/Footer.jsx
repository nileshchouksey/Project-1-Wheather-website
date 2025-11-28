import { useState } from "react";

export default function Footer({ onNavigate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <footer className="w-full mt-auto border-t border-white/10 dark:border-gray-700 
      bg-white/5 dark:bg-gray-900 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          
          {/* Branding */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white dark:text-gray-100">Weather Pro</h3>
            <p className="text-sm text-white/70 dark:text-gray-400 leading-relaxed">
              Your trusted source for accurate weather forecasts and real-time meteorological data worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70 dark:text-gray-400">
              <li>
                <button onClick={() => onNavigate("current")} 
                  className="hover:text-white dark:hover:text-gray-200">
                  Current Weather
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("hourly")} 
                  className="hover:text-white dark:hover:text-gray-200">
                  24-Hour Forecast
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("forecast")} 
                  className="hover:text-white dark:hover:text-gray-200">
                  5-Day Forecast
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("maps")} 
                  className="hover:text-white dark:hover:text-gray-200">
                  Weather Maps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("api-docs")} 
                  className="hover:text-white dark:hover:text-gray-200">
                  API Documentation
                </button>
              </li>
            </ul>
          </div>
       
          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white dark:text-gray-100">Connect</h3>
            <ul className="space-y-2 text-sm text-white/70 dark:text-gray-400">
              <li>
                <a
                  href="https://github.com/nileshchouksey/Project-1-Wheather-website"
                  className="hover:text-white dark:hover:text-gray-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/weatherpro" className="hover:text-white dark:hover:text-gray-200">Twitter</a>
              </li>

              {/* Contact Us dropdown */}
              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Contact Us
                </button>

                {showDropdown && (
                  <ul className="absolute left-0 mt-2 bg-white/10 dark:bg-gray-800 
                    backdrop-blur-md rounded-lg shadow-lg p-2 space-y-2 text-sm 
                    text-white dark:text-gray-200">
                    <li>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=support@weatherpro.com&su=Weather%20Dashboard%20Feedback&body=Hello%20Weather%20Pro%20Team..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-cyan-300"
                      >
                        Gmail
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://outlook.office.com/mail/deeplink/compose?to=support@weatherpro.com&subject=Weather%20Dashboard%20Feedback&body=Hello%20Weather%20Pro%20Team..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-cyan-300"
                      >
                        Outlook
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-6 border-t border-white/10 dark:border-gray-700 text-center">
          <p className="text-sm text-white/60 dark:text-gray-400">
            © {new Date().getFullYear()} Weather Pro · Built with ❤️ by{" "}
            <span className="text-white/90 dark:text-gray-200 font-medium">Nilesh Chouksey</span>
          </p>
          <p className="text-xs text-white/50 dark:text-gray-500 mt-2">
            Powered by OpenWeatherMap API
          </p>
        </div>
      </div>
    </footer>
  );
}
