import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonNode, Exercise, ExerciseOption, MatchPair } from '../../types';
import { sound } from '../../services/sound';
import { StaveVisualizer } from '../StaveVisualizer';
import { PianoKeyboard } from '../PianoKeyboard';

interface QuizModalProps {
  lesson: LessonNode;
  hearts: number;
  onLoseHeart: () => void;
  onComplete: (stars: number, xpGained: number) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  lesson,
  hearts,
  onLoseHeart,
  onComplete,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [orderedNotes, setOrderedNotes] = useState<string[]>([]);
  const [remainingBank, setRemainingBank] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'finished'>('idle');
  const [playedPianoNote, setPlayedPianoNote] = useState<string | null>(null);
  const [errorsCount, setErrorsCount] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<ExerciseOption[]>([]);
  const [shuffledRightPairs, setShuffledRightPairs] = useState<MatchPair[]>([]);

  const currentExercise: Exercise | undefined = lesson.exercises[currentIdx];
  const progressPercent = ((currentIdx) / lesson.exercises.length) * 100;

  // Initialize or reset exercise state when switching questions
  useEffect(() => {
    if (!currentExercise) return;
    setSelectedOptionId(null);
    setStatus('idle');
    setPlayedPianoNote(null);
    setSelectedLeft(null);

    // Shuffle options so the answer isn't always in the same position
    if (currentExercise.options) {
      const copy = [...currentExercise.options];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setShuffledOptions(copy);
    } else {
      setShuffledOptions([]);
    }

    if (currentExercise.type === 'order-notes') {
      setOrderedNotes([]);
      const bank = currentExercise.noteBank ? [...currentExercise.noteBank] : [];
      for (let i = bank.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bank[i], bank[j]] = [bank[j], bank[i]];
      }
      setRemainingBank(bank);
    } else if (currentExercise.type === 'match-pairs') {
      setMatchedPairs([]);
      if (currentExercise.pairs) {
        const shuffled = [...currentExercise.pairs];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Ensure the right side is NOT in the identical order as the left side
        if (shuffled.length > 1 && shuffled.every((p, idx) => p.id === currentExercise.pairs![idx].id)) {
          shuffled.reverse();
        }
        setShuffledRightPairs(shuffled);
      } else {
        setShuffledRightPairs([]);
      }
    } else if (currentExercise.type === 'listen-identify') {
      // Auto-play audio on first render
      setTimeout(() => {
        playExerciseAudio();
      }, 350);
    }
  }, [currentIdx]);

  const playExerciseAudio = () => {
    if (!currentExercise) return;
    if (currentExercise.audioNotes && currentExercise.audioNotes.length > 0) {
      if (currentExercise.playType === 'chord') {
        sound.playChord(currentExercise.audioNotes);
      } else if (currentExercise.playType === 'sequence') {
        sound.playSequence(currentExercise.audioNotes);
      } else {
        sound.playNote(currentExercise.audioNotes[0]);
      }
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let isCorrect = false;

    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'stave-identification' || currentExercise.type === 'listen-identify') {
      isCorrect = selectedOptionId === currentExercise.correctAnswerId;
    } else if (currentExercise.type === 'piano-play') {
      isCorrect = playedPianoNote === currentExercise.targetPianoNote;
    } else if (currentExercise.type === 'order-notes') {
      const targetSeq = currentExercise.correctSequence || [];
      isCorrect = orderedNotes.length === targetSeq.length &&
        orderedNotes.every((note, i) => note === targetSeq[i]);
    } else if (currentExercise.type === 'match-pairs') {
      const totalPairs = currentExercise.pairs?.length || 0;
      isCorrect = matchedPairs.length === totalPairs;
    }

    if (isCorrect) {
      sound.playCorrect();
      setStatus('correct');
    } else {
      sound.playWrong();
      setStatus('wrong');
      setErrorsCount(prev => prev + 1);
      onLoseHeart();
    }
  };

  const handleNextStep = () => {
    if (currentIdx + 1 < lesson.exercises.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished all exercises!
      setStatus('finished');
      sound.playLevelUp();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleFinishLesson = () => {
    const stars = errorsCount === 0 ? 3 : errorsCount <= 2 ? 2 : 1;
    const xpGained = 20 + stars * 5;
    onComplete(stars, xpGained);
  };

  // Ordering chips handlers
  const handlePickFromBank = (note: string, index: number) => {
    sound.playTap();
    setOrderedNotes(prev => [...prev, note]);
    setRemainingBank(prev => prev.filter((_, i) => i !== index));
  };

  const handleReturnToBank = (note: string, index: number) => {
    sound.playTap();
    setRemainingBank(prev => [...prev, note]);
    setOrderedNotes(prev => prev.filter((_, i) => i !== index));
  };

  // Match pairs handlers
  const handleSelectLeftPair = (id: string) => {
    sound.playTap();
    setSelectedLeft(id);
  };

  const handleSelectRightPair = (pairId: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === pairId) {
      sound.playCorrect();
      setMatchedPairs(prev => [...prev, pairId]);
      setSelectedLeft(null);
    } else {
      sound.playWrong();
      setSelectedLeft(null);
    }
  };

  if (!currentExercise && status !== 'finished') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#131f24] flex flex-col justify-between overflow-y-auto animate-fade-in select-none">
      {/* Top Header with Progress & Hearts */}
      <div className="max-w-2xl w-full mx-auto px-4 pt-4 pb-2 flex items-center justify-between space-x-4">
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-duo-green h-full rounded-full transition-all duration-300"
            style={{ width: `${status === 'finished' ? 100 : progressPercent}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center space-x-1">
          <Heart className="w-6 h-6 text-duo-red fill-duo-red" />
          <span className="font-extrabold text-sm text-duo-red-dark dark:text-red-400">
            {hearts}
          </span>
        </div>
      </div>

      {/* Main Exercise View or Finish View */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 flex flex-col justify-center">
        {status === 'finished' ? (
          /* Finished Screen */
          <div className="text-center py-8 space-y-6">
            <div className="text-6xl animate-bounce">🎉</div>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
              ¡Lección Completada!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Has dominado los conceptos de <span className="font-bold text-duo-green">{lesson.title}</span>. ¡Tu oído y técnica siguen creciendo!
            </p>

            {/* Stars and XP */}
            <div className="flex justify-center space-x-4 py-4">
              <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                <span className="text-xs uppercase font-extrabold text-amber-600 dark:text-amber-400">Puntaje</span>
                <span className="text-2xl font-black text-amber-500">
                  {errorsCount === 0 ? '⭐⭐⭐' : errorsCount <= 2 ? '⭐⭐' : '⭐'}
                </span>
              </div>
              <div className="bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-700 p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                <span className="text-xs uppercase font-extrabold text-sky-600 dark:text-sky-400">XP Ganados</span>
                <span className="text-2xl font-black text-duo-blue">+{20 + (errorsCount === 0 ? 15 : 10)} XP</span>
              </div>
            </div>

            <button
              onClick={handleFinishLesson}
              className="w-full max-w-sm mx-auto py-3.5 bg-duo-green hover:bg-duo-green-dark text-white font-black text-lg rounded-2xl shadow-duo-btn uppercase tracking-wider transition-transform active:translate-y-1"
            >
              ¡Continuar al Mapa!
            </button>
          </div>
        ) : (
          /* Current Exercise Body */
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
                {currentExercise.prompt}
              </h2>
              {currentExercise.promptSub && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {currentExercise.promptSub}
                </p>
              )}
            </div>

            {/* Stave identification */}
            {currentExercise.type === 'stave-identification' && currentExercise.staveNotes && (
              <div className="py-2">
                <StaveVisualizer
                  clef={currentExercise.clef || 'treble'}
                  notes={currentExercise.staveNotes}
                  interactive={false}
                />
              </div>
            )}

            {/* Listen Identify */}
            {currentExercise.type === 'listen-identify' && (
              <div className="flex flex-col items-center py-4">
                <button
                  type="button"
                  onClick={playExerciseAudio}
                  className="w-24 h-24 rounded-full bg-duo-blue hover:bg-duo-blue-dark shadow-duo-btn text-white flex items-center justify-center transition-transform active:translate-y-1"
                >
                  <Volume2 className="w-12 h-12" />
                </button>
                <span className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">
                  Toca para volver a escuchar
                </span>
              </div>
            )}

            {/* Piano Play */}
            {currentExercise.type === 'piano-play' && (
              <div className="py-2 space-y-4">
                <PianoKeyboard
                  targetNote={currentExercise.targetPianoNote}
                  highlightTarget={false}
                  showLabels="c-only"
                  onNotePress={(note) => {
                    setPlayedPianoNote(note);
                  }}
                  octavesCount={2}
                  startOctave={4}
                />
                {playedPianoNote && (
                  <div className="text-center">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      Has tocado: <span className="text-duo-blue font-extrabold">{playedPianoNote}</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Multiple Choice / Options Grid */}
            {shuffledOptions.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shuffledOptions.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      disabled={status !== 'idle'}
                      onClick={() => {
                        sound.playTap();
                        setSelectedOptionId(opt.id);
                        if (opt.noteValue) {
                          sound.playNote(opt.noteValue);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                        isSelected
                          ? 'border-duo-blue bg-duo-blue-light/30 text-duo-blue-dark dark:text-sky-300 shadow-duo-btn-sm'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {opt.subtext && (
                        <span className="text-xs text-slate-400 font-normal">
                          {opt.subtext}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Order Notes Exercise */}
            {currentExercise.type === 'order-notes' && (
              <div className="space-y-6">
                {/* Target slot box */}
                <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex flex-wrap gap-2 items-center">
                  {orderedNotes.length === 0 && (
                    <span className="text-xs font-semibold text-slate-400 mx-auto">
                      Toca las notas abajo en orden para colocarlas aquí
                    </span>
                  )}
                  {orderedNotes.map((note, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleReturnToBank(note, idx)}
                      className="px-4 py-2 bg-duo-green text-white font-extrabold text-sm rounded-xl shadow-duo-btn-sm transition-transform active:translate-y-0.5"
                    >
                      {note}
                    </button>
                  ))}
                </div>

                {/* Available Bank */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {remainingBank.map((note, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePickFromBank(note, idx)}
                      className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-extrabold text-sm rounded-xl shadow-sm hover:border-duo-green transition-all"
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Match Pairs Exercise */}
            {currentExercise.type === 'match-pairs' && currentExercise.pairs && (
              <div className="grid grid-cols-2 gap-3">
                {/* Left column */}
                <div className="space-y-2">
                  {currentExercise.pairs.map((p) => {
                    const isMatched = matchedPairs.includes(p.id);
                    const isSelected = selectedLeft === p.id;
                    return (
                      <button
                        key={p.id}
                        disabled={isMatched}
                        onClick={() => handleSelectLeftPair(p.id)}
                        className={`w-full p-3 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                          isMatched
                            ? 'opacity-40 border-slate-200 bg-slate-100 dark:bg-slate-800 text-slate-400'
                            : isSelected
                            ? 'border-duo-blue bg-sky-50 dark:bg-sky-950/40 text-duo-blue-dark'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {p.left}
                      </button>
                    );
                  })}
                </div>

                {/* Right column */}
                <div className="space-y-2">
                  {/* Shuffled right pairs */}
                  {shuffledRightPairs.map((p) => {
                    const isMatched = matchedPairs.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        disabled={isMatched || !selectedLeft}
                        onClick={() => handleSelectRightPair(p.id)}
                        className={`w-full p-3 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                          isMatched
                            ? 'opacity-40 border-slate-200 bg-slate-100 dark:bg-slate-800 text-slate-400'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-duo-blue'
                        }`}
                      >
                        {p.right}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Evaluation Sheet */}
      {status !== 'finished' && (
        <div
          className={`border-t p-4 transition-colors duration-200 ${
            status === 'correct'
              ? 'bg-duo-green-light dark:bg-duo-green/20 border-duo-green'
              : status === 'wrong'
              ? 'bg-duo-red-light dark:bg-duo-red/20 border-duo-red'
              : 'bg-white dark:bg-[#131f24] border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {status === 'correct' && (
              <div className="flex items-center space-x-3 text-duo-green-dark dark:text-duo-green">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="font-black text-lg">¡Excelente trabajo!</div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentExercise?.explanation}
                  </div>
                </div>
              </div>
            )}

            {status === 'wrong' && (
              <div className="flex items-center space-x-3 text-duo-red-dark dark:text-duo-red">
                <XCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="font-black text-lg">No es del todo correcto</div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentExercise?.explanation}
                  </div>
                </div>
              </div>
            )}

            {status === 'idle' ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  (currentExercise?.type === 'multiple-choice' || currentExercise?.type === 'stave-identification' || currentExercise?.type === 'listen-identify') && !selectedOptionId ||
                  currentExercise?.type === 'piano-play' && !playedPianoNote ||
                  currentExercise?.type === 'order-notes' && orderedNotes.length === 0
                }
                className="w-full sm:w-auto sm:min-w-[180px] py-3.5 px-6 rounded-2xl bg-duo-green hover:bg-duo-green-dark disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none text-white font-black text-base shadow-duo-btn uppercase tracking-wider transition-all active:translate-y-1"
              >
                Comprobar
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className={`w-full sm:w-auto sm:min-w-[180px] py-3.5 px-6 rounded-2xl text-white font-black text-base uppercase tracking-wider shadow-duo-btn transition-all active:translate-y-1 ${
                  status === 'correct'
                    ? 'bg-duo-green hover:bg-duo-green-dark'
                    : 'bg-duo-red hover:bg-duo-red-dark'
                }`}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
