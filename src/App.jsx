import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ShieldCheck,
  Smartphone,
  Building2,
  Compass,
  Tag,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ArrowDownToLine,
  MessageCircle,
  Star,
  Navigation,
  Home,
  KeyRound,
  Sparkles,
  Bell,
  Wallet,
} from 'lucide-react';
import { StorySection, BeforeAfterSection, TestimonialsSection } from './Storytelling.jsx';

/**
 * Configuration centralisée des liens de téléchargement HOHAYA Bénin
 * Remplacez ces URL par vos liens définitifs Google Play Store et Apple App Store.
 */
const STORE_LINKS = {
  playstore: 'https://play.google.com/store/apps/details?id=com.hohaya.app',
  appstore: 'https://apps.apple.com/app/hohaya/id0000000000',
  whatsapp: 'https://wa.me/2290166306861',
};

const FEATURES = [
  {
    icon: MapPin,
    color: 'bg-blue-600/10 text-[#0000FF]',
    title: 'Itinéraire GPS Exact sur WhatsApp',
    desc: 'Dès validation des frais de plateforme (3 000 FCFA), recevez automatiquement sur WhatsApp et par Email le lien Google Maps exact jusqu’au portail, les repères proches et le numéro du propriétaire.',
  },
  {
    icon: ShieldCheck,
    color: 'bg-emerald-500/10 text-emerald-600',
    title: 'Bailleurs & NPI Vérifiés',
    desc: 'Chaque propriétaire partenaire est vérifié avec son Numéro Personnel d’Identification (NPI Bénin) pour vous garantir des logements réels, disponibles et sans mauvaise surprise.',
  },
  {
    icon: Smartphone,
    color: 'bg-amber-500/10 text-amber-600',
    title: 'Paiement Mobile Money Instantané',
    desc: 'Réglez vos frais fixes de mise en relation (3 000 FCFA) en quelques secondes via MTN Mobile Money, Moov Money ou Celtiis Cash directement depuis votre téléphone.',
  },
  {
    icon: Building2,
    color: 'bg-purple-500/10 text-purple-600',
    title: 'Location Nuitée, Mensuelle & Vente',
    desc: 'Appartements meublés à la nuitée, maisons à louer au mois (avec détail clair des mois d’avance et caution eau/électricité) ou parcelles vérifiées en vente.',
  },
  {
    icon: Compass,
    color: 'bg-teal-500/10 text-teal-600',
    title: 'Relevé GPS en 1 Clic pour les Bailleurs',
    desc: 'Lors de l’ajout d’un bien, le propriétaire appuie simplement sur « Relever ma position actuelle » devant son immeuble pour enregistrer sa position GPS exacte.',
  },
  {
    icon: Tag,
    color: 'bg-rose-500/10 text-rose-600',
    title: 'Codes Promo & Commissions Promoteurs',
    desc: 'Devenez promoteur sur HOHAYA, créez votre code promo personnalisé : vos filleuls profitent d’une réduction et vous recevez 10% de commission sur votre portefeuille.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Explorez les biens vérifiés',
    desc: 'Consultez les photos haute définition, le nombre de chambres et salons, le tarif mensuel ou nuitée, les mois d’avance demandés et les équipements.',
  },
  {
    num: '02',
    title: 'Réglez les frais de plateforme (3 000 FCFA)',
    desc: 'Choisissez votre date de visite ou d’entrée et réglez les 3 000 FCFA par Mobile Money (avec réduction immédiate si vous avez un code promo).',
  },
  {
    num: '03',
    title: 'Recevez le GPS exact sur WhatsApp',
    desc: 'HOHAYA vous envoie instantanément sur WhatsApp (+229 01 66 30 68 61), par Email et dans l’application l’itinéraire Google Maps direct et le contact du bailleur.',
  },
];

