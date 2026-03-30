import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
        <div className="hidden md:block">
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
                  title="Panneau d’administration"
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
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
            className={`dynamic-island-apple mx-auto ${isMobileMenuOpen ? 'dynamic-island-apple-open w-[calc(100vw-1.25rem)] max-w-[24rem]' : 'w-[14.25rem]'} overflow-hidden`}
          >
            <div className="island-flash" />
            <motion.div layout className="px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <Link to="/" className="dynamic-island-slot flex min-w-0 items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <BrandLogo
                    size="sm"
                    showWordmark={false}
                    className="text-white"
                    imageClassName="rounded-full border border-white/10 bg-white/90 p-0.5"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-[0.62rem] font-black uppercase tracking-[0.24em] text-white/48">RS Carwash</div>
                    <div className="truncate text-sm font-bold text-white">Navigation</div>
                  </div>
                </Link>

                <button
                  className="dynamic-island-trigger shrink-0"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {isMobileMenuOpen && (
                <motion.div
                  key="apple-mobile-menu"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, opacity: { duration: 0.16 } }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3">
                    <div className="dynamic-island-open-panel relative overflow-hidden rounded-[1.8rem] px-3 py-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="rounded-full bg-white/8 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.28em] text-white/55">
                          Menu principal
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="dynamic-island-close"
                          aria-label="Fermer le menu"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="dynamic-island-float-grid">
                        {navLinks.map((link, index) => {
                          const isActive = location.pathname === link.path;
                          return (
                            <motion.div
                              key={link.path}
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.22, delay: index * 0.04 }}
                            >
                              <Link
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`dynamic-island-link dynamic-island-link-float ${
                                  isActive ? 'bg-white text-brand-dark' : 'bg-white/10 text-white hover:bg-white/14'
                                }`}
                              >
                                <link.icon size={18} />
                                {link.name}
                              </Link>
                            </motion.div>
                          );
                        })}

                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.22, delay: 0.22 }}
                        >
                          <Link
                            to="/admin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="dynamic-island-link dynamic-island-link-float bg-white/8 text-white/80 hover:bg-white/12"
                          >
                            <Shield size={18} />
                            Administration
                          </Link>
                        </motion.div>
                      </div>

                      <Link
                        to="/reservation"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-3 flex items-center justify-center gap-2 rounded-[1.25rem] bg-white px-4 py-3 text-base font-black text-brand-dark shadow-[0_14px_30px_rgba(255,255,255,0.14)]"
                      >
                        Réserver
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
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
