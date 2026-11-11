import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Plus, Trash2, Save, Clock, RotateCcw, Volume2, Sparkles, ChevronDown, ChevronUp, Check, ArrowUp, ArrowDown, Shield } from 'lucide-react';
import { CompositionNote, SavedComposition } from '../types';
import { sound } from '../services/sound';
import { storageService } from '../services/storageService';
import { StaveVisualizer, CHORD_DEFINITIONS } from '../components/StaveVisualizer';

const FIGURE_DURATION_BEATS: Record<string, number> = {
  '1': 4.0, // Redonda (4 tiempos)
  '2': 2.0, // Blanca (2 tiempos)
  '4': 1.0, // Negra (1 tiempo)
  '8': 0.5  // Corchea (1/2 tiempo)
};

const DURATION_BUTTONS = [
  { value: '1' as const, symbol: '𝅝', name: 'Redonda', label: '4T' },
  { value: '2' as const, symbol: '𝅗𝅥', name: 'Blanca', label: '2T' },
  { value: '4' as const, symbol: '𝅘𝅥', name: 'Negra', label: '1T' },
  { value: '8' as const, symbol: '𝅘𝅥𝅮', name: 'Corchea', label: '½T' },
];

const ACCIDENTAL_BUTTONS = [
  { value: '' as const, symbol: '♮', label: 'Natural' },
  { value: '#' as const, symbol: '♯', label: 'Sostenido' },
  { value: 'b' as const, symbol: '♭', label: 'Bemol' },
];

const COMMON_CHORDS = [
  { id: 'CHORD_C', name: 'Do Mayor (C)' },
  { id: 'CHORD_D', name: 'Re Mayor (D)' },
  { id: 'CHORD_E', name: 'Mi Mayor (E)' },
  { id: 'CHORD_F', name: 'Fa Mayor (F)' },
  { id: 'CHORD_G', name: 'Sol Mayor (G)' },
  { id: 'CHORD_Am', name: 'La menor (Am)' },
  { id: 'CHORD_Dm', name: 'Re menor (Dm)' },
  { id: 'CHORD_Em', name: 'Mi menor (Em)' },
  { id: 'CHORD_G7', name: 'Sol 7 (G7)' },
];

interface PresetPiece {
  id: string;
  title: string;
  subtitle: string;
  gameCategory?: 'zelda' | 'classical';
  tempo: number;
  clef: 'treble' | 'bass';
  timeSignature: '4/4' | '3/4' | '2/4';
  notes: { pitch: string; duration: '1' | '2' | '4' | '8' }[];
}

