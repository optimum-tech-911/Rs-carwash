import { motion } from 'framer-motion';
import { User, Star, Award, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function ClientSpace() {
  // Mock data for demonstration
  const [user] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    washes: 3, // Current number of washes
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-80 space-y-6"
        >
          <div className="glass-panel p-8 rounded-[2.5rem] text-center shadow-lg">
            <div className="w-24 h-24 rounded-full brand-gradient mx-auto mb-4 flex items-center justify-center text-white shadow-lg">
              <User size={40} />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            <button className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>

          <div className="glass-panel p-6 rounded-3xl shadow-md">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Star className="text-brand-purple" size={20} />
              Statut
            </h3>
            <div className="flex justify-between items-center bg-brand-purple/5 p-4 rounded-2xl">
              <span className="text-gray-600 font-medium">Lavages restants</span>
              <span className="text-2xl font-bold text-brand-purple">{5 - user.washes}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Loyalty Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <div className="glass-panel p-8 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 brand-text-gradient">
                  Carte de Fidélité
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  Pour votre fidélité, votre 6ème prestation est offerte !!!
                </p>
              </div>

              {/* Loyalty Circles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto mt-16">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner transition-all duration-500 ${
                      user.washes >= num 
                        ? 'brand-gradient text-white shadow-brand-purple/40 scale-110' 
                        : 'bg-white border-4 border-gray-100 text-gray-300'
                    }`}>
                      {user.washes >= num ? <CheckCircleIcon /> : num}
                    </div>
                  </div>
                ))}
                
                {/* 6th Free Wash Circle */}
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-center shadow-lg transition-all duration-500 ${
                    user.washes >= 5 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white scale-110 animate-pulse' 
                      : 'bg-white border-4 border-brand-purple/30 text-brand-purple'
                  }`}>
                    {user.washes >= 5 ? (
                      <Award size={40} />
                    ) : (
                      <span className="font-bold text-sm leading-tight px-2">lavage<br/>offert</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-16 max-w-2xl mx-auto">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                  <span>Progression</span>
                  <span>{user.washes} / 5 lavages</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.washes / 5) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full brand-gradient rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