const ROLE_TABS = {
  tenant: {
    badge: 'ESPACE LOCATAIRE & ACHETEUR',
    title: 'Visitez uniquement des logements réels et disponibles',
    desc: 'Fini les déplacements inutiles et les fausses annonces. Consultez toutes les caractéristiques du bien avant de débloquer sa position GPS exacte.',
    points: [
      'Filtres par catégorie : Appartements, Maisons, Studios, Villas, Bureaux, Terrains',
      'Transparence totale : Loyer mensuel, mois d’avance, caution eau/électricité ou tarif nuitée',
      'Itinéraire Google Maps direct envoyé sur votre WhatsApp dès le paiement des 3 000 FCFA',
      'Notifications intégrées avec bouton direct « Ouvrir l’itinéraire Google Maps »',
    ],
    cta: 'Télécharger pour chercher un bien',
    preview: {
      header: '📍 Notification WhatsApp & In-App reçue',
      title: 'Localisation débloquée — Villa Haie Vive',
      stat: 'Itinéraire GPS Prêt',
      meta: 'Cotonou, Littoral • Coordonnées GPS exactes vérifiées + Numéro du propriétaire débloqué',
      btnText: 'Ouvrir l’itinéraire Google Maps',
      btnColor: 'bg-emerald-600',
    },
  },
  owner: {
    badge: 'ESPACE PROPRIÉTAIRE & BAILLEUR',
    title: 'Publiez gratuitement vos biens et recevez des clients sérieux',
    desc: 'Activez gratuitement votre espace Propriétaire avec votre NPI. L’emplacement exact de votre logement reste confidentiel et n’est transmis qu’aux clients ayant réglé la mise en relation.',
    points: [
      'Inscription bailleur 100% gratuite et publication d’annonces avec photos en 2 minutes',
      'Bouton « Relever ma position actuelle » pour capturer le GPS exact sans erreur',
      'Bouton rapide « Marquer occupé / Rendre disponible » en un clic depuis Mes Biens',
      'Tableau de bord avec suivi des mises en relation et contact téléphonique des clients',
    ],
    cta: 'Publier mon logement sur l’App',
    preview: {
      header: '🏠 Tableau de bord Bailleur HOHAYA',
      title: 'Mises en relation confirmées',
      stat: '100% Clients Qualifiés',
      meta: 'Position GPS relevée automatiquement • Statut Disponible / Occupé modifiable en 1 clic',
      btnText: 'Ajouter un hébergement',
      btnColor: 'bg-[#0000FF]',
    },
  },
  promoter: {
    badge: 'ESPACE PROMOTEUR DIGITAL',
    title: 'Gagnez des commissions grâce à vos codes promo',
    desc: 'Activez le mode Promoteur en un clic depuis votre profil. Créez votre code promo et partagez-le sur WhatsApp, TikTok, Facebook ou auprès de votre réseau.',
    points: [
      'Création instantanée de votre code promo personnalisé dans l’application',
      'Réduction immédiate accordée aux clients qui utilisent votre code promo',
      '10% de commission crédités automatiquement en temps réel sur votre portefeuille',
      'Retrait rapide de vos gains vers MTN Mobile Money ou Moov Money',
    ],
    cta: 'Devenir Promoteur sur l’App',
    preview: {
      header: '🎉 Commission Promoteur créditée',
      title: 'Code Promo : BENIN2026',
      stat: '+10% par Réservation',
      meta: 'Créditée instantanément dans Mon Portefeuille à chaque mise en relation validée',
      btnText: 'Retirer vers Mobile Money',
      btnColor: 'bg-emerald-600',
    },
  },
};