const PRESET_PIECES: PresetPiece[] = [
  // THE LEGEND OF ZELDA: OCARINA OF TIME & MAJORA'S MASK
  {
    id: 'zelda_storms',
    title: 'Song of Storms (Canción de las Tormentas)',
    subtitle: 'Ocarina of Time / Majora\'s Mask',
    gameCategory: 'zelda',
    tempo: 136,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'D4', duration: '8' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'D5', duration: '2' },
      { pitch: 'D4', duration: '8' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'D5', duration: '2' },
      { pitch: 'E5', duration: '4' },
      { pitch: 'F5', duration: '8' },
      { pitch: 'E5', duration: '8' },
      { pitch: 'F5', duration: '8' },
      { pitch: 'E5', duration: '8' },
      { pitch: 'C5', duration: '4' },
      { pitch: 'A4', duration: '2' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'G4', duration: '8' },
      { pitch: 'A4', duration: '1' },
    ]
  },
  {
    id: 'zelda_time',
    title: 'Song of Time (Canción del Tiempo)',
    subtitle: 'Ocarina of Time / Majora\'s Mask',
    gameCategory: 'zelda',
    tempo: 108,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'A4', duration: '4' },
      { pitch: 'D4', duration: '2' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'D4', duration: '2' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'A4', duration: '8' },
      { pitch: 'C5', duration: '8' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'G4', duration: '4' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'G4', duration: '8' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'C4', duration: '4' },
      { pitch: 'E4', duration: '4' },
      { pitch: 'D4', duration: '1' },
    ]
  },
  {
    id: 'zelda_healing',
    title: 'Song of Healing (Canción de la Curación)',
    subtitle: 'Majora\'s Mask (Tema Central de Máscaras)',
    gameCategory: 'zelda',
    tempo: 92,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'F4', duration: '2' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'F4', duration: '2' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'C4', duration: '4' },
      { pitch: 'D4', duration: '1' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'F4', duration: '2' },
    ]
  },
  {
    id: 'zelda_saria',
    title: 'Saria\'s Song / Lost Woods (Bosque Perdido)',
    subtitle: 'Ocarina of Time',
    gameCategory: 'zelda',
    tempo: 140,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'F4', duration: '8' },
      { pitch: 'A4', duration: '8' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'A4', duration: '8' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'F4', duration: '8' },
      { pitch: 'A4', duration: '8' },
      { pitch: 'B4', duration: '8' },
      { pitch: 'E5', duration: '8' },
      { pitch: 'D5', duration: '4' },
      { pitch: 'B4', duration: '8' },
      { pitch: 'C5', duration: '8' },
      { pitch: 'B4', duration: '8' },
      { pitch: 'G4', duration: '8' },
      { pitch: 'E4', duration: '1' },
    ]
  },
  {
    id: 'zelda_lullaby',
    title: 'Zelda\'s Lullaby (Canción de Cuna)',
    subtitle: 'Ocarina of Time',
    gameCategory: 'zelda',
    tempo: 96,
    clef: 'treble',
    timeSignature: '3/4',
    notes: [
      { pitch: 'B4', duration: '4' },
      { pitch: 'D5', duration: '2' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'D5', duration: '2' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'D5', duration: '4' },
      { pitch: 'A5', duration: '4' },
      { pitch: 'G5', duration: '2' },
      { pitch: 'D5', duration: '4' },
      { pitch: 'C5', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '2' },
    ]
  },
  {
    id: 'zelda_epona',
    title: 'Epona\'s Song (Canción de Epona)',
    subtitle: 'Ocarina of Time / Majora\'s Mask (Rancho Romani)',
    gameCategory: 'zelda',
    tempo: 112,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'D5', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '2' },
      { pitch: 'D5', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '2' },
      { pitch: 'D5', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'A4', duration: '1' },
    ]
  },
  {
    id: 'zelda_order',
    title: 'Oath to Order (Juramento al Orden)',
    subtitle: 'Majora\'s Mask (Despertar de los 4 Gigantes)',
    gameCategory: 'zelda',
    tempo: 84,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'D5', duration: '2' },
      { pitch: 'C5', duration: '4' },
      { pitch: 'E4', duration: '2' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'G4', duration: '2' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'D4', duration: '1' },
    ]
  },

  // CLÁSICAS TRADICIONALES
  {
    id: 'classic_beethoven',
    title: 'Himno a la Alegría (Beethoven)',
    subtitle: 'Novena Sinfonía en Re menor',
    gameCategory: 'classical',
    tempo: 120,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'E4', duration: '4' },
      { pitch: 'E4', duration: '4' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'G4', duration: '4' },
      { pitch: 'G4', duration: '4' },
      { pitch: 'F4', duration: '4' },
      { pitch: 'E4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'C4', duration: '4' },
      { pitch: 'C4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'E4', duration: '4' },
      { pitch: 'E4', duration: '2' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'D4', duration: '2' },
    ]
  },
  {
    id: 'classic_pachelbel',
    title: 'Canon en Re (Pachelbel)',
    subtitle: 'Obra barroca clásica',
    gameCategory: 'classical',
    tempo: 96,
    clef: 'treble',
    timeSignature: '4/4',
    notes: [
      { pitch: 'D5', duration: '4' },
      { pitch: 'A4', duration: '4' },
      { pitch: 'B4', duration: '4' },
      { pitch: 'F#4', duration: '4' },
      { pitch: 'G4', duration: '4' },
      { pitch: 'D4', duration: '4' },
      { pitch: 'G4', duration: '4' },
      { pitch: 'A4', duration: '4' },
    ]
  }
];

const NOTE_NAME_FORMATTER: Record<string, string> = {
  'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa', 'G': 'Sol', 'A': 'La', 'B': 'Si'
};

