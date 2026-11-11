import React, { useState } from 'react';
import { Play, Info, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../services/sound';

interface KeyInfo {
  major: string;
  minor: string;
  accidentals: string;
  count: number;
  type: 'none' | 'sharp' | 'flat';
  tonicChord: string[];
  subdominant: string;
  dominant: string;
}

const KEYS_DATA: KeyInfo[] = [
  { major: 'C', minor: 'Am', accidentals: 'Sin alteraciones (natural)', count: 0, type: 'none', tonicChord: ['C4', 'E4', 'G4'], subdominant: 'F', dominant: 'G' },
  { major: 'G', minor: 'Em', accidentals: '1 sostenido (F♯)', count: 1, type: 'sharp', tonicChord: ['G4', 'B4', 'D5'], subdominant: 'C', dominant: 'D' },
  { major: 'D', minor: 'Bm', accidentals: '2 sostenidos (F♯, C♯)', count: 2, type: 'sharp', tonicChord: ['D4', 'F#4', 'A4'], subdominant: 'G', dominant: 'A' },
  { major: 'A', minor: 'F♯m', accidentals: '3 sostenidos (F♯, C♯, G♯)', count: 3, type: 'sharp', tonicChord: ['A4', 'C#5', 'E5'], subdominant: 'D', dominant: 'E' },
  { major: 'E', minor: 'C♯m', accidentals: '4 sostenidos (F♯, C♯, G♯, D♯)', count: 4, type: 'sharp', tonicChord: ['E4', 'G#4', 'B4'], subdominant: 'A', dominant: 'B' },
  { major: 'B', minor: 'G♯m', accidentals: '5 sostenidos (F♯, C♯, G♯, D♯, A♯)', count: 5, type: 'sharp', tonicChord: ['B4', 'D#5', 'F#5'], subdominant: 'E', dominant: 'F#' },
  { major: 'F♯', minor: 'D♯m', accidentals: '6 sostenidos (o 6 bemoles en G♭)', count: 6, type: 'sharp', tonicChord: ['F#4', 'A#4', 'C#5'], subdominant: 'B', dominant: 'C#' },
  { major: 'D♭', minor: 'B♭m', accidentals: '5 bemoles (B♭, E♭, A♭, D♭, G♭)', count: 5, type: 'flat', tonicChord: ['Db4', 'F4', 'Ab4'], subdominant: 'Gb', dominant: 'Ab' },
  { major: 'A♭', minor: 'Fm', accidentals: '4 bemoles (B♭, E♭, A♭, D♭)', count: 4, type: 'flat', tonicChord: ['Ab4', 'C5', 'Eb5'], subdominant: 'Db', dominant: 'Eb' },
  { major: 'E♭', minor: 'Cm', accidentals: '3 bemoles (B♭, E♭, A♭)', count: 3, type: 'flat', tonicChord: ['Eb4', 'G4', 'Bb4'], subdominant: 'Ab', dominant: 'Bb' },
  { major: 'B♭', minor: 'Gm', accidentals: '2 bemoles (B♭, E♭)', count: 2, type: 'flat', tonicChord: ['Bb4', 'D5', 'F5'], subdominant: 'Eb', dominant: 'F' },
  { major: 'F', minor: 'Dm', accidentals: '1 bemol (B♭)', count: 1, type: 'flat', tonicChord: ['F4', 'A4', 'C5'], subdominant: 'Bb', dominant: 'C' },
];

export const CircleOfFifthsPage: React.FC = () => {
  const [selectedKeyIdx, setSelectedKeyIdx] = useState(0);

  const current = KEYS_DATA[selectedKeyIdx];

  const handleSelectKey = (idx: number) => {
    sound.playTap();
    setSelectedKeyIdx(idx);
    sound.playChord(KEYS_DATA[idx].tonicChord);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto select-none space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
          Círculo de Quintas
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          El mapa astronómico de la armonía y las armaduras
        </p>
      </div>

      {/* SVG Interactive Wheel */}
      <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
        <svg viewBox="0 0 320 320" className="w-full max-w-[290px]">
          {/* Wheel Background Circles */}
          <circle cx="160" cy="160" r="145" className="fill-slate-100 dark:fill-slate-800/80 stroke-slate-300 dark:stroke-slate-700 stroke-2" />
          <circle cx="160" cy="160" r="95" className="fill-slate-50 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700" />
          <circle cx="160" cy="160" r="50" className="fill-white dark:fill-[#1b272c] stroke-slate-200 dark:stroke-slate-700" />

          {/* 12 Key Wedges */}
          {KEYS_DATA.map((k, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const xMajor = 160 + 120 * Math.cos(angle);
            const yMajor = 160 + 120 * Math.sin(angle);

            const xMinor = 160 + 72 * Math.cos(angle);
            const yMinor = 160 + 72 * Math.sin(angle);

            const isSelected = selectedKeyIdx === i;

            return (
              <g
                key={k.major}
                onClick={() => handleSelectKey(i)}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                {/* Major Note Circle indicator */}
                {isSelected && (
                  <circle
                    cx={xMajor}
                    cy={yMajor}
                    r="18"
                    className="fill-duo-green opacity-30 animate-pulse"
                  />
                )}

                {/* Major Text */}
                <text
                  x={xMajor}
                  y={yMajor + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="bold"
                  className={isSelected ? 'fill-duo-green-dark dark:fill-duo-green font-black' : 'fill-slate-800 dark:fill-white'}
                >
                  {k.major}
                </text>

                {/* Minor Text */}
                <text
                  x={xMinor}
                  y={yMinor + 4}
                  textAnchor="middle"
                  fontSize="11"
                  className={isSelected ? 'fill-duo-blue font-bold' : 'fill-slate-400 dark:fill-slate-500'}
                >
                  {k.minor}
                </text>
              </g>
            );
          })}

          {/* Center Hub Display */}
          <text x="160" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-slate-400">
            Tonalidad
          </text>
          <text x="160" y="174" textAnchor="middle" fontSize="18" fontWeight="black" className="fill-duo-green">
            {current.major}
          </text>
        </svg>

        <span className="text-[11px] text-slate-400 mt-2 font-semibold">
          Toca cualquier tonalidad para inspeccionarla y escucharla
        </span>
      </div>

      {/* Selected Key Details Card */}
      <div className="bg-white dark:bg-[#1b272c] p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tonalidad Seleccionada
            </span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white font-['Fredoka']">
              {current.major} Mayor / {current.minor}
            </h3>
          </div>

          <button
            onClick={() => sound.playChord(current.tonicChord)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-duo-green hover:bg-duo-green-dark text-white font-bold text-xs shadow-duo-btn-sm"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar Acorde</span>
          </button>
        </div>

        {/* Armadura details */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400">Armadura:</span>
          <span className="font-extrabold text-slate-800 dark:text-white">{current.accidentals}</span>
        </div>

        {/* Primary Family Chords: I, IV, V */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Familia de Acordes Principales (I - IV - V)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-duo-green/10 border border-duo-green/30 text-center">
              <span className="text-[10px] font-bold text-duo-green-dark dark:text-duo-green uppercase block">Grado I (Tónica)</span>
              <span className="text-base font-black text-slate-800 dark:text-white">{current.major}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-duo-blue/10 border border-duo-blue/30 text-center">
              <span className="text-[10px] font-bold text-duo-blue-dark dark:text-duo-blue uppercase block">Grado IV (Subdom.)</span>
              <span className="text-base font-black text-slate-800 dark:text-white">{current.subdominant}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-duo-orange/10 border border-duo-orange/30 text-center">
              <span className="text-[10px] font-bold text-duo-orange-dark dark:text-duo-orange uppercase block">Grado V (Dominante)</span>
              <span className="text-base font-black text-slate-800 dark:text-white">{current.dominant}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
