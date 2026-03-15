import { motion } from 'framer-motion';
import { Calendar, Clock, Car, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Reservation() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would send data to Supabase
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-brand-dark">
          Réserver un <span className="brand-text-gradient">Lavage</span>
        </h1>
        <p className="text-lg text-gray-600">
          Choisissez votre prestation et votre créneau idéal.
        </p>
      </motion.div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-[2.5rem] text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Réservation Confirmée !</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Nous avons bien reçu votre demande. Vous recevrez un SMS de confirmation très prochainement.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 rounded-2xl brand-gradient text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Nouvelle réservation
          </button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-xl space-y-8"
        >
          {/* Service Selection */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Car className="text-brand-purple" /> Type de prestation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Lavage Intérieur', 'Lavage Extérieur', 'Lavage Complet', 'Pressing Sièges'].map((service) => (
                <label key={service} className="relative flex items-center p-4 cursor-pointer rounded-2xl border border-gray-200 hover:border-brand-purple transition-colors bg-white/50">
                  <input type="radio" name="service" className="w-5 h-5 text-brand-purple border-gray-300 focus:ring-brand-purple" required />
                  <span className="ml-3 font-medium text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-brand-purple" /> Date souhaitée
              </h3>
              <input 
                type="date" 
                required
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="text-brand-purple" /> Heure
              </h3>
              <input 
                type="time" 
                required
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
              />
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Vos coordonnées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Nom complet" 
                required
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
              />
              <input 
                type="tel" 
                placeholder="Numéro de téléphone" 
                required
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
              />
              <input 
                type="text" 
                placeholder="Modèle du véhicule (ex: Peugeot 208)" 
                required
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all md:col-span-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl brand-gradient text-white font-bold text-lg shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform"
          >
            Confirmer la réservation
          </button>
        </motion.form>
      )}
    </div>
  );
}
