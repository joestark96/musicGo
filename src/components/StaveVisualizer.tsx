import React, { useRef, useState, useEffect } from 'react';
import { StaveNoteData } from '../types';
import { sound } from '../services/sound';

export const CHORD_DEFINITIONS: Record<string, { label: string; symbol: string; notes: string[] }> = {
  // Acordes Mayores
  'CHORD_C': { label: 'Do Mayor', symbol: 'C', notes: ['C4', 'E4', 'G4'] },
  'CHORD_D': { label: 'Re Mayor', symbol: 'D', notes: ['D4', 'F#4', 'A4'] },
  'CHORD_E': { label: 'Mi Mayor', symbol: 'E', notes: ['E4', 'G#4', 'B4'] },
  'CHORD_F': { label: 'Fa Mayor', symbol: 'F', notes: ['F4', 'A4', 'C5'] },
  'CHORD_G': { label: 'Sol Mayor', symbol: 'G', notes: ['G4', 'B4', 'D5'] },
  'CHORD_A': { label: 'La Mayor', symbol: 'A', notes: ['A4', 'C#5', 'E5'] },
  'CHORD_B': { label: 'Si Mayor', symbol: 'B', notes: ['B4', 'D#5', 'F#5'] },

  // Acordes Menores
  'CHORD_Cm': { label: 'Do menor', symbol: 'Cm', notes: ['C4', 'Eb4', 'G4'] },
  'CHORD_Dm': { label: 'Re menor', symbol: 'Dm', notes: ['D4', 'F4', 'A4'] },
  'CHORD_Em': { label: 'Mi menor', symbol: 'Em', notes: ['E4', 'G4', 'B4'] },
  'CHORD_Fm': { label: 'Fa menor', symbol: 'Fm', notes: ['F4', 'Ab4', 'C5'] },
  'CHORD_Gm': { label: 'Sol menor', symbol: 'Gm', notes: ['G4', 'Bb4', 'D5'] },
  'CHORD_Am': { label: 'La menor', symbol: 'Am', notes: ['A4', 'C5', 'E5'] },
  'CHORD_Bm': { label: 'Si menor', symbol: 'Bm', notes: ['B4', 'D5', 'F#5'] },

  // Acordes con Séptima
  'CHORD_G7': { label: 'Sol 7', symbol: 'G7', notes: ['G4', 'B4', 'D5', 'F5'] },
  'CHORD_C7': { label: 'Do 7', symbol: 'C7', notes: ['C4', 'E4', 'G4', 'Bb4'] },
};

interface StaveVisualizerProps {
  clef?: 'treble' | 'bass';
  timeSignature?: '4/4' | '3/4' | '2/4' | '6/8' | 'none';
  notes?: StaveNoteData[];
  width?: number | string;
  height?: number;
  interactive?: boolean;
  onNoteClick?: (note: string) => void;
  showNoteNames?: boolean;
  activeNote?: string;
  activeNoteIndex?: number | null;
  selectedNoteIndex?: number | null;
  className?: string;

  // Composición interactiva directa en el pentagrama
  allowAddNoteOnStaff?: boolean;
  selectedFigure?: '1' | '2' | '4' | '8';
  selectedAccidental?: '' | '#' | 'b';
  onStaffAddNote?: (pitch: string, figure: '1' | '2' | '4' | '8') => void;
  onStaffMoveSelectedNote?: (newPitch: string) => void;
  onSelectNote?: (index: number | null) => void;
}

