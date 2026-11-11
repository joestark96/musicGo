import React, { useState, useEffect } from 'react';
import { StaveVisualizer } from '../components/StaveVisualizer';
import { PianoKeyboard } from '../components/PianoKeyboard';
import { sound } from '../services/sound';
import { Zap, RotateCcw, Trophy, CheckCircle, HelpCircle } from 'lucide-react';

const TREBLE_NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];
const BASS_NOTES = ['E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];

const NOTE_NAMES_MAP: Record<string, string> = {
  'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa', 'G': 'Sol', 'A': 'La', 'B': 'Si'
};

export const StaveReaderPage: React.FC = () => {
  const [clef, setClef] = useState<'treble' | 'bass'>('treble');
  const [currentNote, setCurrentNote] = useState<string>('G4');
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [inputMode, setInputMode] = useState<'buttons' | 'piano'>('buttons');

  const notesPool = clef === 'treble' ? TREBLE_NOTES : BASS_NOTES;

  const nextRandomNote = () => {
    let next: string;
    do {
      next = notesPool[Math.floor(Math.random() * notesPool.length)];
    } while (next === currentNote && notesPool.length > 1);
    setCurrentNote(next);
    setFeedback(null);
  };

  useEffect(() => {
    nextRandomNote();
  }, [clef]);

  const handleGuess = (pitchLetter: string) => {
    const targetLetter = currentNote.charAt(0);
    sound.playNote(currentNote);

    if (pitchLetter === targetLetter) {
      sound.playCorrect();
      setFeedback('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setTimeout(() => {
        nextRandomNote();
      }, 550);
    } else {
      sound.playWrong();
      setFeedback('wrong');
      setStreak(0);
    }
  };

  const handlePianoNote = (note: string) => {
    sound.playNote(note);
    const pressedLetter = note.replace(/\d+/, '').replace('#', '').replace('b', '');
    const targetLetter = currentNote.charAt(0);

    if (pressedLetter === targetLetter) {
      sound.playCorrect();
      setFeedback('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setTimeout(() => {
        nextRandomNote();
      }, 550);
    } else {
      sound.playWrong();
      setFeedback('wrong');
      setStreak(0);
    }
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto select-none space-y-6">
      {/* Title & Streak Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
            Lectura de Partituras
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Entrena tu velocidad de lectura a primera vista
          </p>
        </div>

        {/* Streak & Best Streak */}
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

      {/* Clef & Input Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Clef buttons */}
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setClef('treble')}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              clef === 'treble'
                ? 'bg-white dark:bg-slate-700 text-duo-green shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            𝄞 Clave de Sol
          </button>
          <button
            onClick={() => setClef('bass')}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              clef === 'bass'
                ? 'bg-white dark:bg-slate-700 text-duo-orange shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            𝄢 Clave de Fa
          </button>
        </div>

        {/* Input mode: Buttons vs Piano */}
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setInputMode('buttons')}
            className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              inputMode === 'buttons'
                ? 'bg-white dark:bg-slate-700 text-duo-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Botones
          </button>
          <button
            onClick={() => setInputMode('piano')}
            className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              inputMode === 'piano'
                ? 'bg-white dark:bg-slate-700 text-duo-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Teclado
          </button>
        </div>
      </div>

      {/* Dynamic Stave Card */}
      <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col items-center">
        {feedback === 'correct' && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 text-duo-green font-extrabold text-xs animate-bounce">
            <CheckCircle className="w-4 h-4" />
            <span>¡Correcto!</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="absolute top-3 right-3 text-duo-red font-extrabold text-xs">
            ¡Inténtalo de nuevo!
          </div>
        )}

        <StaveVisualizer
          clef={clef}
          notes={[{ note: currentNote, duration: 'quarter' }]}
          height={170}
          interactive={true}
        />

        <div className="mt-2 text-center text-xs font-semibold text-slate-400">
          Toca el pentagrama para escuchar la nota
        </div>
      </div>

      {/* Input Options Area */}
      {inputMode === 'buttons' ? (
        <div className="space-y-3">
          <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider">
            ¿Qué nota es?
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                className="py-4 bg-white dark:bg-[#1b272c] hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-duo-blue text-slate-800 dark:text-white rounded-2xl shadow-duo-btn-sm font-black text-base flex flex-col items-center justify-center transition-all active:translate-y-0.5"
              >
                <span>{NOTE_NAMES_MAP[letter]}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{letter}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider">
            Toca la nota correcta en el piano
          </div>
          <PianoKeyboard
            startOctave={clef === 'treble' ? 4 : 2}
            octavesCount={2}
            showLabels="c-only"
            highlightTarget={false}
            onNotePress={handlePianoNote}
            compact={true}
          />
        </div>
      )}
    </div>
  );
};
