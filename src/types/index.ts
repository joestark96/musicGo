export type ExerciseType =
  | 'multiple-choice'
  | 'stave-identification'
  | 'listen-identify'
  | 'piano-play'
  | 'order-notes'
  | 'match-pairs'
  | 'rhythm-tap'
  | 'chord-composition';

export interface ExerciseOption {
  id: string;
  text: string;
  subtext?: string;
  noteValue?: string; // e.g. "C4", "G4"
  isCorrect?: boolean;
}

export interface MatchPair {
  id: string;
  left: string;
  leftSub?: string;
  right: string;
}

export interface StaveNoteData {
  note: string;       // e.g. "C4", "E4", "G4", "F#4", "Bb4"
  duration?: '1' | '2' | '4' | '8' | 'whole' | 'half' | 'quarter' | 'eighth';
  accidental?: '#' | 'b' | 'natural';
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  promptSub?: string;
  clef?: 'treble' | 'bass';
  staveNotes?: StaveNoteData[]; // For stave visualization
  audioNotes?: string[];        // Notes to play e.g. ["C4", "E4", "G4"] for chord or ["C4"]
  playType?: 'note' | 'chord' | 'sequence';
  targetPianoNote?: string;     // For piano-play exercises, e.g. "G4"
  options?: ExerciseOption[];
  correctAnswerId?: string;
  noteBank?: string[];          // For ordering notes, e.g. ["Sol", "Do", "Mi", "Re"]
  correctSequence?: string[];   // For ordering, e.g. ["Do", "Re", "Mi", "Sol"]
  pairs?: MatchPair[];          // For match pairs
  explanation: string;
  tip?: string;
}

export interface LessonNode {
  id: string;
  unitId: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'yellow' | 'red';
  totalSteps: number;
  unlocked: boolean;
  completedSteps: number;
  stars: number; // 0 to 3
  exercises: Exercise[];
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  nodes: LessonNode[];
}

export interface UserProfile {
  id: string;
  username: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  hearts: number;
  maxHearts: number;
  completedLessonIds: string[];
  lessonStars: Record<string, number>;
  unlockedNodes: string[];
  badges: string[];
}

export interface Flashcard {
  id: string;
  category: 'simbolos' | 'notas' | 'ritmo' | 'intervalos' | 'terminos' | 'armonia';
  frontTitle: string;
  frontSubtitle?: string;
  staveNote?: StaveNoteData;
  clef?: 'treble' | 'bass';
  audioNote?: string;
  audioNotes?: string[];
  backTitle: string;
  backDescription: string;
  example?: string;
}

export interface CompositionNote {
  id: string;
  pitch: string; // e.g. "C4", "D4", "E4" or "REST"
  duration: '1' | '2' | '4' | '8'; // 1=redonda, 2=blanca, 4=negra, 8=corchea
}

export interface SavedComposition {
  id: string;
  title: string;
  tempo: number; // BPM
  clef: 'treble' | 'bass';
  notes: CompositionNote[];
  createdAt: string;
}
