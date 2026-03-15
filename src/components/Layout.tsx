import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Car, User, Calendar, Info, Phone, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: Car },
    { name: 'À Propos', path: '/about', icon: Info },
    { name: 'Réservation', path: '/reservation', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'Espace Client', path: '/client', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-lg shadow-brand-purple/30">
                <Car size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-brand-dark">RSCarWash</span>
                <span className="text-xs font-medium text-brand-purple tracking-widest uppercase">Nettoyage Auto</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-brand-purple relative ${
                      isActive ? 'text-brand-purple' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 brand-gradient rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/admin"
                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-brand-dark"
                title="Admin Panel"
              >
                <Shield size={20} />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-panel border-t border-white/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-brand-purple/10 text-brand-purple' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-500 hover:bg-gray-50"
              >
                <Shield size={20} />
                Administration
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white">
                  <Car size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight">RSCarWash</span>
              </div>
              <p className="text-gray-400 text-sm">
                L'excellence du nettoyage automobile. Perfection, douceur et brillance pour votre véhicule.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-blue" />
                  07.82.37.81.15
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-purple font-bold">Snap:</span> RScarwash34
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-purple font-bold">Insta:</span> RScarwash_34
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/reservation" className="hover:text-brand-blue transition-colors">Réserver un lavage</Link></li>
                <li><Link to="/client" className="hover:text-brand-blue transition-colors">Carte de fidélité</Link></li>
                <li><Link to="/about" className="hover:text-brand-blue transition-colors">À propos de nous</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RSCarWash34. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
