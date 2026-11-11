import React, { useState } from 'react';
import { PianoKeyboard } from '../components/PianoKeyboard';
import { sound } from '../services/sound';
import { Music, Sliders, Play, Sparkles } from 'lucide-react';

const COMMON_CHORDS: { name: string; symbol: string; notes: string[] }[] = [
  { name: 'Do Mayor', symbol: 'C', notes: ['C4', 'E4', 'G4'] },
  { name: 'Re menor', symbol: 'Dm', notes: ['D4', 'F4', 'A4'] },
  { name: 'Mi menor', symbol: 'Em', notes: ['E4', 'G4', 'B4'] },
  { name: 'Fa Mayor', symbol: 'F', notes: ['F4', 'A4', 'C5'] },
  { name: 'Sol Mayor', symbol: 'G', notes: ['G4', 'B4', 'D5'] },
  { name: 'La menor', symbol: 'Am', notes: ['A4', 'C5', 'E5'] },
  { name: 'Si disminuido', symbol: 'Bdim', notes: ['B4', 'D5', 'F5'] },
];

const SCALES: { name: string; notes: string[] }[] = [
  { name: 'Do Mayor (C)', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] },
  { name: 'Sol Mayor (G)', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5'] },
  { name: 'La menor Natural (Am)', notes: ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'] },
  { name: 'Fa Mayor (F)', notes: ['F4', 'G4', 'A4', 'Bb4', 'C5', 'D5', 'E5', 'F5'] },
  { name: 'Re Mayor (D)', notes: ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5'] },
  { name: 'Pentatónica Mayor (C)', notes: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'] },
];

export const PianoPage: React.FC = () => {
  const [notation, setNotation] = useState<'solfege' | 'scientific'>('solfege');
  const [instrument, setInstrument] = useState<'piano' | 'synth' | 'marimba'>('piano');
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [lastPlayedChord, setLastPlayedChord] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<string>('none');

  const handleInstrumentChange = (inst: 'piano' | 'synth' | 'marimba') => {
    sound.setInstrument(inst);
    setInstrument(inst);
    sound.playTap();
  };

  const handlePlayChordPreset = (chord: { name: string; symbol: string; notes: string[] }) => {
    sound.playChord(chord.notes);
    setActiveNotes(chord.notes);
    setLastPlayedChord(`${chord.name} (${chord.symbol})`);
    setTimeout(() => {
      setActiveNotes([]);
    }, 1200);
  };

  const handlePlayScale = (scale: { name: string; notes: string[] }) => {
    sound.playSequence(scale.notes, 220);
    setActiveNotes(scale.notes);
    setTimeout(() => {
      setActiveNotes([]);
    }, scale.notes.length * 220 + 400);
  };

  const currentScaleNotes = SCALES.find(s => s.name === selectedScale)?.notes || [];

  return (
    <div className="pb-28 pt-4 px-4 max-w-2xl mx-auto select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
            Piano y Armonía
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Toca libremente, explora acordes y visualiza escalas
          </p>
        </div>

        {/* Notation & Instrument controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Instrument selector */}
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
            {(['piano', 'synth', 'marimba'] as const).map((inst) => (
              <button
                key={inst}
                onClick={() => handleInstrumentChange(inst)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  instrument === inst
                    ? 'bg-white dark:bg-slate-700 text-duo-green shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {inst === 'piano' ? '🎹 Piano' : inst === 'synth' ? '🎛️ Synth' : '🪵 Marimba'}
              </button>
            ))}
          </div>

          {/* Notation toggle */}
          <button
            onClick={() => {
              sound.playTap();
              setNotation(prev => prev === 'solfege' ? 'scientific' : 'solfege');
            }}
            className="px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 shadow-sm"
          >
            {notation === 'solfege' ? 'Do-Re-Mi' : 'C-D-E'}
          </button>
        </div>
      </div>

      {/* Virtual Piano Section */}
      <div className="bg-white dark:bg-[#1b272c] p-4 sm:p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {lastPlayedChord && (
          <div className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-duo-green/20 text-duo-green-dark dark:text-duo-green font-black text-sm">
              Acorde: {lastPlayedChord}
            </span>
          </div>
        )}

        <PianoKeyboard
          startOctave={4}
          octavesCount={2}
          activeNotes={activeNotes.length > 0 ? activeNotes : currentScaleNotes}
          notation={notation}
          onNotePress={(note) => {
            // Quick note tap
          }}
        />
      </div>

      {/* Chord Presets & Harmonies */}
      <div className="bg-white dark:bg-[#1b272c] p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-['Fredoka']">
            Acordes de Do Mayor (Tríadas)
          </h3>
          <span className="text-xs text-slate-400">Toca para escuchar</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMMON_CHORDS.map((chord) => (
            <button
              key={chord.symbol}
              onClick={() => handlePlayChordPreset(chord)}
              className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-duo-green bg-slate-50 dark:bg-slate-800/60 text-left transition-all active:scale-95 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-duo-green-dark dark:text-duo-green">
                  {chord.symbol}
                </span>
                <Play className="w-3.5 h-3.5 text-slate-400 fill-slate-400" />
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {chord.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {chord.notes.map(n => n.replace(/\d+/, '')).join(' - ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scales Explorer */}
      <div className="bg-white dark:bg-[#1b272c] p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-['Fredoka']">
            Explorador de Escalas
          </h3>
          <span className="text-xs text-slate-400">Resalta en el teclado</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SCALES.map((scale) => {
            const isSelected = selectedScale === scale.name;
            return (
              <div
                key={scale.name}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-duo-blue bg-sky-50 dark:bg-sky-950/40 text-duo-blue-dark'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">
                    {scale.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {scale.notes.map(n => n.replace(/\d+/, '')).join(' ')}
                  </div>
                </div>

                <div className="flex space-x-1.5">
                  <button
                    onClick={() => {
                      sound.playTap();
                      setSelectedScale(isSelected ? 'none' : scale.name);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                      isSelected ? 'bg-duo-blue text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handlePlayScale(scale)}
                    className="p-1.5 rounded-xl bg-duo-green text-white hover:bg-duo-green-dark"
                    title="Reproducir escala completa"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
