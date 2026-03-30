import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CarCanvasStage from '../components/CarCanvasStage';
import BrandLogo from '../components/BrandLogo';

const proofChips = ['Finition prête pour les réseaux', 'Effet wow immédiat', 'Service mobile à Montpellier'];

const statCards = [
  { value: '48h', label: 'effet propre qui marque dès le premier regard' },
  { value: '5★', label: 'présentation premium pensée pour impressionner' },
  { value: '100%', label: 'focus détail, contraste, éclat et présence' },
];

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  useMotionValueEvent(scrollYProgress, 'change', (latest) => setScrollProgressValue(latest));

  const bienvenueOpacity = useTransform(introProgress, [0, 0.55, 1], [1, 0.7, 0]);
  const bienvenueScale = useTransform(introProgress, [0, 1], [1, 1.35]);
  const bienvenueY = useTransform(introProgress, [0, 1], [0, -90]);
  const heroRevealY = useTransform(introProgress, [0.72, 1], [180, 0]);
  const heroRevealScale = useTransform(introProgress, [0.72, 1], [0.9, 1]);
  const heroRevealOpacity = useTransform(introProgress, [0.72, 1], [0.35, 1]);
  const heroTextY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.92], [1, 0.24]);
  const heroStageY = useTransform(smoothProgress, [0, 1], [0, 110]);
  const stageGlowOpacity = useTransform(smoothProgress, [0, 0.35, 1], [0.25, 0.75, 0.35]);
  const stageGlowScale = useTransform(smoothProgress, [0, 1], [0.88, 1.15]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="maximal-shell relative w-full overflow-hidden">
      <section
        ref={introRef}
        className="relative flex min-h-[108svh] items-center justify-center overflow-hidden px-4 py-12 sm:min-h-[104svh]"
      >
        <div className="pulse-orb left-[8%] top-[20%] h-52 w-52 bg-brand-blue/25" />
        <div className="pulse-orb right-[8%] bottom-[18%] h-52 w-52 bg-brand-coral/25" />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="text-plate mx-auto mb-4 w-fit text-sm font-black uppercase tracking-[0.34em] text-brand-blue">
            RScarwash
          </div>
          <div className="relative mb-6 h-[22rem] w-full max-w-[32rem] sm:h-[28rem] sm:max-w-[40rem] lg:h-[32rem] lg:max-w-[48rem]">
            <CarCanvasStage modelScale={1.35} autoSpin />
          </div>
          <motion.div style={{ opacity: bienvenueOpacity, scale: bienvenueScale, y: bienvenueY }} className="text-center">
            <h1 className="text-[4.2rem] font-black uppercase leading-[0.88] tracking-[-0.07em] text-white sm:text-[6.6rem] lg:text-[9rem]">
              Bienvenue
            </h1>
            <p className="text-plate mt-4 max-w-2xl text-base font-semibold leading-7 text-white/86 sm:text-lg">
              RSCarwash, équipe à votre service H24 7/7.
            </p>
          </motion.div>
        </div>
      </section>

      <motion.section
        ref={heroRef}
        style={{ y: heroRevealY, scale: heroRevealScale, opacity: heroRevealOpacity }}
        className="relative isolate -mt-12 flex min-h-[210svh] items-start overflow-hidden px-4 pb-30 pt-10 will-change-transform sm:-mt-16 sm:min-h-[190svh] sm:px-6 sm:pb-36 sm:pt-12 lg:min-h-[165svh] lg:px-8 lg:pb-28"
      >
        <div className="hero-grid-lines absolute inset-0 opacity-35" />
        <div className="pulse-orb left-[-4rem] top-28 h-40 w-40 bg-brand-coral/35 sm:h-56 sm:w-56" />
        <div className="pulse-orb right-[-2rem] top-16 h-48 w-48 bg-brand-blue/30 sm:h-64 sm:w-64" />
        <div className="pulse-orb bottom-28 left-1/3 h-44 w-44 bg-brand-purple/30 sm:h-72 sm:w-72" />
        <div className="flash-column top-0 left-[8%]" />
        <div className="flash-column left-auto right-[4%] hidden sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_32%),linear-gradient(180deg,rgba(8,11,24,0.15),rgba(8,11,24,0.72)_70%,rgba(8,11,24,0.92))]" />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 py-16 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-10 lg:py-20"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-plate glow-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-white sm:text-sm"
            >
              <Zap size={16} className="text-brand-gold" />
              Une landing page plus audacieuse, moins minimaliste
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <p className="text-plate w-fit text-sm font-semibold uppercase tracking-[0.34em] text-brand-blue sm:text-base">
                  Montpellier · service mobile · impact visuel total
                </p>
                <h1 className="max-w-3xl text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[4.5rem] lg:text-[6.4rem]">
                  Votre voiture
                  <span className="hero-shimmer mt-2 block bg-[linear-gradient(120deg,#ffffff_10%,#ffd166_35%,#87ceeb_60%,#ff6b6b_85%)] bg-clip-text text-transparent">
                    doit entrer
                  </span>
                  <span className="block text-white/85">en scène.</span>
                </h1>
              </div>

              <p className="text-plate max-w-2xl text-base leading-7 text-white/88 sm:text-lg sm:leading-8 lg:text-xl">
                RS Carwash abandonne le discret. On mise sur une présentation plus spectaculaire, des contrastes
                forts, un intérieur net, des reflets profonds et une première impression qui frappe dès le premier
                scroll, surtout sur mobile.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/reservation"
                  className="kinetic-border inline-flex items-center justify-center gap-2 rounded-[1.8rem] bg-white px-6 py-4 text-base font-black text-brand-night transition-transform duration-300 hover:scale-[1.03] sm:text-lg"
                >
                  Réserver maintenant
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-[1.8rem] border border-white/20 bg-white/8 px-6 py-4 text-base font-extrabold text-white transition-colors hover:bg-white/14 sm:text-lg"
                >
                  Parler du projet visuel
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {proofChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/82"
                  >
                    <CheckCircle2 size={16} className="text-brand-gold" />
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {statCards.map((item) => (
                <div key={item.value} className="neon-card rounded-[1.9rem] p-4 text-white">
                  <div className="mb-2 text-3xl font-black text-brand-gold">{item.value}</div>
                  <p className="text-sm leading-6 text-white/72">{item.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="mt-8 overflow-hidden rounded-full border border-white/12 bg-white/8 p-1">
              <motion.div style={{ width: progressWidth }} className="h-2 rounded-full bg-[linear-gradient(90deg,#FFD166,#87CEEB,#FF6B6B)]" />
            </div>
          </div>

          <motion.div
            style={{ y: heroStageY }}
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative min-h-[48rem] sm:min-h-[54rem] lg:sticky lg:top-28 lg:min-h-[58rem] lg:self-start"
          >
            <div className="neon-card kinetic-border relative h-full overflow-hidden rounded-[2.4rem] p-4 sm:p-6">
              <motion.div
                style={{ opacity: stageGlowOpacity, scale: stageGlowScale }}
                className="pointer-events-none absolute left-1/2 top-[34%] z-0 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-brand-blue/25 blur-3xl sm:h-[24rem] sm:w-[24rem]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,209,102,0.22),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(255,107,107,0.18),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <BrandLogo size="lg" className="text-white" />
                <div className="text-plate rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-3 text-right text-white">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/55">Mode scène</div>
                  <div className="text-base font-black sm:text-lg">Identité lavage premium</div>
                </div>
              </div>

              <div className="relative mt-7 h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(135,206,235,0.2),_transparent_36%),linear-gradient(180deg,#111735_0%,#090b19_100%)] sm:h-[33rem]">
                <div className="hero-laser left-[10%] top-[24%]" />
                <div className="hero-laser hero-laser-delay right-[8%] top-[58%]" />
                <div className="hero-laser hero-laser-slow left-[18%] bottom-[20%]" />
                <div className="stage-ring absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/16" />
                <div className="stage-ring-reverse absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
                <CarCanvasStage
                  scrollProgress={scrollProgressValue}
                  modelScale={0.8}
                  interactive
                  spinOnScroll
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(9,11,25,0.88))]" />
              </div>

              <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.6rem] bg-white px-4 py-4 text-brand-night">
                  <div className="mb-1 text-xs font-black uppercase tracking-[0.3em] text-brand-purple">Impact sur mobile</div>
                  <p className="text-lg font-black leading-tight">
                    Gros titres, couches lumineuses, animation continue et sensation premium dès le premier écran.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 px-4 py-4 text-white">
                  <div className="mb-2 flex items-center gap-2 text-brand-blue">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">Expérience</p>
                  <p className="text-lg font-black">Plus démonstratif qu’un simple site vitrine</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="relative z-10 px-4 pb-18 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.4rem] bg-brand-night p-6 text-white shadow-[0_26px_80px_rgba(5,10,25,0.18)] sm:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-blue">Prestations premium</p>
            <h3 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">
              Une remise en etat qui se voit des le premier regard.
            </h3>
            <p className="mt-5 text-base leading-7 text-white/74">
              Interieur detaille, exterieur soigne, finitions propres et presentation nette. Chaque passage est pense
              pour redonner presence, contraste et sensation premium a votre vehicule.
            </p>

            <div className="mt-8 space-y-3">
              {[
                'Lavage interieur minutieux avec plastiques, textiles et vitres repris en detail',
                'Exterieur impact visuel avec jantes, contours, sechage propre et finition nette',
                'Intervention mobile ou sur rendez-vous avec une presentation soignee jusqu au dernier detail',
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 text-brand-gold" size={18} />
                  <span className="text-sm leading-6 text-white/82 sm:text-base">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: TimerReset,
                title: 'Service rapide',
                text: 'Des créneaux pensés pour remettre votre véhicule en valeur sans immobilisation inutile.',
              },
              {
                icon: Sparkles,
                title: 'Finition visuelle forte',
                text: 'Brillance, contraste, surfaces propres et rendu net pour une vraie impression premium.',
              },
              {
                icon: ShieldCheck,
                title: 'Protection et tenue',
                text: 'Des produits soigneusement choisis pour respecter les surfaces et prolonger la proprete.',
              },
              {
                icon: Droplets,
                title: 'Lavage interieur et exterieur',
                text: 'Une prise en charge complete pour retrouver un habitacle net et une carrosserie qui ressort.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#090b19,#6B5B95)] text-white">
                  <item.icon size={26} />
                </div>
                <h4 className="text-xl font-black text-brand-night">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
