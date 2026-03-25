import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Car, User, Calendar, Info, Phone, Shield, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from './BrandLogo';

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
    <div className="site-shell min-h-screen flex flex-col">
      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 px-1">
        <div className="floating-island rounded-[2rem] px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="min-w-0">
              <BrandLogo
                size="md"
                className="gap-2.5 text-white"
                imageClassName="rounded-[1.2rem] border border-white/10 bg-white/90 p-1"
                textClassName="min-w-0"
              />
            </Link>

            <nav className="hidden items-center gap-2 rounded-full bg-white/10 p-1.5 md:flex">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`island-link relative px-4 py-2 text-sm font-semibold transition-all ${
                      isActive ? 'bg-white text-brand-dark shadow-lg' : 'text-white/72 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full border border-white/60"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/admin"
                className="rounded-full border border-white/10 bg-white/10 p-3 text-white/70 transition-colors hover:text-white"
                title="Admin Panel"
              >
                <Shield size={20} />
              </Link>
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-brand-dark transition-transform hover:scale-[1.02]"
              >
                Réserver
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <button
              className="rounded-full border border-white/10 bg-white/10 p-3 text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 md:hidden"
          >
            <div className="floating-island space-y-2 rounded-[2rem] p-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-white text-brand-dark' : 'text-white/80 hover:bg-white/10'
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
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-white/70 hover:bg-white/10"
              >
                <Shield size={20} />
                Administration
              </Link>
              <Link
                to="/reservation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-brand-dark"
              >
                Réserver
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow pt-32">
        <Outlet />
      </main>

      <footer className="relative overflow-hidden border-t border-white/30 bg-brand-dark py-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(135,206,235,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(107,91,149,0.28),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-6">
                <BrandLogo
                  size="lg"
                  className="text-white"
                  imageClassName="rounded-[1.6rem] border border-white/10 bg-white/90 p-1"
                />
              </div>
              <p className="text-sm text-gray-400">
                Nettoyage automobile intérieur premium, avec une présentation soignée, des finitions nettes et une vraie obsession du détail.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-blue" />
                  07.82.37.81.15
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-brand-purple">Snap:</span> RScarwash34
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-brand-purple">Insta:</span> RScarwash_34
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Liens Rapides</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/reservation" className="transition-colors hover:text-brand-blue">Réserver un lavage</Link></li>
                <li><Link to="/client" className="transition-colors hover:text-brand-blue">Carte de fidélité</Link></li>
                <li><Link to="/about" className="transition-colors hover:text-brand-blue">À propos de nous</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RSCarWash34. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
