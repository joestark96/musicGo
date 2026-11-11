import React, { useState, useEffect } from 'react';
import { FLASHCARDS_DECK } from '../data/flashcardsData';
import { Flashcard } from '../types';
import { RotateCw, Check, X, Sparkles, Volume2, Shuffle } from 'lucide-react';
import { sound } from '../services/sound';
import confetti from 'canvas-confetti';

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const FlashcardsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isShuffle, setIsShuffle] = useState<boolean>(true);
  const [deck, setDeck] = useState<Flashcard[]>(() => shuffleArray(FLASHCARDS_DECK));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'simbolos', label: 'Símbolos' },
    { id: 'ritmo', label: 'Ritmo' },
    { id: 'terminos', label: 'Términos' },
    { id: 'intervalos', label: 'Intervalos' },
    { id: 'notas', label: 'Notas' },
    { id: 'armonia', label: 'Armonía' }
  ];

  // Update deck when category or shuffle mode changes
  useEffect(() => {
    let filtered = selectedCategory === 'todos'
      ? FLASHCARDS_DECK
      : FLASHCARDS_DECK.filter(f => f.category === selectedCategory);

    if (isShuffle) {
      filtered = shuffleArray(filtered);
    }
    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, isShuffle]);

  const card: Flashcard | undefined = deck[currentIndex % Math.max(deck.length, 1)];

  const handleFlip = () => {
    sound.playTap();
    setIsFlipped(!isFlipped);
  };

  const handlePlayCardAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card?.audioNote) {
      sound.playNote(card.audioNote);
    } else if (card?.audioNotes && card.audioNotes.length > 0) {
      sound.playChord(card.audioNotes);
    } else {
      sound.playTap();
    }
  };

  const handleNextCard = (known: boolean) => {
    if (known) {
      sound.playCorrect();
      setMasteredCount(prev => prev + 1);
    } else {
      sound.playWrong();
    }

    setIsFlipped(false);
    if (currentIndex + 1 >= deck.length) {
      // Completed round
      confetti({
        particleCount: 80,
        spread: 60
      });
      // Re-shuffle for next round if shuffle is on
      if (isShuffle) {
        setDeck(shuffleArray(deck));
      }
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleManualShuffle = () => {
    sound.playTap();
    setDeck(shuffleArray(deck));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto select-none space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
            Flashcards de Repaso
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {deck.length} tarjetas interactivas de teoría, símbolos y oído
          </p>
        </div>

        {/* Counter & Shuffle Action */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleManualShuffle}
            className={`p-2 rounded-xl border text-xs font-black flex items-center space-x-1 transition-all ${
              isShuffle
                ? 'bg-duo-purple/15 text-duo-purple-dark dark:text-duo-purple border-duo-purple/30'
                : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Barajar tarjetas aleatoriamente"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <div className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-700 dark:text-amber-300 font-extrabold text-xs">
            {deck.length > 0 ? currentIndex + 1 : 0} / {deck.length}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              sound.playTap();
              setSelectedCategory(c.id);
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-duo-purple text-white shadow-duo-btn-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3D Flip Card */}
      {card && (
        <div className="perspective-1000 py-2">
          <div
            onClick={handleFlip}
            className={`w-full min-h-[300px] cursor-pointer rounded-3xl border-2 transition-all duration-300 transform p-8 flex flex-col justify-between text-center shadow-md relative ${
              isFlipped
                ? 'bg-duo-purple-light dark:bg-duo-purple/20 border-duo-purple'
                : 'bg-white dark:bg-[#1b272c] border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {/* Top row badge */}
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <span>{card.category}</span>
              <span className="flex items-center space-x-1 text-duo-purple">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Voltear a pregunta' : 'Toca para voltear'}</span>
              </span>
            </div>

            {/* Front & Back Content */}
            {!isFlipped ? (
              <div className="my-auto space-y-4">
                <div className="text-6xl font-black text-slate-800 dark:text-white font-['Fredoka']">
                  {card.frontTitle}
                </div>
                {card.frontSubtitle && (
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    {card.frontSubtitle}
                  </p>
                )}
              </div>
            ) : (
              <div className="my-auto space-y-3 animate-fade-in">
                <h3 className="text-2xl font-black text-duo-purple-dark dark:text-duo-purple font-['Fredoka']">
                  {card.backTitle}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-md mx-auto">
                  {card.backDescription}
                </p>
                {card.example && (
                  <div className="inline-block px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
                    💡 {card.example}
                  </div>
                )}
              </div>
            )}

            {/* Audio Preview if available */}
            {(card.audioNote || (card.audioNotes && card.audioNotes.length > 0)) && (
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handlePlayCardAudio}
                  className="px-3 py-1 rounded-xl bg-duo-blue/15 text-duo-blue text-xs font-bold flex items-center space-x-1 hover:bg-duo-blue/25"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar sonido</span>
                </button>
              </div>
            )}

            <div className="text-[11px] font-bold text-slate-400">
              {isFlipped ? '¿Lo sabías?' : 'Haz clic en la tarjeta para revelar la respuesta'}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Review Actions */}
      <div className="flex space-x-3 pt-1">
        <button
          onClick={() => handleNextCard(false)}
          className="flex-1 py-3.5 rounded-2xl bg-duo-red/10 hover:bg-duo-red/20 text-duo-red font-black text-sm flex items-center justify-center space-x-2 transition-all active:translate-y-0.5"
        >
          <X className="w-5 h-5 stroke-[3]" />
          <span>Aún no me lo sé</span>
        </button>

        <button
          onClick={() => handleNextCard(true)}
          className="flex-1 py-3.5 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-black text-sm shadow-duo-btn flex items-center justify-center space-x-2 transition-all active:translate-y-0.5"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>¡Ya me lo sé!</span>
        </button>
      </div>

      {/* Progress Footer */}
      <div className="text-center text-xs font-bold text-slate-400 flex items-center justify-center space-x-1">
        <Sparkles className="w-3.5 h-3.5 text-duo-yellow" />
        <span>Tarjetas dominadas en esta sesión: {masteredCount}</span>
      </div>
    </div>
  );
};
