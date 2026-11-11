import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Trophy, Zap, Sparkles } from 'lucide-react';
import { sound } from '../services/sound';

type EarMode = 'pitch' | 'interval' | 'chord';

interface Question {
  prompt: string;
  notes: string[];
  playType: 'note' | 'sequence' | 'chord';
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
}

const PITCH_QUESTIONS: Question[] = [
  {
    prompt: '¿Qué nota musical estás escuchando?',
    notes: ['C4'],
    playType: 'note',
    options: [
      { label: 'Do (C4)', isCorrect: true },
      { label: 'Sol (G4)', isCorrect: false },
      { label: 'Mi (E4)', isCorrect: false },
      { label: 'La (A4)', isCorrect: false }
    ],
    explanation: 'Es el Do central (C4, 261.6 Hz), la nota base del piano.'
  },
  {
    prompt: 'Escucha este sonido más brillante:',
    notes: ['G4'],
    playType: 'note',
    options: [
      { label: 'Sol (G4)', isCorrect: true },
      { label: 'Do (C4)', isCorrect: false },
      { label: 'Fa (F4)', isCorrect: false },
      { label: 'Re (D4)', isCorrect: false }
    ],
    explanation: 'Es Sol (G4, 392 Hz), la nota de referencia de la Clave de Sol.'
  },
  {
    prompt: 'Escucha esta nota de afinación universal:',
    notes: ['A4'],
    playType: 'note',
    options: [
      { label: 'La (A4)', isCorrect: true },
      { label: 'Si (B4)', isCorrect: false },
      { label: 'Sol (G4)', isCorrect: false },
      { label: 'Mi (E4)', isCorrect: false }
    ],
    explanation: 'Es La 440 Hz (A4), el estándar internacional de afinación.'
  },
  {
    prompt: 'Escucha esta nota cálida:',
    notes: ['E4'],
    playType: 'note',
    options: [
      { label: 'Mi (E4)', isCorrect: true },
      { label: 'Do (C4)', isCorrect: false },
      { label: 'Sol (G4)', isCorrect: false },
      { label: 'Si (B4)', isCorrect: false }
    ],
    explanation: 'Es Mi (E4), la 1ª línea del pentagrama en clave de Sol.'
  }
];

const INTERVAL_QUESTIONS: Question[] = [
  {
    prompt: 'Escucha este intervalo ascendente muy estable:',
    notes: ['C4', 'G4'],
    playType: 'sequence',
    options: [
      { label: 'Quinta Justa (Do - Sol)', isCorrect: true },
      { label: 'Tercera Mayor (Do - Mi)', isCorrect: false },
      { label: 'Segunda menor', isCorrect: false },
      { label: 'Octava Justa', isCorrect: false }
    ],
    explanation: 'La Quinta Justa (7 semitonos) es el intervalo más consonante después de la octava.'
  },
  {
    prompt: 'Escucha este intervalo alegre y optimista:',
    notes: ['C4', 'E4'],
    playType: 'sequence',
    options: [
      { label: 'Tercera Mayor (Do - Mi)', isCorrect: true },
      { label: 'Tercera menor (Triste)', isCorrect: false },
      { label: 'Cuarta Justa', isCorrect: false },
      { label: 'Quinta Justa', isCorrect: false }
    ],
    explanation: 'La Tercera Mayor (4 semitonos) define la alegría y brillo de las tonalidades mayores.'
  },
  {
    prompt: 'Escucha este gran salto de notas idénticas:',
    notes: ['C4', 'C5'],
    playType: 'sequence',
    options: [
      { label: 'Octava Justa (Do4 - Do5)', isCorrect: true },
      { label: 'Segunda Mayor', isCorrect: false },
      { label: 'Quinta Justa', isCorrect: false },
      { label: 'Séptima menor', isCorrect: false }
    ],
    explanation: 'Una Octava Justa (12 semitonos) duplica exactamente la frecuencia sonora.'
  }
];

const CHORD_QUESTIONS: Question[] = [
  {
    prompt: 'Escucha la armonía de este acorde. ¿Qué cualidad tiene?',
    notes: ['C4', 'E4', 'G4'],
    playType: 'chord',
    options: [
      { label: 'Acorde Mayor (Brillante y pleno)', isCorrect: true },
      { label: 'Acorde Menor (Melancólico)', isCorrect: false },
      { label: 'Acorde Disminuido (Tenso)', isCorrect: false }
    ],
    explanation: 'Es Do Mayor (C - E - G), contiene una 3ª mayor y transmite estabilidad y optimismo.'
  },
  {
    prompt: 'Ahora escucha este otro acorde:',
    notes: ['A3', 'C4', 'E4'],
    playType: 'chord',
    options: [
      { label: 'Acorde Menor (Nostálgico)', isCorrect: true },
      { label: 'Acorde Mayor', isCorrect: false },
      { label: 'Acorde Aumentado', isCorrect: false }
    ],
    explanation: 'Es La menor (Am, A - C - E), con una 3ª menor que le da su característico color melancólico.'
  }
];

