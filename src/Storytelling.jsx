import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Search,
  Smartphone,
  MessageCircle,
  Navigation,
  KeyRound,
  Quote,
  Star,
  XCircle,
  CheckCircle2,
} from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    tag: 'Chapitre 1',
    time: 'Lundi, 16h30 — Cotonou',
    icon: Search,
    color: 'from-rose-500 to-orange-500',
    image: '/story/chapitre-1-recherche.jpg',
    title: 'Aïcha vient de décrocher son premier emploi à Cotonou…',
    text: 'Mais il lui faut un logement avant le début du mois. Elle a déjà payé trois démarcheurs pour des visites : un appartement déjà loué, un autre introuvable, un troisième qui ne ressemblait pas du tout aux photos. Fatiguée, elle sort son téléphone.',
    quote: '« Il doit bien exister un moyen plus simple… »',
    bubble: { icon: '😩', label: '3 visites perdues', sub: '15 000 FCFA dépensés' },
  },
  {
    id: 2,
    tag: 'Chapitre 2',
    time: 'Lundi, 20h15 — À la maison',
    icon: Smartphone,
    color: 'from-[#0000FF] to-blue-500',
    image: '/story/chapitre-2-application.jpg',
    title: 'Elle découvre HOHAYA et ses logements vérifiés',
    text: 'Photos réelles, nombre de chambres et salons, loyer mensuel, mois d’avance et caution clairement affichés. Chaque bailleur est vérifié avec son NPI. En quelques minutes, Aïcha repère un joli 2 chambres salon à Fidjrossè, exactement dans son budget.',
    quote: '« Enfin des annonces claires, sans mauvaise surprise ! »',
    bubble: { icon: '🏠', label: 'Bien vérifié HOHAYA', sub: '2 ch. salon • Fidjrossè' },
  },
  {
    id: 3,
    tag: 'Chapitre 3',
    time: 'Lundi, 20h22 — 2 minutes plus tard',
    icon: MessageCircle,
    color: 'from-emerald-500 to-green-600',
    image: '/story/chapitre-3-paiement.jpg',
    title: '3 000 FCFA par Mobile Money… et la localisation arrive sur WhatsApp',
    text: 'Elle choisit sa date de visite et règle les frais fixes de mise en relation par MTN Mobile Money. Quelques secondes plus tard, son téléphone vibre : l’itinéraire Google Maps exact jusqu’au portail, les repères du quartier et le contact du propriétaire.',
    quote: '« C’est déjà sur mon WhatsApp ?! »',
    bubble: { icon: '📍', label: 'Localisation reçue', sub: 'Itinéraire Google Maps' },
  },
  {
    id: 4,
    tag: 'Chapitre 4',
    time: 'Mardi, 10h00 — Fidjrossè',
    icon: Navigation,
    color: 'from-amber-500 to-orange-500',
    image: '/story/chapitre-4-itineraire.jpg',
    title: 'Le GPS la guide jusqu’au portail, sans se perdre',
    text: 'Plus besoin de tourner pendant une heure dans le quartier ni d’appeler dix fois pour demander son chemin. Aïcha suit simplement l’itinéraire sur son téléphone et arrive pile devant le bon portail, où le bailleur l’attend.',
    quote: '« Arrivée à destination. »',
    bubble: { icon: '🧭', label: 'Arrivée en 12 min', sub: 'Guidage GPS exact' },
  },
  {
    id: 5,
    tag: 'Chapitre 5',
    time: 'Mardi, 10h30 — Nouveau chez-soi',
    icon: KeyRound,
    color: 'from-purple-500 to-fuchsia-500',
    image: '/story/chapitre-5-cles.jpg',
    title: 'Le logement correspond parfaitement. Elle signe et reçoit ses clés !',
    text: 'Le bien est exactement comme sur les photos. Le propriétaire est sérieux, le contrat est signé le jour même. En moins de 24 heures et pour seulement 3 000 FCFA, Aïcha a trouvé son nouveau chez-elle grâce à HOHAYA.',
    quote: '« Merci HOHAYA, je recommande à tout le monde ! »',
    bubble: { icon: '🔑', label: 'Logement trouvé', sub: 'En moins de 24h' },
  },
];

const TESTIMONIALS = [
  {
    name: 'Rodrigue A.',
    role: 'Locataire • Abomey-Calavi',
    initials: 'RA',
    text: 'J’ai trouvé une chambre salon près de l’UAC en une soirée. La localisation exacte est arrivée sur WhatsApp en quelques secondes. Fini les démarcheurs !',
  },
  {
    name: 'Maman Bernadette K.',
    role: 'Propriétaire • Cotonou',
    initials: 'BK',
    text: 'J’ai publié mes deux appartements gratuitement. Je reçois seulement des clients sérieux qui ont déjà vu les photos et le prix. Je marque « Occupé » en un clic.',
  },
  {
    name: 'Fabrice D.',
    role: 'Promoteur • Porto-Novo',
    initials: 'FD',
    text: 'Je partage mon code promo dans mes groupes WhatsApp. À chaque réservation, ma commission tombe directement dans mon portefeuille HOHAYA.',
  },
];

