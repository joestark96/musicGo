import React, { useState } from 'react';
import { sound } from '../services/sound';

interface PianoKeyboardProps {
  startOctave?: number; // default 4
  octavesCount?: number; // default 2
  activeNotes?: string[];
  targetNote?: string;
  highlightTarget?: boolean; // default false
  showLabels?: boolean | 'all' | 'c-only' | 'none'; // default 'all'
  onNotePress?: (note: string) => void;
  notation?: 'solfege' | 'scientific';
  compact?: boolean;
  className?: string;
}

const SOLFEGE_MAP: Record<string, string> = {
  'C': 'Do',
  'C#': 'Do♯',
  'D': 'Re',
  'D#': 'Re♯',
  'E': 'Mi',
  'F': 'Fa',
  'F#': 'Fa♯',
  'G': 'Sol',
  'G#': 'Sol♯',
  'A': 'La',
  'A#': 'La♯',
  'B': 'Si'
};

interface KeyDef {
  note: string;       // e.g. "C4"
  basePitch: string;  // e.g. "C"
  isBlack: boolean;
  leftOffsetPercent?: number;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  startOctave = 4,
  octavesCount = 2,
  activeNotes = [],
  targetNote,
  highlightTarget = false,
  showLabels = 'all',
  onNotePress,
  notation = 'solfege',
  compact = false,
  className = ''
}) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Generate keys across requested octaves
  const whiteKeys: KeyDef[] = [];
  const blackKeys: KeyDef[] = [];

  const whiteNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackNoteConfig: Record<string, number> = {
    'C#': 1, // between C & D
    'D#': 2, // between D & E
    'F#': 4, // between F & G
    'G#': 5, // between G & A
    'A#': 6  // between A & B
  };

  let totalWhiteKeys = 0;
  for (let oct = startOctave; oct < startOctave + octavesCount; oct++) {
    whiteNoteNames.forEach((name) => {
      whiteKeys.push({
        note: `${name}${oct}`,
        basePitch: name,
        isBlack: false
      });
      totalWhiteKeys++;
    });
  }
  // Add ending high C (e.g. C6 if octavesCount=2 starting at 4)
  const topC = `C${startOctave + octavesCount}`;
  whiteKeys.push({
    note: topC,
    basePitch: 'C',
    isBlack: false
  });
  totalWhiteKeys++;

  // Calculate black keys positions based on white key indexes
  let whiteIdx = 0;
  for (let oct = startOctave; oct < startOctave + octavesCount; oct++) {
    Object.entries(blackNoteConfig).forEach(([bName, pos]) => {
      const whitePosition = (oct - startOctave) * 7 + pos;
      blackKeys.push({
        note: `${bName}${oct}`,
        basePitch: bName,
        isBlack: true,
        leftOffsetPercent: ((whitePosition - 0.35) / totalWhiteKeys) * 100
      });
    });
  }

  const handleKeyPress = (note: string) => {
    setPressedKey(note);
    sound.playNote(note);
    if (onNotePress) {
      onNotePress(note);
    }
    setTimeout(() => {
      setPressedKey(prev => prev === note ? null : prev);
    }, 250);
  };

  const getLabel = (note: string, isBlack: boolean) => {
    const pitch = note.replace(/\d+/, '');
    if (notation === 'solfege') {
      return SOLFEGE_MAP[pitch] || pitch;
    }
    return pitch;
  };

  const shouldShowLabel = (k: KeyDef) => {
    if (showLabels === false || showLabels === 'none') return false;
    if (showLabels === 'c-only') {
      return k.basePitch === 'C';
    }
    return true;
  };

  return (
    <div className={`w-full max-w-2xl mx-auto select-none ${className}`}>
      <div
        className={`relative flex justify-center bg-slate-900 p-2 sm:p-3 rounded-2xl shadow-xl border-2 border-slate-700 ${
          compact ? 'h-36' : 'h-48'
        }`}
      >
        {/* White Keys Row */}
        <div className="flex w-full h-full relative">
          {whiteKeys.map((k) => {
            const isTarget = highlightTarget && targetNote === k.note;
            const isPlaying = pressedKey === k.note || activeNotes.includes(k.note);
            const showKeyLabel = shouldShowLabel(k);

            return (
              <button
                key={k.note}
                type="button"
                onMouseDown={() => handleKeyPress(k.note)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleKeyPress(k.note);
                }}
                className={`flex-1 flex flex-col justify-end items-center pb-2 border-r border-slate-300 rounded-b-md transition-all duration-75 relative select-none ${
                  isPlaying
                    ? 'bg-duo-green-light shadow-inner transform translate-y-1'
                    : isTarget
                    ? 'bg-amber-100 ring-2 ring-amber-400'
                    : 'bg-white hover:bg-slate-50 active:bg-slate-200'
                }`}
              >
                {showKeyLabel && (
                  <>
                    <span
                      className={`text-[10px] sm:text-xs font-bold pointer-events-none transition-colors ${
                        isPlaying ? 'text-duo-green-dark' : 'text-slate-600'
                      }`}
                    >
                      {getLabel(k.note, false)}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-semibold pointer-events-none">
                      {k.note}
                    </span>
                  </>
                )}
                {!showKeyLabel && k.basePitch === 'C' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 pointer-events-none mb-1"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Black Keys Layer */}
        {blackKeys.map((k) => {
          const isTarget = highlightTarget && targetNote === k.note;
          const isPlaying = pressedKey === k.note || activeNotes.includes(k.note);
          const showKeyLabel = shouldShowLabel(k);
          const widthPercent = (1 / totalWhiteKeys) * 65;

          return (
            <button
              key={k.note}
              type="button"
              style={{
                left: `${k.leftOffsetPercent}%`,
                width: `${widthPercent}%`,
                height: compact ? '62%' : '60%'
              }}
              onMouseDown={() => handleKeyPress(k.note)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress(k.note);
              }}
              className={`absolute top-2 sm:top-3 rounded-b-md z-10 flex flex-col justify-end items-center pb-1 shadow-md transition-all duration-75 select-none ${
                isPlaying
                  ? 'bg-duo-green text-white transform translate-y-1'
                  : isTarget
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-x border-b border-black'
              }`}
            >
              {showKeyLabel && (
                <span className="text-[7px] sm:text-[9px] font-bold text-white pointer-events-none">
                  {getLabel(k.note, true)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