const CITIES = [
  {
    dept: 'Littoral',
    name: 'Cotonou',
    areas: 'Haie Vive, Fidjrossè, Cadjèhoun, Akpakpa, Agla, Ganhi, Zogbo, Menontin',
  },
  {
    dept: 'Atlantique',
    name: 'Abomey-Calavi & Ouidah',
    areas: 'Calavi Centre, Arconville, Zoca, Tankpè, Cocotomey, Godomey, Ouidah Plage',
  },
  {
    dept: 'Ouémé',
    name: 'Porto-Novo & Sèmè-Podji',
    areas: 'Ouando, Tokpota, Djassin, Agblangandan, Ekpè, Kraké',
  },
  {
    dept: 'Borgou & Tous Départements',
    name: 'Parakou, Bohicon & Nord',
    areas: 'Albarika, Banikanni, Zongo, Bohicon, Abomey, Natitingou, Grand-Popo, Lokossa',
  },
];

const FAQS = [
  {
    q: 'Pourquoi la localisation exacte est-elle envoyée après le paiement de 3 000 FCFA ?',
    a: 'HOHAYA agit comme intermédiaire de confiance entre les chercheurs de logements et les bailleurs. Les 3 000 FCFA correspondent aux frais fixes de plateforme HOHAYA : dès validation, vous recevez automatiquement sur WhatsApp, par Email et dans vos notifications l’itinéraire Google Maps exact jusqu’au portail ainsi que le numéro du propriétaire.',
  },
  {
    q: 'Comment télécharger l’application sur Android et iPhone (iOS) ?',
    a: 'Cliquez directement sur le bouton Google Play (pour tous les téléphones Android : Samsung, Tecno, Infinix, Redmi, Xiaomi...) ou sur le bouton App Store (pour iPhone et iPad) présents sur cette page.',
  },
  {
    q: 'La publication d’un logement est-elle gratuite pour le propriétaire ?',
    a: 'Oui, 100% gratuite ! Tout propriétaire au Bénin peut activer gratuitement son profil Bailleur avec son NPI, publier ses appartements, maisons, villas ou terrains, relever la position GPS en 1 clic et passer un bien en « Occupé » ou « Disponible » à tout moment.',
  },
  {
    q: 'Quels moyens de paiement sont acceptés sur HOHAYA ?',
    a: 'Vous pouvez régler en toute sécurité via MTN Mobile Money, Moov Money, Celtiis Cash ou directement avec le solde de votre portefeuille HOHAYA.',
  },
];