const BEFORE = [
  'Payer un démarcheur pour chaque visite',
  'Photos trompeuses et logements déjà loués',
  'Se perdre dans le quartier sans adresse précise',
  'Aucune vérification du propriétaire',
];

const AFTER = [
  '3 000 FCFA fixe, une seule fois par bien',
  'Photos réelles et biens vérifiés par HOHAYA',
  'Itinéraire GPS exact jusqu’au portail sur WhatsApp',
  'Bailleurs vérifiés avec leur NPI',
];

function StoryImage({ src, alt, color, bubble, reverse }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.06]);
  const bubbleY = useTransform(scrollYProgress, [0, 1], [20, -40]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`absolute -inset-4 -z-10 rounded-[24px] bg-gradient-to-br ${color} opacity-20 blur-2xl`}
      />
      <motion.div
        style={{ y }}
        className="relative overflow-hidden rounded-[10px] border border-white/60 bg-slate-200 shadow-2xl"
      >
        {failed ? (
          <div
            className={`flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${color} text-white`}
          >
            <span className="text-7xl drop-shadow-lg">{bubble.icon}</span>
            <span className="font-display text-lg font-extrabold">{bubble.label}</span>
          </div>
        ) : (
          <motion.img
            style={{ scale }}
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="aspect-[4/3] w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: bubbleY }}
        className={`absolute bottom-3 sm:bottom-6 ${
          reverse ? 'left-3 sm:-left-8' : 'right-3 sm:-right-8'
        } flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white/95 px-3 py-2 shadow-xl sm:gap-3 sm:px-4 sm:py-3 backdrop-blur-md`}
      >
        <span className="text-2xl">{bubble.icon}</span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-slate-900">{bubble.label}</p>
          <p className="text-xs text-slate-500">{bubble.sub}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Chapter({ chapter, index }) {
  const reverse = index % 2 === 1;
  const Icon = chapter.icon;

  return (
    <div className="relative grid items-center gap-8 py-10 sm:gap-12 sm:py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-40%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${chapter.color} text-white shadow-xl ring-8 ring-white`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? 'lg:order-2 lg:pl-10' : 'lg:pr-10'}
      >
        <StoryImage
          src={chapter.image}
          alt={chapter.title}
          color={chapter.color}
          bubble={chapter.bubble}
          reverse={reverse}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? 'lg:order-1 lg:pr-10 lg:text-right' : 'lg:pl-10'}
      >
        <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${reverse ? 'lg:justify-end' : ''}`}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${chapter.color} px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white`}
          >
            <Icon className="h-3.5 w-3.5 lg:hidden" />
            {chapter.tag}
          </span>
          <span className="text-xs font-semibold text-slate-500">{chapter.time}</span>
        </div>

        <h3 className="mt-4 font-display text-xl font-black leading-tight text-slate-950 sm:text-2xl lg:text-3xl">
          {chapter.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{chapter.text}</p>

        <div
          className={`mt-6 inline-block rounded-[10px] bg-[#0000FF]/5 px-5 py-3 text-left ${
            reverse ? 'lg:text-right' : ''
          }`}
        >
          <p className="font-display text-base font-bold italic text-slate-800">{chapter.quote}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function StorySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <section id="story" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
            Une histoire vraie du quotidien
          </span>
          <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">
            De la galère au <span className="text-gradient">nouveau chez-soi</span> en 24 heures
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Suivez Aïcha, 25 ans, qui cherchait un logement à Cotonou. Une histoire que vivent des milliers de Béninois chaque mois.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mt-10">
          {/* Vertical animated timeline */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 rounded-full bg-slate-200 lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full rounded-full bg-gradient-to-b from-rose-500 via-[#0000FF] to-purple-500"
            />
          </div>

          {CHAPTERS.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>

        {/* Story ending CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-3xl rounded-[10px] bg-slate-950 p-6 text-center text-white shadow-2xl sm:p-10"
        >
          <p className="text-4xl">✨</p>
          <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
            Et vous, quel sera votre prochain chapitre ?
          </h3>
          <p className="mt-3 text-slate-300">
            Téléchargez HOHAYA et écrivez votre propre histoire de réussite immobilière au Bénin.
          </p>
          <a
            href="#download"
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#0000FF] px-6 py-3.5 text-sm font-bold text-white shadow-blue transition hover:-translate-y-0.5"
          >
            Commencer mon histoire
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-100/70 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
            Avant / Après
          </span>
          <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
            Chercher un logement, <span className="text-gradient">avant et avec HOHAYA</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[10px] border border-rose-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">😓</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Sans HOHAYA</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[10px] border-2 border-[#0000FF] bg-white p-6 sm:p-8 shadow-blue"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">😍</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Avec HOHAYA</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
            Ils nous font confiance
          </span>
          <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
            Ce que disent les <span className="text-gradient">utilisateurs HOHAYA</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative rounded-[10px] border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-card"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-[#0000FF]/10" />
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">« {t.text} »</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0000FF] to-blue-500 text-sm font-extrabold text-white">
                  {t.initials}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
