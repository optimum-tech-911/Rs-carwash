import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CarModel from '../components/CarModel';
import { ArrowRight, Sparkles, Droplets, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 3D Canvas Background - Absolute to stay only in hero section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Suspense fallback={null}>
              <CarModel scrollProgress={progress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Overlay */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="relative z-10 text-center max-w-3xl mx-auto glass-panel p-12 rounded-[2.5rem] shadow-2xl mt-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple font-semibold mb-6"
          >
            <Sparkles size={18} />
            <span>Lavage Auto Premium</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-brand-dark">
            L'excellence pour <br />
            <span className="brand-text-gradient">votre véhicule</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Un nettoyage minutieux, intérieur et extérieur, pour redonner à votre voiture son éclat d'origine. Perfection et douceur garanties.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/reservation" 
              className="px-8 py-4 rounded-2xl brand-gradient text-white font-bold text-lg shadow-lg shadow-brand-purple/30 hover:scale-105 transition-transform flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Réserver maintenant
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/client" 
              className="px-8 py-4 rounded-2xl bg-white text-brand-dark font-bold text-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-100 w-full sm:w-auto justify-center text-center"
            >
              Espace Fidélité
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 min-h-screen flex items-center py-24 bg-white/80 backdrop-blur-xl border-t border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une attention particulière portée à chaque détail de votre véhicule.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Droplets,
                title: "Lavage Extérieur",
                desc: "Mousse active, nettoyage jantes, séchage microfibre et finition brillante."
              },
              {
                icon: Sparkles,
                title: "Nettoyage Intérieur",
                desc: "Aspiration en profondeur, plastiques, vitres et pressing des sièges."
              },
              {
                icon: ShieldCheck,
                title: "Protection Céramique",
                desc: "Traitement longue durée pour protéger votre carrosserie des agressions."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-blue/20">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
