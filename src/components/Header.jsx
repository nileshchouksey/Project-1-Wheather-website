export default function Header({ onNavigate, onLogoClick }) {
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
    <header className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <span className="text-2xl">🌤️</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Weather Pro
              </h1>
              <p className="text-xs text-white/60 hidden sm:block">Real-time forecasts</p>
            </div>
          </button>
          <nav className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={(e) => handleNavClick(e, 'home')}
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'forecast')}
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:inline-block"
            >
              Forecast
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'maps')}
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:inline-block"
            >
              Maps
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
