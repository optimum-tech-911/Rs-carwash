import { motion } from 'framer-motion';
import { ShieldCheck, Star, Clock, MapPin } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import CarCanvasStage from '../components/CarCanvasStage';

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-[56svh] items-center overflow-hidden px-4 pb-4 pt-0 sm:min-h-[62svh] sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-[6%] bottom-[20%]">
          <CarCanvasStage modelScale={0.8} autoSpin />
        </div>
        <div className="relative z-20 mx-auto max-w-4xl text-center">
          <div className="text-plate mx-auto mb-4 w-fit text-sm font-black uppercase tracking-[0.32em] text-brand-blue">
            À propos
          </div>
          <div className="h-[7rem] sm:h-[8rem]" />
          <h1 className="text-plate text-[2.8rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[4.5rem]">
            RSCarwash
            <span className="block text-white/86">le soin, la présence,</span>
            <span className="block text-brand-gold">la finition.</span>
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-plate mx-auto mb-4 w-fit px-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            À Propos de <span className="brand-text-gradient">RSCarWash</span>
          </h2>
          <p className="text-plate mx-auto max-w-2xl px-6 text-lg text-white/82">
            Votre partenaire de confiance pour l&apos;entretien esthétique de votre véhicule.
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
            <div className="media-card rounded-[3rem] p-4">
              <div className="grid aspect-square grid-cols-[1.2fr_0.8fr] gap-4 overflow-hidden rounded-[2.5rem] bg-white p-4">
                <div className="overflow-hidden rounded-[2rem]">
                  <img
                    src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200"
                    alt="Car Wash Detail"
                    className="h-full w-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="glass-panel flex-1 rounded-[2rem] p-4">
                    <BrandLogo size="lg" className="mb-4 text-brand-dark" />
                    <p className="rounded-[1.4rem] bg-slate-900/16 px-4 py-3 text-sm leading-relaxed text-slate-800">
                      Une image de marque forte, un service propre et une attention visible dans chaque finition.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-[2rem]">
                    <img
                      src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=900"
                      alt="Automotive Interior"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white">
                  <Star size={24} />
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-900">100%</p>
                  <p className="text-sm text-slate-600">Satisfaction</p>
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
            <h2 className="text-plate w-fit px-5 text-3xl font-bold text-white">Notre Passion, Votre Brillance</h2>
            <p className="text-plate px-5 text-lg leading-relaxed text-white/86">
              Chez RSCarWash, nous ne faisons pas que laver des voitures, nous leur redonnons vie. Notre approche
              mélange présentation visuelle, nettoyage minutieux et finition élégante pour que chaque véhicule reparte
              avec une vraie signature.
            </p>

            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: 'Qualité Premium', desc: 'Produits haut de gamme respectueux de votre carrosserie.' },
                { icon: Clock, title: 'Rapidité & Efficacité', desc: 'Un service ponctuel sans compromis sur la qualité.' },
                { icon: MapPin, title: 'Proximité', desc: 'Situé idéalement pour vous servir rapidement.' },
              ].map((item, i) => (
                <div key={i} className="text-plate flex items-start gap-4 rounded-[1.8rem] px-5 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-white/78">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