const formatPitchDisplay = (pitch: string): string => {
  if (pitch === 'REST') return 'Silencio 𝄽';
  if (pitch.startsWith('CHORD_') && CHORD_DEFINITIONS[pitch]) {
    return CHORD_DEFINITIONS[pitch].label;
  }
  const match = pitch.match(/^([A-G])([#b]?)([0-9])$/);
  if (!match) return pitch;
  const [, letter, acc, oct] = match;
  const name = NOTE_NAME_FORMATTER[letter] || letter;
  const accSym = acc === '#' ? '♯' : acc === 'b' ? '♭' : '';
  return `${name}${accSym}${oct}`;
};

export const CompositionPage: React.FC = () => {
  const [compositionTitle, setCompositionTitle] = useState('Mi Melodía');
  const [clef, setClef] = useState<'treble' | 'bass'>('treble');
  const [timeSignature, setTimeSignature] = useState<'4/4' | '3/4' | '2/4'>('4/4');
  const [bpm, setBpm] = useState(110);

  // Selected figure and accidental for placing or editing notes
  const [selectedFigure, setSelectedFigure] = useState<'1' | '2' | '4' | '8'>('4');
  const [selectedAccidental, setSelectedAccidental] = useState<'' | '#' | 'b'>('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
  const [showChordDrawer, setShowChordDrawer] = useState(false);
  const [presetCategory, setPresetCategory] = useState<'zelda' | 'classical'>('zelda');

  const [notes, setNotes] = useState<CompositionNote[]>([
    { id: '1', pitch: 'C4', duration: '4' },
    { id: '2', pitch: 'D4', duration: '4' },
    { id: '3', pitch: 'E4', duration: '4' },
    { id: '4', pitch: 'C4', duration: '4' },
    { id: '5', pitch: 'E4', duration: '4' },
    { id: '6', pitch: 'F4', duration: '4' },
    { id: '7', pitch: 'G4', duration: '2' },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [savedSongs, setSavedSongs] = useState<SavedComposition[]>([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    setSavedSongs(storageService.getSavedCompositions());
  }, []);

  // Agregar nueva nota al final (cuando no hay ninguna seleccionada)
  const handleStaffAddNote = (pitch: string, figure: '1' | '2' | '4' | '8') => {
    setNotes(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        pitch,
        duration: figure
      }
    ]);
  };

  // Mover la nota que está seleccionada a una nueva altura al hacer clic en el pentagrama
  const handleStaffMoveSelectedNote = (newPitch: string) => {
    if (selectedNoteIndex === null) return;
    setNotes(prev =>
      prev.map((n, idx) => (idx === selectedNoteIndex ? { ...n, pitch: newPitch } : n))
    );
  };

  // Cambiar figura: Si hay nota seleccionada se la cambia a ella; si no, queda para las siguientes
  const handleSelectFigure = (fig: '1' | '2' | '4' | '8') => {
    sound.playTap();
    setSelectedFigure(fig);
    if (selectedNoteIndex !== null && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
      setNotes(prev =>
        prev.map((n, idx) => (idx === selectedNoteIndex ? { ...n, duration: fig } : n))
      );
    }
  };

  // Cambiar alteración: Si hay nota seleccionada se la aplica directamente
  const handleSelectAccidental = (acc: '' | '#' | 'b') => {
    sound.playTap();
    setSelectedAccidental(acc);
    if (selectedNoteIndex !== null && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
      const currentNote = notes[selectedNoteIndex];
      if (currentNote.pitch !== 'REST' && !currentNote.pitch.startsWith('CHORD_')) {
        const letter = currentNote.pitch[0];
        const oct = currentNote.pitch[currentNote.pitch.length - 1];
        let updatedPitch = `${letter}${oct}`;
        if (acc === '#') updatedPitch = `${letter}#${oct}`;
        else if (acc === 'b') updatedPitch = `${letter}b${oct}`;

        setNotes(prev =>
          prev.map((n, idx) => (idx === selectedNoteIndex ? { ...n, pitch: updatedPitch } : n))
        );
        sound.playNote(updatedPitch);
      }
    }
  };

  const handleAddRest = () => {
    sound.playTap();
    setNotes(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        pitch: 'REST',
        duration: selectedFigure
      }
    ]);
    setSelectedNoteIndex(null);
  };

  const handleAddChord = (chordId: string) => {
    if (CHORD_DEFINITIONS[chordId]) {
      sound.playChord(CHORD_DEFINITIONS[chordId].notes);
    }
    setNotes(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        pitch: chordId,
        duration: selectedFigure
      }
    ]);
    setSelectedNoteIndex(null);
  };

  const handleUndo = () => {
    sound.playTap();
    setNotes(prev => prev.slice(0, -1));
    if (selectedNoteIndex !== null && selectedNoteIndex >= notes.length - 1) {
      setSelectedNoteIndex(null);
    }
  };

  const handleClearAll = () => {
    if (notes.length === 0) return;
    sound.playTap();
    setNotes([]);
    setSelectedNoteIndex(null);
  };

  const handleRemoveNote = (index: number) => {
    sound.playTap();
    setNotes(prev => prev.filter((_, i) => i !== index));
    if (selectedNoteIndex === index) {
      setSelectedNoteIndex(null);
    } else if (selectedNoteIndex !== null && selectedNoteIndex > index) {
      setSelectedNoteIndex(selectedNoteIndex - 1);
    }
  };

  const handleUpdateNoteDuration = (index: number, newDuration: '1' | '2' | '4' | '8') => {
    sound.playTap();
    setNotes(prev => prev.map((n, i) => (i === index ? { ...n, duration: newDuration } : n)));
  };

  const handlePreviewNote = (pitch: string) => {
    if (pitch === 'REST') return;
    if (pitch.startsWith('CHORD_') && CHORD_DEFINITIONS[pitch]) {
      sound.playChord(CHORD_DEFINITIONS[pitch].notes);
    } else {
      sound.playNote(pitch);
    }
  };

  const handlePlayComposition = async () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setActiveStep(null);
      return;
    }

    if (notes.length === 0) return;

    setSelectedNoteIndex(null);
    setIsPlaying(true);
    isPlayingRef.current = true;

    const oneBeatMs = (60 / bpm) * 1000;

    for (let i = 0; i < notes.length; i++) {
      if (!isPlayingRef.current) break;
      setActiveStep(i);

      const note = notes[i];
      const beats = FIGURE_DURATION_BEATS[note.duration || '4'] || 1.0;
      const stepDurationMs = oneBeatMs * beats;

      if (note.pitch !== 'REST') {
        if (note.pitch.startsWith('CHORD_') && CHORD_DEFINITIONS[note.pitch]) {
          sound.playChord(CHORD_DEFINITIONS[note.pitch].notes, (stepDurationMs / 1000) * 0.95);
        } else {
          sound.playNote(note.pitch, (stepDurationMs / 1000) * 0.95);
        }
      }

      await new Promise(r => setTimeout(r, stepDurationMs));
    }

    setIsPlaying(false);
    isPlayingRef.current = false;
    setActiveStep(null);
  };

  const handleSaveSong = () => {
    const song: SavedComposition = {
      id: 'comp_' + Date.now(),
      title: compositionTitle || 'Melodía sin título',
      tempo: bpm,
      clef,
      notes,
      createdAt: new Date().toISOString().split('T')[0]
    };
    storageService.saveComposition(song);
    setSavedSongs(storageService.getSavedCompositions());
    sound.playCorrect();
  };

  const handleLoadPreset = (preset: PresetPiece) => {
    sound.playCorrect();
    setCompositionTitle(preset.title);
    setBpm(preset.tempo);
    setClef(preset.clef);
    setTimeSignature(preset.timeSignature);
    setNotes(
      preset.notes.map(n => ({
        id: Math.random().toString(36).substring(2, 9),
        pitch: n.pitch,
        duration: n.duration
      }))
    );
    setSelectedNoteIndex(null);
  };

  const handleLoadUserSong = (song: SavedComposition) => {
    sound.playTap();
    setCompositionTitle(song.title);
    setBpm(song.tempo);
    setClef(song.clef || 'treble');
    setNotes(song.notes);
    setSelectedNoteIndex(null);
  };

  // Convert for stave renderer
  const staveNotes = notes.map(n => ({
    note: n.pitch,
    duration: n.duration
  }));

  const selectedNote =
    selectedNoteIndex !== null && selectedNoteIndex < notes.length
      ? notes[selectedNoteIndex]
      : null;

  return (
    <div className="pb-28 pt-4 px-4 max-w-2xl mx-auto select-none space-y-5">
      {/* Title & Play/Save Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
            Estudio de Composición
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pica en el pentagrama para agregar notas consecutivas o editarlas
          </p>
        </div>

        {/* Action Buttons: Play & Save */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlayComposition}
            className={`px-4 py-2.5 rounded-2xl font-black text-sm flex items-center space-x-2 shadow-duo-btn transition-transform active:translate-y-0.5 ${
              isPlaying
                ? 'bg-duo-red hover:bg-duo-red-dark text-white'
                : 'bg-duo-green hover:bg-duo-green-dark text-white'
            }`}
          >
            {isPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? 'Detener' : 'Reproducir'}</span>
          </button>

          <button
            onClick={handleSaveSong}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-duo-blue text-slate-700 dark:text-slate-200 shadow-sm"
            title="Guardar composición"
          >
            <Save className="w-5 h-5 text-duo-blue" />
          </button>
        </div>
      </div>

      {/* Musical Configuration: Title, Tempo, Clef, Time Signature */}
      <div className="bg-white dark:bg-[#1b272c] p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <input
            type="text"
            value={compositionTitle}
            onChange={(e) => setCompositionTitle(e.target.value)}
            className="font-extrabold text-base text-slate-800 dark:text-white bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 focus:outline-none focus:border-duo-green pb-1 flex-1"
            placeholder="Nombre de la obra..."
          />

          {/* BPM Slider */}
          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-16">
              {bpm} BPM
            </span>
            <input
              type="range"
              min="60"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-28 accent-duo-green"
            />
          </div>
        </div>

        {/* Clef & Time Signature Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          {/* Clef Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Clave:
            </span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  sound.playTap();
                  setClef('treble');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  clef === 'treble'
                    ? 'bg-duo-green text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                𝄞 Clave de Sol
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setClef('bass');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  clef === 'bass'
                    ? 'bg-duo-orange text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                𝄢 Clave de Fa
              </button>
            </div>
          </div>

          {/* Time Signature Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Compás:
            </span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              {(['4/4', '3/4', '2/4'] as const).map((sig) => (
                <button
                  key={sig}
                  onClick={() => {
                    sound.playTap();
                    setTimeSignature(sig);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    timeSignature === sig
                      ? 'bg-duo-blue text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {sig}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tooling & Live Pentagram */}
      <div className="bg-white dark:bg-[#1b272c] p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        {/* Banner if note is selected for editing */}
        {selectedNote && selectedNoteIndex !== null ? (
          <div className="p-3 bg-amber-500/15 border-2 border-amber-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-900 font-black text-xs">
                Nota #{selectedNoteIndex + 1}
              </span>
              <span className="font-extrabold text-sm text-amber-700 dark:text-amber-300">
                {formatPitchDisplay(selectedNote.pitch)}
              </span>
              <span className="text-xs text-slate-500">
                (Toca una línea del pentagrama para moverla o cambia su figura abajo)
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => handleRemoveNote(selectedNoteIndex)}
                className="px-2 py-1 rounded-xl bg-duo-red/10 text-duo-red hover:bg-duo-red/20 text-xs font-black flex items-center space-x-1"
                title="Borrar esta nota"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar</span>
              </button>

              <button
                onClick={() => setSelectedNoteIndex(null)}
                className="px-2.5 py-1 rounded-xl bg-duo-green text-white hover:bg-duo-green-dark text-xs font-black flex items-center space-x-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Listo / Añadir</span>
              </button>
            </div>
          </div>
        ) : null}

        {/* Figure & Accidental Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Duración / Figura */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
              Figura:
            </span>
            {DURATION_BUTTONS.map((fig) => {
              const activeFigure = selectedNote ? (selectedNote.duration || '4') : selectedFigure;
              const isSelected = activeFigure === fig.value;
              return (
                <button
                  key={fig.value}
                  onClick={() => handleSelectFigure(fig.value)}
                  className={`px-2.5 py-1 rounded-xl font-black text-xs flex items-center space-x-1.5 transition-all ${
                    isSelected
                      ? selectedNote
                        ? 'bg-amber-500 text-slate-900 shadow-sm scale-105'
                        : 'bg-duo-green text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                  }`}
                  title={`${fig.name} (${fig.label})`}
                >
                  <span className="text-base leading-none">{fig.symbol}</span>
                  <span className="text-[10px] opacity-90">{fig.label}</span>
                </button>
              );
            })}
          </div>

          {/* Alteración (Natural, Sostenido, Bemol) */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
              Alteración:
            </span>
            {ACCIDENTAL_BUTTONS.map((acc) => {
              const isSelected = selectedAccidental === acc.value;
              return (
                <button
                  key={acc.value}
                  onClick={() => handleSelectAccidental(acc.value)}
                  className={`w-8 h-7 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-duo-blue text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                  }`}
                  title={acc.label}
                >
                  {acc.symbol}
                </button>
              );
            })}
          </div>

          {/* Quick Rest & Chords Button */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleAddRest}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-xs font-black flex items-center space-x-1 transition-all"
              title="Añadir silencio"
            >
              <span className="text-sm">𝄽</span>
              <span>Silencio</span>
            </button>

            <button
              onClick={() => setShowChordDrawer(!showChordDrawer)}
              className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center space-x-1 transition-all ${
                showChordDrawer
                  ? 'bg-duo-purple text-white'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acordes</span>
              {showChordDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Quick Chords Drawer */}
        {showChordDrawer && (
          <div className="p-3 bg-duo-purple/10 rounded-2xl border border-duo-purple/30 space-y-2">
            <div className="text-[11px] font-black text-duo-purple-dark dark:text-duo-purple uppercase tracking-wider">
              Toca para insertar un acorde armónico directo:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CHORDS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleAddChord(c.id)}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-duo-purple/40 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-duo-purple hover:text-white transition-all shadow-sm"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Stave Instruction */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-1">
          <span>
            {selectedNoteIndex !== null ? (
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                ✏️ Nota #{selectedNoteIndex + 1} seleccionada. Pica en el pentagrama para moverla de altura o cambia su figura arriba.
              </span>
            ) : (
              <span>
                👆 <strong>Pica en cualquier línea o espacio</strong> para agregar notas consecutivas. Toca una nota existente para editarla.
              </span>
            )}
          </span>
          <span className="font-bold text-duo-green">
            {notes.length} notas
          </span>
        </div>

        {/* The Interactive Pentagram */}
        <StaveVisualizer
          clef={clef}
          timeSignature={timeSignature}
          notes={staveNotes}
          height={165}
          activeNoteIndex={activeStep}
          selectedNoteIndex={selectedNoteIndex}
          allowAddNoteOnStaff={!isPlaying}
          selectedFigure={selectedFigure}
          selectedAccidental={selectedAccidental}
          onStaffAddNote={handleStaffAddNote}
          onStaffMoveSelectedNote={handleStaffMoveSelectedNote}
          onSelectNote={(idx) => setSelectedNoteIndex(idx)}
        />
      </div>

      {/* Sequence Timeline Strip */}
      <div className="bg-white dark:bg-[#1b272c] p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Secuencia de Notas ({notes.length})
          </h3>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleUndo}
              disabled={notes.length === 0}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-black disabled:opacity-40 transition-all"
              title="Deshacer última nota"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Deshacer</span>
            </button>

            <button
              onClick={handleClearAll}
              disabled={notes.length === 0}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-duo-red/10 hover:bg-duo-red/20 text-duo-red text-xs font-black disabled:opacity-40 transition-all"
              title="Borrar todas las notas"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-bold border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            Tu partitura está vacía. ¡Pica arriba en el pentagrama para agregar notas musicales!
          </div>
        ) : (
          /* Horizontal scrolling sequence strip */
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin pt-1">
            {notes.map((note, index) => {
              const isCurrent = activeStep === index;
              const isSelected = selectedNoteIndex === index;
              const figureSymbol = DURATION_BUTTONS.find(d => d.value === (note.duration || '4'))?.symbol || '𝅘𝅥';

              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteIndex(isSelected ? null : index)}
                  className={`flex-shrink-0 flex flex-col justify-between p-2.5 rounded-2xl border-2 transition-all w-24 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 scale-105 shadow-md ring-2 ring-amber-400/50'
                      : isCurrent
                      ? 'border-duo-green bg-duo-green-light dark:bg-duo-green/20 scale-105 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black ${isSelected ? 'text-amber-600' : 'text-slate-400'}`}>
                      #{index + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNote(index);
                      }}
                      className="text-slate-400 hover:text-duo-red p-0.5 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Note Pitch Name & Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewNote(note.pitch);
                    }}
                    className="my-1.5 flex flex-col items-center justify-center p-1 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors"
                    title="Escuchar nota"
                  >
                    <span className="text-base font-black text-slate-800 dark:text-white font-['Fredoka']">
                      {formatPitchDisplay(note.pitch)}
                    </span>
                    <span className="text-xs text-duo-green font-bold flex items-center space-x-0.5">
                      <Volume2 className="w-3 h-3" />
                      <span>{figureSymbol}</span>
                    </span>
                  </button>

                  {/* Figure mini-selector for this note */}
                  <div className="grid grid-cols-4 gap-0.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                    {DURATION_BUTTONS.map((d) => {
                      const isDurSelected = (note.duration || '4') === d.value;
                      return (
                        <button
                          key={d.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateNoteDuration(index, d.value);
                          }}
                          className={`text-[10px] font-black rounded py-0.5 transition-colors ${
                            isDurSelected
                              ? 'bg-duo-green text-white'
                              : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                          }`}
                          title={`${d.name} (${d.label})`}
                        >
                          {d.symbol}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preset Works: Zelda (OoT & Majora's Mask) + Classical & User Saved Songs */}
      <div className="bg-white dark:bg-[#1b272c] p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-duo-green" />
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Obras Preguardadas y Zelda
            </h3>
          </div>

          {/* Category Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setPresetCategory('zelda')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                presetCategory === 'zelda'
                  ? 'bg-duo-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              🗡️ Zelda (OoT & Majora's)
            </button>
            <button
              onClick={() => setPresetCategory('classical')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                presetCategory === 'classical'
                  ? 'bg-duo-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              🎼 Clásicas y Tuyas
            </button>
          </div>
        </div>

        {/* Zelda Compositions Grid */}
        {presetCategory === 'zelda' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {PRESET_PIECES.filter(p => p.gameCategory === 'zelda').map((piece) => (
              <div
                key={piece.id}
                onClick={() => handleLoadPreset(piece)}
                className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-duo-green bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800/60 dark:to-emerald-950/20 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group shadow-sm"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">🎵</span>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-white group-hover:text-duo-green transition-colors">
                      {piece.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-duo-green font-semibold">
                    {piece.subtitle}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {piece.notes.length} notas • {piece.tempo} BPM • {piece.timeSignature}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-duo-green/10 group-hover:bg-duo-green group-hover:text-white flex items-center justify-center text-duo-green transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Classical and User Saved Songs Grid */}
        {presetCategory === 'classical' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {PRESET_PIECES.filter(p => p.gameCategory === 'classical').map((piece) => (
              <div
                key={piece.id}
                onClick={() => handleLoadPreset(piece)}
                className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-duo-blue bg-slate-50 dark:bg-slate-800/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-white group-hover:text-duo-blue transition-colors">
                    {piece.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {piece.notes.length} notas • {piece.tempo} BPM • {piece.timeSignature}
                  </p>
                </div>
                <Play className="w-4 h-4 text-duo-blue fill-duo-blue" />
              </div>
            ))}

            {savedSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => handleLoadUserSong(song)}
                className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-duo-purple bg-slate-50 dark:bg-slate-800/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-white group-hover:text-duo-purple transition-colors">
                    {song.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {song.notes.length} notas • {song.tempo} BPM • Guardada: {song.createdAt}
                  </p>
                </div>
                <Play className="w-4 h-4 text-duo-purple fill-duo-purple" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