export const EarTrainingPage: React.FC = () => {
  const [mode, setMode] = useState<EarMode>('pitch');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getQuestionList = () => {
    switch (mode) {
      case 'interval': return INTERVAL_QUESTIONS;
      case 'chord': return CHORD_QUESTIONS;
      default: return PITCH_QUESTIONS;
    }
  };

  const questions = getQuestionList();
  const q = questions[currentIdx % questions.length];

  const playSound = () => {
    if (!q) return;
    if (q.playType === 'chord') {
      sound.playChord(q.notes);
    } else if (q.playType === 'sequence') {
      sound.playSequence(q.notes, 350);
    } else {
      sound.playNote(q.notes[0]);
    }
  };

  useEffect(() => {
    setFeedback(null);
    setSelectedOption(null);
    const timer = setTimeout(() => {
      playSound();
    }, 300);
    return () => clearTimeout(timer);
  }, [mode, currentIdx]);

  const handleSelectOption = (opt: { label: string; isCorrect: boolean }) => {
    if (feedback !== null) return;
    setSelectedOption(opt.label);

    if (opt.isCorrect) {
      sound.playCorrect();
      setFeedback('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
      }, 1200);
    } else {
      sound.playWrong();
      setFeedback('wrong');
      setStreak(0);
    }
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto select-none space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
            Gimnasio Auditivo
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Desarrolla tu oído relativo y musicalidad
          </p>
        </div>

        {/* Streak Counters */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-duo-green/15 text-duo-green-dark dark:text-duo-green font-black text-sm">
            <Zap className="w-4 h-4 fill-duo-green" />
            <span>{streak}</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-black text-sm">
            <Trophy className="w-4 h-4 fill-amber-400" />
            <span>{bestStreak}</span>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
        <button
          onClick={() => { setMode('pitch'); setCurrentIdx(0); }}
          className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all ${
            mode === 'pitch'
              ? 'bg-white dark:bg-slate-700 text-duo-green shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Notas Solas
        </button>
        <button
          onClick={() => { setMode('interval'); setCurrentIdx(0); }}
          className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all ${
            mode === 'interval'
              ? 'bg-white dark:bg-slate-700 text-duo-blue shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Intervalos
        </button>
        <button
          onClick={() => { setMode('chord'); setCurrentIdx(0); }}
          className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all ${
            mode === 'chord'
              ? 'bg-white dark:bg-slate-700 text-duo-purple shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Acordes
        </button>
      </div>

      {/* Big Sound Play Button Card */}
      <div className="bg-white dark:bg-[#1b272c] p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4">
        <button
          type="button"
          onClick={playSound}
          className="w-28 h-28 rounded-full bg-duo-green hover:bg-duo-green-dark text-white shadow-duo-btn flex items-center justify-center transition-transform active:translate-y-1 hover:scale-105"
        >
          <Volume2 className="w-14 h-14" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-['Fredoka']">
            {q.prompt}
          </h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">
            Toca el botón verde para repetir
          </span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt) => {
          const isSelected = selectedOption === opt.label;
          let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-duo-green';

          if (isSelected) {
            if (feedback === 'correct') {
              btnStyle = 'border-duo-green bg-duo-green-light text-duo-green-dark font-black';
            } else if (feedback === 'wrong') {
              btnStyle = 'border-duo-red bg-duo-red-light text-duo-red-dark font-black';
            }
          }

          return (
            <button
              key={opt.label}
              disabled={feedback !== null}
              onClick={() => handleSelectOption(opt)}
              className={`p-4 rounded-2xl border-2 font-bold text-sm sm:text-base text-left transition-all shadow-sm ${btnStyle}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 ${
          feedback === 'correct' ? 'bg-duo-green-light/40 border border-duo-green text-duo-green-dark' : 'bg-duo-red-light/40 border border-duo-red text-duo-red-dark'
        }`}>
          {feedback === 'correct' ? <CheckCircle2 className="w-6 h-6 flex-shrink-0" /> : <XCircle className="w-6 h-6 flex-shrink-0" />}
          <div className="text-xs sm:text-sm font-semibold">
            {q.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