const TREBLE_PITCH_Y: Record<string, number> = {
  'G6': -20,
  'F6': -12.5,
  'E6': -5,
  'D6': 2.5,
  'C6': 10,
  'B5': 17.5,
  'A5': 25,   // Línea adicional sup.
  'G5': 32.5, // Sobre línea 5
  'F5': 40,   // Línea 5
  'E5': 47.5, // Espacio 4
  'D5': 55,   // Línea 4
  'C5': 62.5, // Espacio 3
  'B4': 70,   // Línea 3
  'A4': 77.5, // Espacio 2
  'G4': 85,   // Línea 2
  'F4': 92.5, // Espacio 1
  'E4': 100,  // Línea 1
  'D4': 107.5,// Bajo línea 1
  'C4': 115,  // Línea adicional Do Central
  'B3': 122.5,// Bajo Do Central
  'A3': 130,  // 2ª línea adicional inf.
  'G3': 137.5,
  'F3': 145
};

const BASS_PITCH_Y: Record<string, number> = {
  'G4': -5,
  'F4': 2.5,
  'E4': 10,
  'D4': 17.5,
  'C4': 25,   // Do Central (línea adicional sup.)
  'B3': 32.5, // Sobre línea 5
  'A3': 40,   // Línea 5
  'G3': 47.5, // Espacio 4
  'F3': 55,   // Línea 4
  'E3': 62.5, // Espacio 3
  'D3': 70,   // Línea 3
  'C3': 77.5, // Espacio 2
  'B2': 85,   // Línea 2
  'A2': 92.5, // Espacio 1
  'G2': 100,  // Línea 1
  'F2': 107.5,// Bajo línea 1
  'E2': 115,  // 1ª línea adicional inf.
  'D2': 122.5,
  'C2': 130   // 2ª línea adicional inf.
};

interface StepDefinition {
  natural: string;
  name: string;
  y: number;
  detail: string;
}

const TREBLE_STAFF_STEPS: StepDefinition[] = [
  { natural: 'G6', name: 'Sol6', y: -20, detail: 'Registro muy agudo' },
  { natural: 'F6', name: 'Fa6', y: -12.5, detail: 'Línea superior' },
  { natural: 'E6', name: 'Mi6', y: -5, detail: 'Línea adicional' },
  { natural: 'D6', name: 'Re6', y: 2.5, detail: 'Espacio superior' },
  { natural: 'C6', name: 'Do6', y: 10, detail: '2ª línea adicional sup.' },
  { natural: 'B5', name: 'Si5', y: 17.5, detail: 'Espacio sobre línea sup.' },
  { natural: 'A5', name: 'La5', y: 25, detail: '1ª línea adicional sup.' },
  { natural: 'G5', name: 'Sol5', y: 32.5, detail: 'Espacio sobre 5ª línea' },
  { natural: 'F5', name: 'Fa5', y: 40, detail: '5ª línea' },
  { natural: 'E5', name: 'Mi5', y: 47.5, detail: '4º espacio' },
  { natural: 'D5', name: 'Re5', y: 55, detail: '4ª línea' },
  { natural: 'C5', name: 'Do5', y: 62.5, detail: '3er espacio' },
  { natural: 'B4', name: 'Si4', y: 70, detail: '3ª línea central' },
  { natural: 'A4', name: 'La4', y: 77.5, detail: '2º espacio (440 Hz)' },
  { natural: 'G4', name: 'Sol4', y: 85, detail: '2ª línea (Clave de Sol)' },
  { natural: 'F4', name: 'Fa4', y: 92.5, detail: '1er espacio' },
  { natural: 'E4', name: 'Mi4', y: 100, detail: '1ª línea inferior' },
  { natural: 'D4', name: 'Re4', y: 107.5, detail: 'Espacio bajo 1ª línea' },
  { natural: 'C4', name: 'Do4', y: 115, detail: 'Do Central (1ª línea adicional)' },
  { natural: 'B3', name: 'Si3', y: 122.5, detail: 'Espacio bajo Do Central' },
  { natural: 'A3', name: 'La3', y: 130, detail: '2ª línea adicional inf.' },
  { natural: 'G3', name: 'Sol3', y: 137.5, detail: 'Espacio grave' },
];