function StoreButtons({ light = false }) {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      {/* Google Play Store Button */}
      <motion.a
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={STORE_LINKS.playstore}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex w-full items-center justify-center gap-3.5 rounded-[10px] px-5 py-3.5 sm:w-auto sm:justify-start shadow-lg transition-all ${
          light
            ? 'bg-white text-slate-900 hover:bg-slate-950 hover:text-white'
            : 'bg-slate-950 text-white hover:bg-[#0000FF] hover:shadow-blue'
        }`}
      >
        <svg className="h-7 w-7 shrink-0" viewBox="0 0 512 512">
          <path
            fill="#4285F4"
            d="M48 59.49v393a4.33 4.33 0 007.37 3.07L260 256 55.37 56.42A4.33 4.33 0 0048 59.49z"
          />
          <path
            fill="#34A853"
            d="M345.8 174L89.22 32.64l-.16-.09c-4.42-2.4-8.62.81-5 4.35l175.94 219.1z"
          />
          <path
            fill="#FBBC05"
            d="M84.08 475.1c-3.64 3.55.56 6.76 5 4.35l.16-.09L345.8 338l-85.8-82z"
          />
          <path
            fill="#EA4335"
            d="M449.38 231l-103.58-57-85.8 82 85.8 82 103.58-57c19.5-10.75 19.5-39.25 0-50z"
          />
        </svg>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
            Disponible sur
          </span>
          <span className="font-display text-lg font-extrabold">Google Play</span>
        </div>
      </motion.a>

      {/* Apple App Store Button */}
      <motion.a
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={STORE_LINKS.appstore}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex w-full items-center justify-center gap-3.5 rounded-[10px] px-5 py-3.5 sm:w-auto sm:justify-start shadow-lg transition-all ${
          light
            ? 'bg-white text-slate-900 hover:bg-slate-950 hover:text-white'
            : 'bg-slate-950 text-white hover:bg-[#0000FF] hover:shadow-blue'
        }`}
      >
        <svg className="h-7 w-7 shrink-0 fill-current" viewBox="0 0 384 512">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
            Télécharger dans
          </span>
          <span className="font-display text-lg font-extrabold">l’App Store</span>
        </div>
      </motion.a>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('tenant');
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentRole = ROLE_TABS[activeRole];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-28 -top-28 h-[460px] w-[460px] rounded-full bg-[#0000FF]/15 blur-[110px]" />
        <div className="absolute -left-32 top-[40%] h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[110px]" />
        <div className="absolute bottom-10 right-10 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      {/* ─── NAVBAR ───────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/logohohaya.png"
              alt="Logo HOHAYA"
              className="h-11 w-11 rounded-[10px] object-contain"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-tight text-[#0000FF]">
                HOHAYA
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#story"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              L’histoire
            </a>
            <a
              href="#features"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              Avantages
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              Comment ça marche
            </a>
            <a
              href="#roles"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              Espaces
            </a>
            <a
              href="#cities"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              Villes
            </a>
            <a
              href="#faq"
              className="text-sm font-semibold text-slate-700 transition hover:text-[#0000FF]"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="hidden items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#0000FF] to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-blue transition hover:-translate-y-0.5 sm:inline-flex"
            >
              <span>Télécharger l’App</span>
              <ArrowDownToLine className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-[10px] p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-slate-200 bg-white px-6 py-5 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="#story"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  L’histoire d’Aïcha
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  Avantages
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  Comment ça marche
                </a>
                <a
                  href="#roles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  Espaces Utilisateurs
                </a>
                <a
                  href="#cities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  Villes couvertes
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-slate-800"
                >
                  FAQ
                </a>
                <a
                  href="#download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#0000FF] py-3 font-bold text-white"
                >
                  <span>Télécharger l’application</span>
                  <ArrowDownToLine className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section id="hero" className="pb-14 pt-28 sm:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#0000FF]/20 bg-[#0000FF]/10 max-w-full px-3 py-1.5 text-[10px] font-bold sm:px-4 sm:text-xs text-[#0000FF]">
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              <span>LA PLATEFORME IMMOBILIÈRE N°1 AU BÉNIN 🇧🇯</span>
            </div>

            <h1 className="font-display text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Trouvez votre <span className="text-gradient">logement idéal</span> au Bénin en toute confiance.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Appartements meublés, maisons en location mensuelle, studios, villas et terrains vérifiés dans les{' '}
              <strong className="font-semibold text-slate-900">12 départements du Bénin</strong>. Débloquez l’itinéraire GPS exact jusqu’au portail et le contact direct du bailleur sur WhatsApp.
            </p>

            <div className="mt-8">
              <StoreButtons />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Bailleurs & NPI vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Itinéraire GPS sur WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>MTN, Moov & Celtiis</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column: Animated 3D Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center lg:col-span-5"
          >
            {/* Floating Notification Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 top-10 z-20 hidden items-center gap-3 rounded-[10px] border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-emerald-500/15 text-emerald-600">
                <Navigation className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-slate-900">Itinéraire GPS envoyé</p>
                <p className="text-[11px] text-slate-500">Reçu sur votre WhatsApp</p>
              </div>
            </motion.div>

            {/* Floating Notification Card 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-6 top-1/2 z-20 hidden items-center gap-3 rounded-[10px] border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-amber-500/15 text-amber-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-slate-900">3 000 FCFA fixe</p>
                <p className="text-[11px] text-slate-500">Mise en relation immédiate</p>
              </div>
            </motion.div>

            {/* Floating Notification Card 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -left-4 bottom-10 z-20 hidden items-center gap-3 rounded-[10px] border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#0000FF]/10 text-[#0000FF]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-slate-900">Bailleur Vérifié HOHAYA</p>
                <p className="text-[11px] text-slate-500">Identité NPI & Titre foncier</p>
              </div>
            </motion.div>

            {/* Phone Mockup Frame */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[280px] sm:w-[320px] rounded-[42px] bg-slate-950 p-3 shadow-2xl ring-2 ring-white/15"
            >
              <div className="absolute left-1/2 top-3 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />
              <div className="overflow-hidden rounded-[32px] bg-[#F4F6FB] px-3.5 pb-4 pt-8">
                {/* App Top Bar */}
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-500">Bienvenue sur</span>
                    <h4 className="font-display text-sm font-extrabold text-slate-900">
                      HOHAYA Bénin 🇧🇯
                    </h4>
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-white shadow-sm">
                    <Bell className="h-4 w-4 text-slate-700" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
                  </div>
                </div>

                {/* App Full-Width Blue Banner (Matches actual Flutter app) */}
                <div className="mb-3 w-full rounded-[10px] bg-gradient-to-br from-[#0000FF] to-blue-500 p-3.5 text-white shadow-blue">
                  <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-[9px] font-extrabold tracking-wide">
                    HOHAYA BÉNIN
                  </span>
                  <h3 className="mt-1.5 font-display text-sm font-extrabold leading-snug">
                    Trouvez votre logement idéal au Bénin
                  </h3>
                  <p className="mt-0.5 text-[10px] text-white/85">
                    Appartements, maisons, villas & terrains vérifiés
                  </p>
                </div>

                {/* App Category Pills */}
                <div className="mb-3 flex gap-1.5 overflow-hidden">
                  <span className="rounded-lg bg-[#0000FF] px-2.5 py-1 text-[10px] font-bold text-white">
                    Appartements
                  </span>
                  <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    Maisons
                  </span>
                  <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    Villas
                  </span>
                </div>

                {/* App Property Card 1 */}
                <div className="mb-2.5 overflow-hidden rounded-[10px] bg-white shadow-sm">
                  <div
                    className="relative h-24 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80')",
                    }}
                  >
                    <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">
                      Disponible
                    </span>
                    <span className="absolute bottom-2 left-2 rounded-md bg-slate-950/75 px-2 py-0.5 text-[9px] font-semibold text-white">
                      Appartement
                    </span>
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-display text-xs font-extrabold text-slate-900">
                        Appartement Haut Standing
                      </h5>
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.9
                      </span>
                    </div>
                    <div className="mt-1 flex gap-2 text-[10px] text-slate-500">
                      <span>3 ch.</span>
                      <span>•</span>
                      <span>1 salon</span>
                      <span>•</span>
                      <span>2 sdb</span>
                      <span>•</span>
                      <span>120 m²</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="text-xs font-extrabold text-[#0000FF]">
                        150 000 FCFA <small className="font-normal text-slate-400">/ mois</small>
                      </span>
                      <span className="rounded-md bg-[#0000FF] px-2.5 py-1 text-[10px] font-bold text-white">
                        Réserver
                      </span>
                    </div>
                  </div>
                </div>

                {/* App Property Card 2 */}
                <div className="overflow-hidden rounded-[10px] bg-white shadow-sm">
                  <div
                    className="relative h-20 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80')",
                    }}
                  >
                    <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">
                      Disponible
                    </span>
                    <span className="absolute bottom-2 left-2 rounded-md bg-slate-950/75 px-2 py-0.5 text-[9px] font-semibold text-white">
                      Villa Meublée
                    </span>
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-display text-xs font-extrabold text-slate-900">
                        Villa Meublée avec Piscine
                      </h5>
                      <span className="text-[10px] font-bold text-amber-500">★ 5.0</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0000FF]">
                        45 000 FCFA <small className="font-normal text-slate-400">/ nuit</small>
                      </span>
                      <span className="rounded-md bg-[#0000FF] px-2.5 py-1 text-[10px] font-bold text-white">
                        Réserver
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 rounded-[10px] border border-slate-200 bg-white p-8 shadow-card md:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-3xl font-black text-[#0000FF] sm:text-4xl">1 500+</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Logements & Terrains vérifiés
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-black text-[#0000FF] sm:text-4xl">12</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Départements du Bénin couverts
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-black text-[#0000FF] sm:text-4xl">
                3 000 <span className="text-lg">FCFA</span>
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Frais fixes de mise en relation
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-black text-[#0000FF] sm:text-4xl">100%</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Itinéraire GPS envoyé sur WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORYTELLING : L'HISTOIRE D'AÏCHA ───────────────────────────── */}
      <StorySection />

      {/* ─── FEATURES SECTION ─────────────────────────────────────────────── */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
              Pourquoi choisir HOHAYA ?
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
              L’immobilier au Bénin, <span className="text-gradient">plus simple et 100% sécurisé</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Fini les déplacements inutiles. HOHAYA vérifie chaque propriétaire et vous guide par GPS jusqu’au portail du bien.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[10px] border border-slate-200 bg-white p-7 shadow-sm transition hover:border-[#0000FF]/30 hover:shadow-card"
                >
                  <div
                    className={`mb-5 inline-flex h-13 w-13 items-center justify-center rounded-[10px] p-3.5 ${feat.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-gradient-to-b from-blue-50/50 to-white py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
              Simple & Rapide
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
              Comment fonctionne <span className="text-gradient">HOHAYA</span> ?
            </h2>
            <p className="mt-3 text-slate-600">
              En moins de 2 minutes, passez de la recherche dans l’application à la visite sur place.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative rounded-[10px] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#0000FF] to-blue-600 font-display text-lg font-black text-white shadow-blue">
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AVANT / APRÈS ───────────────────────────────────────────────── */}
      <BeforeAfterSection />

      {/* ─── INTERACTIVE ROLE TABS (LOCATAIRE / BAILLEUR / PROMOTEUR) ─────── */}
      <section id="roles" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
              3 Espaces Intégrés
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
              Une seule application, <span className="text-gradient">trois opportunités</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Basculez librement entre votre profil Locataire, Propriétaire ou Promoteur depuis le même compte HOHAYA.
            </p>
          </div>

          {/* Role Selector Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {[
              { id: 'tenant', label: 'Locataires & Acheteurs', icon: KeyRound },
              { id: 'owner', label: 'Propriétaires & Bailleurs', icon: Home },
              { id: 'promoter', label: 'Promoteurs & Partenaires', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeRole === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRole(tab.id)}
                  className={`inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border px-5 py-3.5 sm:w-auto text-sm font-bold transition-all ${
                    isSelected
                      ? 'border-[#0000FF] bg-[#0000FF] text-white shadow-blue'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-[#0000FF]/40'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Role Content Card */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid items-center gap-8 rounded-[10px] border border-slate-200 bg-white p-5 sm:p-8 lg:gap-10 shadow-card lg:grid-cols-12 lg:p-12"
              >
                <div className="lg:col-span-7">
                  <span className="inline-block rounded-md bg-[#0000FF]/10 px-3 py-1 text-xs font-extrabold text-[#0000FF]">
                    {currentRole.badge}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-black text-slate-950 sm:text-3xl">
                    {currentRole.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{currentRole.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {currentRole.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="#download"
                      className="inline-flex items-center gap-2 rounded-[10px] bg-[#0000FF] px-6 py-3.5 text-sm font-bold text-white shadow-blue transition hover:-translate-y-0.5"
                    >
                      <span>{currentRole.cta}</span>
                      <ArrowDownToLine className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-[10px] bg-gradient-to-br from-slate-950 to-slate-800 p-7 text-white shadow-2xl">
                    <p className="text-xs font-bold text-blue-300">{currentRole.preview.header}</p>
                    <h4 className="mt-2 font-display text-xl font-extrabold">
                      {currentRole.preview.title}
                    </h4>
                    <p className="my-3 font-display text-2xl font-black text-emerald-400">
                      {currentRole.preview.stat}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {currentRole.preview.meta}
                    </p>
                    <div
                      className={`mt-6 rounded-[10px] py-3 text-center text-sm font-bold text-white ${currentRole.preview.btnColor}`}
                    >
                      {currentRole.preview.btnText}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── CITIES COVERED ───────────────────────────────────────────────── */}
      <section id="cities" className="border-y border-slate-200 bg-slate-100/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
              Couverture Nationale
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
              Présent dans les <span className="text-gradient">12 départements du Bénin</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Des quartiers résidentiels de Cotonou aux pôles universitaires et villes touristiques.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((city) => (
              <motion.div
                key={city.name}
                whileHover={{ y: -5 }}
                className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#0000FF]"
              >
                <span className="inline-block rounded-md bg-[#0000FF]/10 px-2.5 py-1 text-xs font-extrabold text-[#0000FF]">
                  {city.dept}
                </span>
                <h4 className="mt-3 font-display text-lg font-extrabold text-slate-900">
                  {city.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{city.areas}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── FAQ SECTION ──────────────────────────────────────────────────── */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#0000FF]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0000FF]">
              Questions Fréquentes
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-slate-950 sm:text-4xl">
              Tout savoir sur <span className="text-gradient">HOHAYA Bénin</span>
            </h2>
          </div>

          <div className="mt-12 space-y-3.5">
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.q}
                  className={`rounded-[10px] border bg-white transition ${
                    isOpen ? 'border-[#0000FF] shadow-sm' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-bold text-slate-900"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#0000FF] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD CTA SECTION ─────────────────────────────────────────── */}
      <section id="download" className="pb-24 pt-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-8 rounded-[10px] bg-gradient-to-br from-[#0000FF] via-blue-700 to-slate-950 p-6 lg:gap-10 text-white shadow-blue sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                Téléchargement Gratuit • Android & iOS
              </span>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">
                Téléchargez l’application HOHAYA dès maintenant
              </h2>
              <p className="mt-3 max-w-2xl text-base text-white/85">
                Cliquez sur <strong>Google Play</strong> ou <strong>App Store</strong> pour installer l’application officielle HOHAYA sur votre smartphone et accéder à tous les logements vérifiés au Bénin.
              </p>

              <div className="mt-8">
                <StoreButtons light />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[10px] border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md">
                <img
                  src="/logohohaya.png"
                  alt="HOHAYA App"
                  className="mx-auto h-16 w-16 rounded-[10px] bg-white p-2 shadow-md"
                />
                <h4 className="mt-3 font-display text-lg font-extrabold">HOHAYA Mobile</h4>
                <p className="mt-1 text-xs text-white/80">Compatible Android 8.0+ & iOS 14+</p>
                <a
                  href={STORE_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-emerald-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Support WhatsApp : +229 01 66 30 68 61</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 py-14 text-slate-400">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logohohaya.png"
                alt="Logo HOHAYA"
                className="h-10 w-10 rounded-[10px] bg-white p-1 object-contain"
              />
              <div>
                <span className="font-display text-lg font-black text-white">HOHAYA</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              La plateforme digitale de référence pour louer, réserver et acheter des biens immobiliers vérifiés partout en République du Bénin.
            </p>
          </div>

          <div>
            <h5 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
              Navigation
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Avantages
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white">
                  Espaces Utilisateurs
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-white">
                  Villes couvertes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  Questions fréquentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
              Télécharger l’App
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={STORE_LINKS.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Google Play Store (Android)
                </a>
              </li>
              <li>
                <a
                  href={STORE_LINKS.appstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Apple App Store (iPhone / iOS)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
              Contact & Support Bénin
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={STORE_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp : +229 01 66 30 68 61
                </a>
              </li>
              <li>
                <a href="mailto:contact@hohayabj.com" className="hover:text-white">
                  contact@hohayabj.com
                </a>
              </li>
              <li>Cotonou, République du Bénin 🇧🇯</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} HOHAYA Bénin. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

