import { motion } from 'framer-motion';
import { ShieldCheck, Star, Clock, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-brand-dark">
          À Propos de <span className="brand-text-gradient">RSCarWash</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Votre partenaire de confiance pour l'entretien esthétique de votre véhicule.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden brand-gradient p-1">
            <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80" 
                alt="Car Wash Detail" 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-3xl shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white">
                <Star size={24} />
              </div>
              <div>
                <p className="font-bold text-xl">100%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold">Notre Passion, Votre Brillance</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Chez RSCarWash, nous ne faisons pas que laver des voitures, nous leur redonnons vie. 
            Notre équipe de passionnés utilise les meilleurs produits et techniques pour garantir 
            un résultat impeccable, à l'intérieur comme à l'extérieur.
          </p>
          
          <div className="space-y-6">
            {[
              { icon: ShieldCheck, title: "Qualité Premium", desc: "Produits haut de gamme respectueux de votre carrosserie." },
              { icon: Clock, title: "Rapidité & Efficacité", desc: "Un service ponctuel sans compromis sur la qualité." },
              { icon: MapPin, title: "Proximité", desc: "Situé idéalement pour vous servir rapidement." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
