export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Weather Pro</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Your trusted source for accurate weather forecasts and real-time meteorological data worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Current Weather</a></li>
              <li><a href="#" className="hover:text-white transition-colors">5-Day Forecast</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Weather Maps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Weather Pro · Built with ❤️ by <span className="text-white/90 font-medium">Nilesh Chouksey</span>
          </p>
          <p className="text-xs text-white/50 mt-2">
            Powered by OpenWeatherMap API
          </p>
        </div>
      </div>
    </footer>
  );
}
