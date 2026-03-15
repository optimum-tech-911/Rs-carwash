import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-brand-dark">
          Contactez <span className="brand-text-gradient">Nous</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Une question ? Besoin d'un devis spécifique ? N'hésitez pas à nous contacter.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
              <Phone size={28} />
            </div>
            <h3 className="font-bold text-lg mb-2">Téléphone / WhatsApp</h3>
            <p className="text-gray-600 font-medium">07.82.37.81.15</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
              <Mail size={28} />
            </div>
            <h3 className="font-bold text-lg mb-2">Réseaux Sociaux</h3>
            <p className="text-gray-600 font-medium">Snap: RScarwash34</p>
            <p className="text-gray-600 font-medium">Insta: RScarwash_34</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
              <MapPin size={28} />
            </div>
            <h3 className="font-bold text-lg mb-2">Localisation</h3>
            <p className="text-gray-600 font-medium">Montpellier et alentours (34)</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <form className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
              <input 
                type="text" 
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all"
                placeholder="Comment pouvons-nous vous aider ?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none bg-white/50 transition-all resize-none"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full py-4 rounded-2xl brand-gradient text-white font-bold text-lg shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Envoyer le message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
