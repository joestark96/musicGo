import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Play,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Music,
  Piano,
  Compass,
  HelpCircle,
  ShieldCheck,
  Layers,
  Volume2,
  ExternalLink,
  Flame,
  Award,
  BookOpen,
  Headphones
} from 'lucide-react';
import { sound } from '../services/sound';

interface LandingPageProps {
  onStartApp: () => void;
}

const DEMO_KEYS = [
  { note: 'C4', label: 'Do4', isBlack: false },
  { note: 'C#4', label: 'Do#', isBlack: true },
  { note: 'D4', label: 'Re4', isBlack: false },
  { note: 'D#4', label: 'Re#', isBlack: true },
  { note: 'E4', label: 'Mi4', isBlack: false },
  { note: 'F4', label: 'Fa4', isBlack: false },
  { note: 'F#4', label: 'Fa#', isBlack: true },
  { note: 'G4', label: 'Sol4', isBlack: false },
  { note: 'G#4', label: 'Sol#', isBlack: true },
  { note: 'A4', label: 'La4', isBlack: false },
  { note: 'A#4', label: 'La#', isBlack: true },
  { note: 'B4', label: 'Si4', isBlack: false },
  { note: 'C5', label: 'Do5', isBlack: false },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handlePlayKey = (note: string) => {
    sound.playNote(note, 0.4);
    setActiveNote(note);
    setTimeout(() => setActiveNote(null), 300);
  };

  const handlePlayZeldaPreview = (song: 'storms' | 'healing' | 'lullaby') => {
    sound.playTap();
    if (song === 'storms') {
      const melody = [
        { note: 'D4', dur: 220 },
        { note: 'F4', dur: 220 },
        { note: 'D5', dur: 600 },
        { note: 'D4', dur: 220 },
        { note: 'F4', dur: 220 },
        { note: 'D5', dur: 600 },
      ];
      melody.forEach((step, idx) => {
        setTimeout(() => sound.playNote(step.note, step.dur / 1000), idx * 260);
      });
    } else if (song === 'healing') {
      const melody = [
        { note: 'B4', dur: 350 },
        { note: 'A4', dur: 350 },
        { note: 'F4', dur: 700 },
        { note: 'B4', dur: 350 },
        { note: 'A4', dur: 350 },
        { note: 'F4', dur: 700 },
      ];
      melody.forEach((step, idx) => {
        setTimeout(() => sound.playNote(step.note, step.dur / 1000), idx * 380);
      });
    } else {
      const melody = [
        { note: 'B4', dur: 350 },
        { note: 'D5', dur: 700 },
        { note: 'A4', dur: 350 },
        { note: 'B4', dur: 350 },
        { note: 'D5', dur: 700 },
        { note: 'A4', dur: 350 },
      ];
      melody.forEach((step, idx) => {
        setTimeout(() => sound.playNote(step.note, step.dur / 1000), idx * 360);
      });
    }
  };

  const faqs = [
    {
      q: '¿Es MusicGo! completamente gratis?',
      a: 'Sí, 100% gratis y de código abierto bajo licencia MIT. No tiene micropagos, compras ocultas ni suscripciones obligatorias.'
    },
    {
      q: '¿Funciona sin conexión a internet (Offline)?',
      a: '¡Absolutamente! Todo el motor sonoro corre de manera nativa mediante Web Audio API en tu dispositivo. Puedes usar la app o el APK en un avión o en el campo sin gastar datos.'
    },
    {
      q: '¿Necesito saber música antes de empezar?',
      a: 'No. El Roadmap comienza desde la primera lección explicando qué son las 7 notas y cómo se lee la primera línea del pentagrama con metáforas visuales y ejercicios prácticos.'
    },
    {
      q: '¿Cómo instalo el archivo APK en mi teléfono Android?',
      a: 'Pulsa el botón "Descargar APK v1.0.0". Una vez descargado el archivo musicgo-v1.0.0.apk, pulsa sobre él en tu barra de descargas o administrador de archivos. Si Android te pregunta, autoriza "Instalar aplicaciones de esta fuente" y ¡listo!'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f171a] text-slate-800 dark:text-slate-100 font-sans selection:bg-duo-green selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#131f24]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={onStartApp}>
            <div className="w-10 h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white shadow-duo-btn-sm text-xl font-bold">
              🎵
            </div>
            <div>
              <span className="font-extrabold text-xl font-['Fredoka'] tracking-wide text-slate-800 dark:text-white">
                MusicGo!
              </span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-duo-green/15 text-duo-green-dark dark:text-duo-green uppercase tracking-wider">
                v1.0.0
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/joestark96/musicGo.git"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="/musicgo-v1.0.0.apk"
              download="musicgo-v1.0.0.apk"
              className="hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-black transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>APK v1.0.0</span>
            </a>

            <button
              onClick={onStartApp}
              className="px-5 py-2.5 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-black text-xs sm:text-sm shadow-duo-btn flex items-center space-x-2 transition-transform active:translate-y-0.5"
            >
              <span>Abrir App Web</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-12 pb-16 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-duo-green/15 text-duo-green-dark dark:text-duo-green text-xs font-black uppercase tracking-wider shadow-sm animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-duo-yellow fill-duo-yellow" />
          <span>¡Lanzamiento Oficial Versión 1.0.0!</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-['Fredoka'] text-slate-800 dark:text-white leading-[1.1] max-w-3xl mx-auto">
          La forma divertida, visual y eficaz de{' '}
          <span className="text-duo-green underline decoration-duo-green/40">aprender música</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Domina el pentagrama, entrena tu oído, toca el piano y compone tus propias melodías al estilo Duolingo. Sin rollos aburridos, 100% interactivo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-black text-base shadow-duo-btn flex items-center justify-center space-x-3 transition-transform active:translate-y-1"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Comenzar a Jugar (Gratis)</span>
          </button>

          <a
            href="/musicgo-v1.0.0.apk"
            download="musicgo-v1.0.0.apk"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#1b272c] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-duo-blue font-black text-base shadow-sm flex items-center justify-center space-x-3 transition-all"
          >
            <Smartphone className="w-5 h-5 text-duo-blue" />
            <span>Descargar APK v1.0.0</span>
          </a>
        </div>

        {/* Quick Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-duo-green" />
            <span>10 Unidades Temáticas</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-duo-green" />
            <span>Pentagrama Clave Sol y Fa</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-duo-green" />
            <span>Sintetizador Polifónico Nativo</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-duo-green" />
            <span>100% Offline y Sin Anuncios</span>
          </div>
        </div>

        {/* Interactive Piano Demo Card */}
        <div className="mt-8 bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-left">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-duo-green">
                Pruébalo en vivo ahora mismo:
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-white">
                Toca las teclas del piano y escucha el sonido
              </h3>
            </div>
            {activeNote && (
              <span className="px-3 py-1 rounded-xl bg-duo-green text-white font-black text-xs animate-pulse">
                {activeNote}
              </span>
            )}
          </div>

          {/* Mini Interactive Piano */}
          <div className="relative flex justify-center h-32 select-none pt-1">
            {DEMO_KEYS.filter(k => !k.isBlack).map((whiteKey) => (
              <button
                key={whiteKey.note}
                type="button"
                onClick={() => handlePlayKey(whiteKey.note)}
                className={`relative w-11 h-28 border border-slate-300 rounded-b-xl flex flex-col justify-end pb-2 items-center font-bold text-xs shadow-sm transition-all active:translate-y-1 ${
                  activeNote === whiteKey.note
                    ? 'bg-duo-green text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-[10px]">{whiteKey.label}</span>
              </button>
            ))}

            {/* Black keys overlay */}
            <div className="absolute top-1 left-0 right-0 flex justify-center pointer-events-none">
              <div className="w-[308px] relative h-16">
                <button
                  type="button"
                  onClick={() => handlePlayKey('C#4')}
                  className="pointer-events-auto absolute left-[28px] w-6 h-18 bg-slate-900 hover:bg-slate-800 text-white rounded-b-md text-[8px] font-bold flex items-end justify-center pb-1 shadow-md"
                >
                  C#
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayKey('D#4')}
                  className="pointer-events-auto absolute left-[72px] w-6 h-18 bg-slate-900 hover:bg-slate-800 text-white rounded-b-md text-[8px] font-bold flex items-end justify-center pb-1 shadow-md"
                >
                  D#
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayKey('F#4')}
                  className="pointer-events-auto absolute left-[160px] w-6 h-18 bg-slate-900 hover:bg-slate-800 text-white rounded-b-md text-[8px] font-bold flex items-end justify-center pb-1 shadow-md"
                >
                  F#
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayKey('G#4')}
                  className="pointer-events-auto absolute left-[204px] w-6 h-18 bg-slate-900 hover:bg-slate-800 text-white rounded-b-md text-[8px] font-bold flex items-end justify-center pb-1 shadow-md"
                >
                  G#
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayKey('A#4')}
                  className="pointer-events-auto absolute left-[248px] w-6 h-18 bg-slate-900 hover:bg-slate-800 text-white rounded-b-md text-[8px] font-bold flex items-end justify-center pb-1 shadow-md"
                >
                  A#
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APK v1.0.0 Download Highlight Box */}
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background pattern glow */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-black tracking-wide">
                <Smartphone className="w-4 h-4" />
                <span>APK Oficial para Android v1.0.0</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] leading-tight">
                Instala MusicGo! directamente en tu móvil
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
                Lleva todo el conservatorio en tu bolsillo. Compatible con teléfonos y tablets Android (versión 8.0 o superior). 
                Sin dependencias externas ni conexión requerida.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-emerald-200 pt-1">
                <span>📁 Tamaño: ~300 KB</span>
                <span>🛡️ 100% Seguro y Verificado</span>
                <span>⚡ Arquitectura: ARM64 / x86_64</span>
              </div>
            </div>

            {/* Download Button Card */}
            <div className="flex-shrink-0 w-full sm:w-auto text-center space-y-3">
              <a
                href="/musicgo-v1.0.0.apk"
                download="musicgo-v1.0.0.apk"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-base shadow-xl flex items-center justify-center space-x-3 transition-transform active:translate-y-1 group"
              >
                <Download className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Descargar APK v1.0.0</span>
              </a>

              <p className="text-[11px] text-emerald-200">
                Archivo: <code className="bg-emerald-900/40 px-1.5 py-0.5 rounded">musicgo-v1.0.0.apk</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="px-4 py-12 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black font-['Fredoka'] text-slate-800 dark:text-white">
            Todo lo que necesitas para convertirte en músico
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Diseñado pedagógicamente para aprender teoría musical jugando
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-duo-green/15 text-duo-green text-2xl flex items-center justify-center">
              🎼
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              Pentagrama Interactivo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Lee y escribe partituras reales en Clave de Sol y Clave de Fa. Pica directamente en las líneas y espacios para escuchar la nota en tiempo real.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-duo-blue/15 text-duo-blue text-2xl flex items-center justify-center">
              🗺️
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              Roadmap de 10 Unidades
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              38 lecciones estructuradas como Duolingo: rachas de estudio, vidas por fallos, puntos de XP y desbloqueo de niveles paso a paso.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-duo-purple/15 text-duo-purple text-2xl flex items-center justify-center">
              🪄
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              Estudio de Composición
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Crea tus propias canciones, ajusta el BPM, selecciona figuras rítmicas y escucha obras de <em>The Legend of Zelda</em> y Beethoven.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-duo-orange/15 text-duo-orange text-2xl flex items-center justify-center">
              👂
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              Entrenamiento Auditivo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Desarrolla tu oído musical reconociendo notas aisladas, intervalos melódicos y la diferencia entre acordes mayores y menores.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 text-2xl flex items-center justify-center">
              🔀
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              60+ Flashcards con Barajar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tarjetas mnemotécnicas con orden aleatorio para memorizar símbolos, dinámicas sonoras, figuras y términos italianos (Allegro, Adagio).
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 text-2xl flex items-center justify-center">
              🔄
            </div>
            <h3 className="text-lg font-black font-['Fredoka'] text-slate-800 dark:text-white">
              Círculo de Quintas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Rueda interactiva para entender tonalidades vecinas, escalas relativas menores y armaduras con sostenidos y bemoles.
            </p>
          </div>
        </div>
      </section>

      {/* Zelda Jukebox Preview */}
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1b272c] p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-duo-green">
            <Music className="w-5 h-5" />
            <h3 className="text-base font-black uppercase tracking-wider font-['Fredoka']">
              Preescucha Melodías de Zelda en Vivo
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Toca los botones para escuchar cómo el sintetizador reproduce las canciones preguardadas en la app:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => handlePlayZeldaPreview('storms')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-duo-green/10 hover:border-duo-green border border-slate-200 dark:border-slate-700 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-black text-slate-800 dark:text-white group-hover:text-duo-green">
                  🌪️ Song of Storms
                </div>
                <div className="text-[10px] text-slate-400">Ocarina of Time</div>
              </div>
              <Play className="w-4 h-4 text-duo-green fill-duo-green" />
            </button>

            <button
              onClick={() => handlePlayZeldaPreview('healing')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-duo-purple/10 hover:border-duo-purple border border-slate-200 dark:border-slate-700 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-black text-slate-800 dark:text-white group-hover:text-duo-purple">
                  🎭 Song of Healing
                </div>
                <div className="text-[10px] text-slate-400">Majora's Mask</div>
              </div>
              <Play className="w-4 h-4 text-duo-purple fill-duo-purple" />
            </button>

            <button
              onClick={() => handlePlayZeldaPreview('lullaby')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-duo-blue/10 hover:border-duo-blue border border-slate-200 dark:border-slate-700 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-black text-slate-800 dark:text-white group-hover:text-duo-blue">
                  👑 Zelda's Lullaby
                </div>
                <div className="text-[10px] text-slate-400">Ocarina of Time</div>
              </div>
              <Play className="w-4 h-4 text-duo-blue fill-duo-blue" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 py-12 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-black text-duo-green uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-800 dark:text-white">
            ¿Tienes dudas sobre MusicGo!?
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1b272c] rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-black text-sm text-slate-800 dark:text-white flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 font-extrabold text-lg">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1b272c] p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-duo-green/15 text-3xl mx-auto flex items-center justify-center">
            🚀
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-800 dark:text-white">
            ¿Listo para empezar tu aventura musical?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Aprende a leer partituras hoy mismo gratis desde cualquier dispositivo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-black text-sm shadow-duo-btn flex items-center justify-center space-x-2"
            >
              <span>Entrar a la Aplicación Web</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="/musicgo-v1.0.0.apk"
              download="musicgo-v1.0.0.apk"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-black text-sm flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Descargar APK v1.0.0</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center space-x-4">
          <a
            href="https://github.com/joestark96/musicGo.git"
            target="_blank"
            rel="noreferrer"
            className="hover:text-duo-green transition-colors font-bold"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <button onClick={onStartApp} className="hover:text-duo-green transition-colors font-bold">
            App Web
          </button>
        </div>
        <p>© 2026 MusicGo! — Hecho con ❤️ para amantes de la música.</p>
      </footer>
    </div>
  );
};
