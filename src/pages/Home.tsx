import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CarModel from '../components/CarModel';
import { ArrowRight, Sparkles, Droplets, ShieldCheck, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import logo from '../assets/rscarwash-logo.png';

const serviceCards = [
  {
    icon: Droplets,
    title: 'Lavage Extérieur',
    desc: 'Mousse active, jantes, séchage microfibre et rendu brillant sans traces.',
    image:
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: Sparkles,
    title: 'Nettoyage Intérieur',
    desc: 'Aspiration détaillée, plastiques, tissus, vitres et finitions propres.',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: ShieldCheck,
    title: 'Protection Premium',
    desc: 'Des finitions longue tenue pour garder une voiture plus nette plus longtemps.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress ONLY within the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative w-full">
      <section ref={heroRef} className="relative flex min-h-[150svh] items-center overflow-hidden px-4 py-14 sm:min-h-screen sm:px-6 sm:py-0 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(255,255,255,0.35)_30%,_transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(107,91,149,0.22),_transparent_35%),radial-gradient(circle_at_70%_25%,_rgba(135,206,235,0.26),_transparent_25%)]" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Suspense fallback={null}>
              <CarModel scrollProgress={progress} />
            </Suspense>
          </Canvas>
        </div>

        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 py-16 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="glass-panel relative overflow-hidden rounded-[2.2rem] p-6 shadow-2xl sm:rounded-[2.7rem] sm:p-12">
            <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-purple/15 blur-3xl" />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-purple/10 px-4 py-2 font-semibold text-brand-purple">
                <Sparkles size={18} />
                <span>Automotive Interior Cleaning</span>
              </div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:text-7xl">
                L&apos;image de votre voiture
                <span className="mt-2 block brand-text-gradient">mérite une finition signature.</span>
              </h1>
              <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
                RS Carwash sublime l&apos;intérieur de votre véhicule avec une présentation haut de gamme, des gestes précis et un rendu qui se remarque dès le premier regard.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/reservation"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl brand-gradient px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-purple/30 transition-transform hover:scale-105 sm:w-auto"
                >
                  Réserver maintenant
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/client"
                  className="w-full rounded-2xl border border-gray-100 bg-white px-8 py-4 text-center text-lg font-bold text-brand-dark shadow-md transition-colors hover:bg-gray-50 sm:w-auto"
                >
                  Espace Fidélité
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
                  <CheckCircle2 size={16} className="text-brand-purple" />
                  Détail intérieur
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
                  <CheckCircle2 size={16} className="text-brand-purple" />
                  Finition premium
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
                  <CheckCircle2 size={16} className="text-brand-purple" />
                  Rendu photographique
                </span>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 pb-20 sm:pb-10 lg:pb-0">
            <div className="relative mx-auto max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="media-card overflow-hidden rounded-[2rem] p-3 sm:rounded-[2.5rem] sm:p-5"
              >
                <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.88),rgba(255,255,255,0.45))]" />
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <BrandLogo size="md" className="text-brand-dark sm:hidden" />
                    <BrandLogo size="lg" className="hidden text-brand-dark sm:flex" />
                    <div className="w-fit self-start rounded-[1.4rem] bg-brand-dark px-4 py-3 text-left text-white shadow-xl sm:rounded-[1.6rem] sm:text-right">
                      <div className="text-xs uppercase tracking-[0.28em] text-white/60">Montpellier</div>
                      <div className="text-lg font-bold">Detailing mobile</div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[1.6rem] bg-white/80 p-3 sm:rounded-[2rem] sm:p-4">
                    <img
                      src={logo}
                      alt="Logo RS Carwash"
                      className="mx-auto h-[17rem] w-full rounded-[1.3rem] object-contain sm:h-[22rem] sm:rounded-[1.6rem]"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute -bottom-2 left-1/2 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-[1.7rem] bg-brand-dark px-4 py-4 text-white shadow-2xl sm:-bottom-6 sm:left-0 sm:w-auto sm:translate-x-0 sm:px-5"
              >
                <div className="mb-1 flex items-center gap-2 text-brand-blue">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm font-medium text-white/70">Présentation premium</p>
                <p className="text-lg font-bold sm:text-xl">Intérieur impeccable</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 border-t border-white/40 bg-white/70 py-24 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold">Nos Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Une direction visuelle plus forte, des surfaces riches et un service pensé dans les moindres détails.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {serviceCards.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="media-card group overflow-hidden rounded-[2rem] p-3 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-white">
                  <div className="absolute inset-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,21,40,0.15),rgba(20,21,40,0.82))]" />
                  </div>
                  <div className="relative flex h-full min-h-[23rem] flex-col justify-end p-6 text-white">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient shadow-lg shadow-brand-blue/20">
                      <feature.icon size={28} />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                    <p className="leading-relaxed text-white/80">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