const BASS_STAFF_STEPS: StepDefinition[] = [
  { natural: 'E4', name: 'Mi4', y: 10, detail: 'Línea superior' },
  { natural: 'D4', name: 'Re4', y: 17.5, detail: 'Espacio superior' },
  { natural: 'C4', name: 'Do4', y: 25, detail: 'Do Central (1ª línea adicional sup.)' },
  { natural: 'B3', name: 'Si3', y: 32.5, detail: 'Espacio sobre 5ª línea' },
  { natural: 'A3', name: 'La3', y: 40, detail: '5ª línea' },
  { natural: 'G3', name: 'Sol3', y: 47.5, detail: '4º espacio' },
  { natural: 'F3', name: 'Fa3', y: 55, detail: '4ª línea (Clave de Fa)' },
  { natural: 'E3', name: 'Mi3', y: 62.5, detail: '3er espacio' },
  { natural: 'D3', name: 'Re3', y: 70, detail: '3ª línea central' },
  { natural: 'C3', name: 'Do3', y: 77.5, detail: '2º espacio' },
  { natural: 'B2', name: 'Si2', y: 85, detail: '2ª línea' },
  { natural: 'A2', name: 'La2', y: 92.5, detail: '1er espacio' },
  { natural: 'G2', name: 'Sol2', y: 100, detail: '1ª línea inferior' },
  { natural: 'F2', name: 'Fa2', y: 107.5, detail: 'Espacio bajo 1ª línea' },
  { natural: 'E2', name: 'Mi2', y: 115, detail: '1ª línea adicional inf.' },
  { natural: 'D2', name: 'Re2', y: 122.5, detail: 'Espacio inferior' },
  { natural: 'C2', name: 'Do2', y: 130, detail: '2ª línea adicional inf.' },
];

const getClosestStaffPitch = (
  y: number,
  clef: 'treble' | 'bass',
  accidental: '' | '#' | 'b' = ''
): { pitch: string; label: string; y: number } => {
  const steps = clef === 'treble' ? TREBLE_STAFF_STEPS : BASS_STAFF_STEPS;
  let closest = steps[0];
  let minDiff = Math.abs(steps[0].y - y);

  for (let i = 1; i < steps.length; i++) {
    const diff = Math.abs(steps[i].y - y);
    if (diff < minDiff) {
      minDiff = diff;
      closest = steps[i];
    }
  }

  let pitch = closest.natural;
  let noteName = closest.name;
  const letter = closest.natural[0];
  const oct = closest.natural.slice(1);

  if (accidental === '#') {
    if (letter === 'E') {
      pitch = `F${oct}`;
      noteName = `${closest.name}♯`;
    } else if (letter === 'B') {
      const nextOct = parseInt(oct, 10) + 1;
      pitch = `C${nextOct}`;
      noteName = `${closest.name}♯`;
    } else {
      pitch = `${letter}#${oct}`;
      noteName = `${closest.name}♯`;
    }
  } else if (accidental === 'b') {
    if (letter === 'F') {
      pitch = `E${oct}`;
      noteName = `${closest.name}♭`;
    } else if (letter === 'C') {
      const prevOct = parseInt(oct, 10) - 1;
      pitch = `B${prevOct}`;
      noteName = `${closest.name}♭`;
    } else {
      pitch = `${letter}b${oct}`;
      noteName = `${closest.name}♭`;
    }
  }

  return {
    pitch,
    label: `${noteName} (${pitch}) • ${closest.detail}`,
    y: closest.y
  };
};

const getDurationBeats = (dur?: string): number => {
  if (dur === '1' || dur === 'whole') return 4;
  if (dur === '2' || dur === 'half') return 2;
  if (dur === '8' || dur === 'eighth') return 0.5;
  return 1;
};

