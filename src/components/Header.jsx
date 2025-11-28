import logo from "../assets/LOGO1.svg";
import { useState, useEffect } from "react";

export default function Header({ onNavigate, onLogoClick }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="w-full backdrop-blur-md bg-white/5 dark:bg-gray-900 
      border-b border-white/10 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 
              rounded-xl flex items-center justify-center shadow-lg transform 
              transition-transform group-hover:scale-110 group-hover:rotate-12">
              <img src={logo} alt="Weather Pro Logo" className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold 
                bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent 
                dark:from-gray-100 dark:to-gray-400">
                Weather Pro
              </h1>
              <p className="text-xs text-white/60 dark:text-gray-400 hidden sm:block">
                Real-time forecasts
              </p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-4">
            {["home", "forecast", "maps", "about"].map((section, idx) => (
              <button
                key={idx}
                onClick={(e) => handleNavClick(e, section)}
                className="px-3 py-2 text-sm font-medium 
                  text-white/90 dark:text-gray-200 
                  hover:text-white dark:hover:text-gray-100 
                  hover:bg-white/10 dark:hover:bg-gray-700 
                  rounded-lg transition-all duration-200 
                  hidden sm:inline-block"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-3 py-1 rounded 
              bg-white/10 dark:bg-gray-700 
              hover:bg-white/20 dark:hover:bg-gray-600 
              text-white dark:text-gray-200 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}