export const StaveVisualizer: React.FC<StaveVisualizerProps> = ({
  clef = 'treble',
  timeSignature = '4/4',
  notes = [],
  height = 160,
  interactive = false,
  onNoteClick,
  showNoteNames = false,
  activeNote,
  activeNoteIndex,
  selectedNoteIndex = null,
  className = '',
  allowAddNoteOnStaff = false,
  selectedFigure = '4',
  selectedAccidental = '',
  onStaffAddNote,
  onStaffMoveSelectedNote,
  onSelectNote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prevNotesLength = useRef(notes.length);

  const [hoverState, setHoverState] = useState<{
    x: number;
    y: number;
    pitch: string;
    label: string;
    isEditingSelected: boolean;
  } | null>(null);

  const pitchMap = clef === 'treble' ? TREBLE_PITCH_Y : BASS_PITCH_Y;
  const staveLines = [40, 55, 70, 85, 100];

  const hasTimeSig = timeSignature && timeSignature !== 'none';
  const [sigTop, sigBottom] = hasTimeSig ? timeSignature.split('/') : ['', ''];
  const beatsPerMeasure = hasTimeSig ? parseInt(sigTop, 10) || 4 : 4;

  const noteSpacing = 58;
  const startX = hasTimeSig ? 120 : 90;
  // Extra slots to ensure plenty of room for clicking and scrolling
  const slotsCount = notes.length + 2;
  const contentWidth = startX + slotsCount * noteSpacing + 60;
  const totalSvgWidth = Math.max(480, contentWidth);
  const endStaffX = totalSvgWidth - 20;

  // Auto-scroll when new note is added at the end
  useEffect(() => {
    if (!containerRef.current) return;
    if (notes.length > prevNotesLength.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
    prevNotesLength.current = notes.length;
  }, [notes.length]);

  // Auto-scroll to follow active playback note
  useEffect(() => {
    if (activeNoteIndex !== null && activeNoteIndex !== undefined && containerRef.current) {
      const activeX = startX + activeNoteIndex * noteSpacing;
      const c = containerRef.current;
      if (activeX > c.scrollLeft + c.clientWidth - 80 || activeX < c.scrollLeft + 60) {
        c.scrollTo({
          left: Math.max(0, activeX - c.clientWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeNoteIndex]);

  const handlePress = (pitchOrChord: string) => {
    if (pitchOrChord === 'REST') return;
    if (pitchOrChord.startsWith('CHORD_') && CHORD_DEFINITIONS[pitchOrChord]) {
      sound.playChord(CHORD_DEFINITIONS[pitchOrChord].notes);
    } else {
      sound.playNote(pitchOrChord);
    }
    if (onNoteClick) {
      onNoteClick(pitchOrChord);
    }
  };

  const getSvgCoordinates = (clientX: number, clientY: number) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = totalSvgWidth / rect.width;
    const scaleY = 160 / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!allowAddNoteOnStaff) return;
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    const closest = getClosestStaffPitch(coords.y, clef, selectedAccidental);

    // Si una nota existente está seleccionada, la nota fantasma se ubica en su columna
    if (selectedNoteIndex !== null && selectedNoteIndex !== undefined && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
      setHoverState({
        x: startX + selectedNoteIndex * noteSpacing,
        y: closest.y,
        pitch: closest.pitch,
        label: `Mover Nota #${selectedNoteIndex + 1} a: ${closest.label}`,
        isEditingSelected: true
      });
      return;
    }

    // Modo normal: La nota fantasma se previsualiza en la SIGUIENTE posición
    setHoverState({
      x: startX + notes.length * noteSpacing,
      y: closest.y,
      pitch: closest.pitch,
      label: `Añadir Nota #${notes.length + 1}: ${closest.label}`,
      isEditingSelected: false
    });
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!allowAddNoteOnStaff) return;
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    const closest = getClosestStaffPitch(coords.y, clef, selectedAccidental);

    // Reproducir nota inmediatamente al picar en el pentagrama
    sound.playNote(closest.pitch, 0.4);

    if (selectedNoteIndex !== null && selectedNoteIndex !== undefined && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
      // Mueve la nota seleccionada a la nueva altura
      if (onStaffMoveSelectedNote) {
        onStaffMoveSelectedNote(closest.pitch);
      }
    } else {
      // Agrega una nueva nota con la figura y altura seleccionadas
      if (onStaffAddNote) {
        onStaffAddNote(closest.pitch, selectedFigure);
      }
    }
  };

  let currentMeasureBeats = 0;

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-x-auto scrollbar-thin select-none ${className}`}
    >
      <div className="inline-block min-w-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${totalSvgWidth} 160`}
          className={`rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm transition-shadow ${
            allowAddNoteOnStaff ? 'cursor-crosshair hover:border-duo-green/60' : ''
          }`}
          style={{ width: `${totalSvgWidth}px`, height: `${height}px`, minWidth: `${totalSvgWidth}px` }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverState(null)}
          onClick={handleSvgClick}
        >
          {/* 5 Lines of Stave */}
          {staveLines.map((y, idx) => (
            <line
              key={idx}
              x1="20"
              y1={y}
              x2={endStaffX}
              y2={y}
              stroke="currentColor"
              className="text-slate-700 dark:text-slate-300 stroke-[1.5]"
            />
          ))}

          {/* Start barline */}
          <line x1="20" y1="40" x2="20" y2="100" stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-2" />

          {/* End double barline */}
          <line x1={endStaffX - 4} y1="40" x2={endStaffX - 4} y2="100" stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[1]" />
          <line x1={endStaffX} y1="40" x2={endStaffX} y2="100" stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[3]" />

          {/* Clef */}
          {clef === 'treble' ? (
            <text x="22" y="94" fontSize="64" fontFamily="serif" className="fill-slate-800 dark:fill-slate-200 select-none pointer-events-none">
              𝄞
            </text>
          ) : (
            <text x="24" y="76" fontSize="52" fontFamily="serif" className="fill-slate-800 dark:fill-slate-200 select-none pointer-events-none">
              𝄢
            </text>
          )}

          {/* Time Signature */}
          {hasTimeSig && (
            <g className="select-none pointer-events-none font-black font-['Fredoka']">
              <text x="80" y="66" textAnchor="middle" fontSize="28" fontWeight="900" className="fill-slate-800 dark:fill-slate-200">
                {sigTop}
              </text>
              <text x="80" y="96" textAnchor="middle" fontSize="28" fontWeight="900" className="fill-slate-800 dark:fill-slate-200">
                {sigBottom}
              </text>
            </g>
          )}

          {/* Notes, Chords, Rests & Measures */}
          {notes.map((item, index) => {
            const isRest = item.note === 'REST';
            const isChord = item.note.startsWith('CHORD_');
            const chordDef = isChord ? CHORD_DEFINITIONS[item.note] : null;
            const subNotes = chordDef ? chordDef.notes : [item.note];

            const durationBeats = getDurationBeats(item.duration);
            const isWhole = item.duration === '1' || item.duration === 'whole';
            const isHalf = item.duration === '2' || item.duration === 'half';
            const isEighth = item.duration === '8' || item.duration === 'eighth';

            const xPos = startX + index * noteSpacing;
            const isPlayingActive = activeNoteIndex !== undefined && activeNoteIndex !== null
              ? activeNoteIndex === index
              : (activeNote !== undefined && activeNote === item.note);

            const isSelected = selectedNoteIndex === index;

            // Barlines calculation
            currentMeasureBeats += durationBeats;
            let drawBarline = false;
            if (currentMeasureBeats >= beatsPerMeasure && index < notes.length - 1) {
              drawBarline = true;
              currentMeasureBeats = 0;
            }
            const barLineX = xPos + (noteSpacing / 2);

            return (
              <React.Fragment key={index}>
                <g
                  className="transition-all duration-200 cursor-pointer"
                  onClick={(e) => {
                    // Detiene propagación para seleccionar esta nota y no añadir una nueva
                    e.stopPropagation();
                    handlePress(item.note);
                    if (allowAddNoteOnStaff && onSelectNote) {
                      onSelectNote(selectedNoteIndex === index ? null : index);
                    }
                  }}
                >
                  {/* Selection Glow Indicator */}
                  {isSelected && (
                    <circle
                      cx={xPos}
                      cy={70}
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      className="text-duo-yellow animate-pulse"
                    />
                  )}

                  {isRest ? (
                    /* Rest Symbols */
                    <g className="fill-slate-800 dark:fill-slate-200 text-center select-none">
                      {isWhole ? (
                        <rect x={xPos - 6} y={55} width="12" height="6" className={isSelected ? 'fill-duo-yellow' : 'fill-slate-800 dark:fill-slate-200'} />
                      ) : isHalf ? (
                        <rect x={xPos - 6} y={64} width="12" height="6" className={isSelected ? 'fill-duo-yellow' : 'fill-slate-800 dark:fill-slate-200'} />
                      ) : isEighth ? (
                        <text x={xPos} y={75} fontSize="22" fontFamily="serif" textAnchor="middle" className={isSelected ? 'fill-duo-yellow' : ''}>𝄾</text>
                      ) : (
                        <text x={xPos} y={76} fontSize="24" fontFamily="serif" textAnchor="middle" className={isSelected ? 'fill-duo-yellow' : ''}>𝄽</text>
                      )}
                    </g>
                  ) : (
                    /* Note or Chord Rendering */
                    <>
                      {subNotes.map((noteStr, sIdx) => {
                        const basePitch = noteStr.replace('#', '').replace('b', '');
                        const yPos = pitchMap[basePitch] ?? 70;
                        const hasAccidental = noteStr.includes('#') || noteStr.includes('b');
                        const accidentalChar = noteStr.includes('#') ? '♯' : '♭';

                        // Ledger lines logic
                        const needsLedger25 = yPos <= 25;
                        const needsLedger10 = yPos <= 10;
                        const needsLedger115 = yPos >= 115;
                        const needsLedger130 = yPos >= 130;

                        return (
                          <g key={sIdx}>
                            {needsLedger25 && (
                              <line x1={xPos - 13} y1={25} x2={xPos + 13} y2={25} stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[1.8]" />
                            )}
                            {needsLedger10 && (
                              <line x1={xPos - 13} y1={10} x2={xPos + 13} y2={10} stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[1.8]" />
                            )}
                            {needsLedger115 && (
                              <line x1={xPos - 13} y1={115} x2={xPos + 13} y2={115} stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[1.8]" />
                            )}
                            {needsLedger130 && (
                              <line x1={xPos - 13} y1={130} x2={xPos + 13} y2={130} stroke="currentColor" className="text-slate-700 dark:text-slate-300 stroke-[1.8]" />
                            )}

                            {/* Accidental text */}
                            {hasAccidental && (
                              <text
                                x={xPos - 13}
                                y={yPos + 5}
                                fontSize="16"
                                fontWeight="bold"
                                textAnchor="middle"
                                className={
                                  isSelected
                                    ? 'fill-duo-yellow'
                                    : isPlayingActive
                                    ? 'fill-duo-green'
                                    : 'fill-slate-900 dark:fill-white'
                                }
                              >
                                {accidentalChar}
                              </text>
                            )}

                            {/* Note head (oval) */}
                            {isWhole || isHalf ? (
                              <ellipse
                                cx={xPos}
                                cy={yPos}
                                rx="8"
                                ry="5.5"
                                transform={`rotate(-22 ${xPos} ${yPos})`}
                                className={`transition-colors duration-200 fill-white dark:fill-slate-900 ${
                                  isSelected
                                    ? 'stroke-duo-yellow stroke-[3.2]'
                                    : isPlayingActive
                                    ? 'stroke-duo-green stroke-[2.8]'
                                    : 'stroke-slate-900 dark:stroke-white stroke-[2.4]'
                                }`}
                              />
                            ) : (
                              <ellipse
                                cx={xPos}
                                cy={yPos}
                                rx="7.5"
                                ry="5.5"
                                transform={`rotate(-22 ${xPos} ${yPos})`}
                                className={`transition-colors duration-200 ${
                                  isSelected
                                    ? 'fill-duo-yellow stroke-amber-600 stroke-2'
                                    : isPlayingActive
                                    ? 'fill-duo-green stroke-duo-green-dark stroke-2'
                                    : 'fill-slate-900 dark:fill-white'
                                }`}
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* Stem rendering */}
                      {!isWhole && (
                        (() => {
                          const yValues = subNotes.map(n => pitchMap[n.replace('#', '').replace('b', '')] ?? 70);
                          const minY = Math.min(...yValues);
                          const maxY = Math.max(...yValues);
                          const midY = (minY + maxY) / 2;
                          const stemDown = midY <= 70;
                          const stemX = stemDown ? xPos - 7 : xPos + 7;
                          const stemY1 = stemDown ? maxY : minY;
                          const stemY2 = stemDown ? maxY + 35 : minY - 35;

                          return (
                            <>
                              <line
                                x1={stemX}
                                y1={stemY1}
                                x2={stemX}
                                y2={stemY2}
                                stroke="currentColor"
                                className={`stroke-[2.2] transition-colors ${
                                  isSelected
                                    ? 'text-duo-yellow'
                                    : isPlayingActive
                                    ? 'text-duo-green'
                                    : 'text-slate-900 dark:text-white'
                                }`}
                              />
                              {isEighth && !isChord && (
                                <path
                                  d={
                                    stemDown
                                      ? `M ${stemX} ${stemY2} Q ${stemX + 11} ${stemY2 - 8} ${stemX + 8} ${stemY2 - 18}`
                                      : `M ${stemX} ${stemY2} Q ${stemX + 11} ${stemY2 + 8} ${stemX + 8} ${stemY2 + 18}`
                                  }
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  className={
                                    isSelected
                                      ? 'text-duo-yellow'
                                      : isPlayingActive
                                      ? 'text-duo-green'
                                      : 'text-slate-900 dark:text-white'
                                  }
                                />
                              )}
                            </>
                          );
                        })()
                      )}

                      {/* Chord symbol or note label */}
                      {isChord && chordDef && (
                        <text
                          x={xPos}
                          y="142"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="black"
                          className="fill-duo-green-dark dark:fill-duo-green font-['Fredoka']"
                        >
                          {chordDef.symbol}
                        </text>
                      )}

                      {!isChord && showNoteNames && (
                        <text
                          x={xPos}
                          y="142"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="bold"
                          className="fill-duo-blue dark:fill-duo-blue-light font-bold"
                        >
                          {item.note}
                        </text>
                      )}
                    </>
                  )}
                </g>

                {/* Measure Barline */}
                {drawBarline && (
                  <line
                    x1={barLineX}
                    y1={40}
                    x2={barLineX}
                    y2={100}
                    stroke="currentColor"
                    className="text-slate-500 dark:text-slate-400 stroke-[1.8]"
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Interactive '+' Slot Placeholder when composing (when not editing an existing note) */}
          {allowAddNoteOnStaff && selectedNoteIndex === null && (
            <g className="pointer-events-none opacity-40">
              <circle
                cx={startX + notes.length * noteSpacing}
                cy={70}
                r="13"
                fill="none"
                stroke="currentColor"
                strokeDasharray="3 3"
                className="stroke-duo-green stroke-[1.8]"
              />
              <text
                x={startX + notes.length * noteSpacing}
                y={74}
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                className="fill-duo-green select-none"
              >
                +
              </text>
            </g>
          )}

          {/* Ghost Note Preview when hovering over the staff */}
          {allowAddNoteOnStaff && hoverState && (
            <g className="pointer-events-none transition-all">
              {/* Ledger lines for hover note */}
              {hoverState.y <= 25 && (
                <line x1={hoverState.x - 13} y1={25} x2={hoverState.x + 13} y2={25} stroke="currentColor" className="text-duo-green stroke-[1.8] opacity-75" />
              )}
              {hoverState.y <= 10 && (
                <line x1={hoverState.x - 13} y1={10} x2={hoverState.x + 13} y2={10} stroke="currentColor" className="text-duo-green stroke-[1.8] opacity-75" />
              )}
              {hoverState.y >= 115 && (
                <line x1={hoverState.x - 13} y1={115} x2={hoverState.x + 13} y2={115} stroke="currentColor" className="text-duo-green stroke-[1.8] opacity-75" />
              )}
              {hoverState.y >= 130 && (
                <line x1={hoverState.x - 13} y1={130} x2={hoverState.x + 13} y2={130} stroke="currentColor" className="text-duo-green stroke-[1.8] opacity-75" />
              )}

              {/* Accidental on ghost note */}
              {(hoverState.pitch.includes('#') || hoverState.pitch.includes('b')) && (
                <text
                  x={hoverState.x - 13}
                  y={hoverState.y + 5}
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  className={hoverState.isEditingSelected ? 'fill-duo-yellow' : 'fill-duo-green'}
                >
                  {hoverState.pitch.includes('#') ? '♯' : '♭'}
                </text>
              )}

              {/* Ghost note head */}
              {selectedFigure === '1' || selectedFigure === '2' ? (
                <ellipse
                  cx={hoverState.x}
                  cy={hoverState.y}
                  rx="8"
                  ry="5.5"
                  transform={`rotate(-22 ${hoverState.x} ${hoverState.y})`}
                  className={`${
                    hoverState.isEditingSelected
                      ? 'fill-duo-yellow/20 stroke-duo-yellow stroke-[2.2]'
                      : 'fill-duo-green/20 stroke-duo-green stroke-[2.2]'
                  }`}
                />
              ) : (
                <ellipse
                  cx={hoverState.x}
                  cy={hoverState.y}
                  rx="7.5"
                  ry="5.5"
                  transform={`rotate(-22 ${hoverState.x} ${hoverState.y})`}
                  className={`${
                    hoverState.isEditingSelected
                      ? 'fill-duo-yellow/70 stroke-amber-600 stroke-2'
                      : 'fill-duo-green/70 stroke-duo-green stroke-2'
                  }`}
                />
              )}

              {/* Ghost stem */}
              {selectedFigure !== '1' && (
                <line
                  x1={hoverState.y <= 70 ? hoverState.x - 7 : hoverState.x + 7}
                  y1={hoverState.y}
                  x2={hoverState.y <= 70 ? hoverState.x - 7 : hoverState.x + 7}
                  y2={hoverState.y <= 70 ? hoverState.y + 35 : hoverState.y - 35}
                  stroke="currentColor"
                  className={`${hoverState.isEditingSelected ? 'text-duo-yellow' : 'text-duo-green'} stroke-[2] opacity-80`}
                />
              )}

              {/* Floating note badge on top */}
              <rect
                x={Math.max(15, Math.min(totalSvgWidth - 235, hoverState.x - 110))}
                y="5"
                width="220"
                height="22"
                rx="11"
                className={
                  hoverState.isEditingSelected
                    ? 'fill-amber-500/95 dark:fill-amber-400/95 filter drop-shadow'
                    : 'fill-slate-900/95 dark:fill-duo-green/95 filter drop-shadow'
                }
              />
              <text
                x={Math.max(15, Math.min(totalSvgWidth - 235, hoverState.x - 110)) + 110}
                y="20"
                textAnchor="middle"
                className={`font-black text-[11px] font-['Fredoka'] select-none ${
                  hoverState.isEditingSelected ? 'fill-slate-900' : 'fill-white dark:fill-slate-900'
                }`}
              >
                {hoverState.label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
