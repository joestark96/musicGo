import React from 'react';
import { Flame, Sparkles, Heart, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';
import { sound } from '../services/sound';

interface TopBarProps {
  profile: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onRefillHearts: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  profile,
  darkMode,
  onToggleDarkMode,
  onRefillHearts
}) => {
  const [soundOn, setSoundOn] = React.useState(sound.isSoundEnabled());

  const handleToggleSound = () => {
    const next = !soundOn;
    sound.setSoundEnabled(next);
    setSoundOn(next);
    if (next) sound.playTap();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-sm transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-duo-green flex items-center justify-center text-white shadow-duo-btn-sm font-bold text-lg">
            🎵
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-800 dark:text-white leading-none font-['Fredoka'] tracking-wide">
              MusicGo!
            </h1>
            <span className="text-[10px] text-duo-green-dark dark:text-duo-green font-bold uppercase tracking-wider">
              Aprende Música
            </span>
          </div>
        </div>

        {/* Gamification Stats: Streak, XP, Hearts */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Streak Flame */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm">
            <Flame className="w-5 h-5 text-duo-orange animate-pulse fill-duo-orange" />
            <span className="font-extrabold text-sm text-duo-orange-dark dark:text-amber-400">
              {profile.streakDays}
            </span>
          </div>

          {/* XP Gems */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 shadow-sm">
            <Sparkles className="w-5 h-5 text-duo-blue fill-duo-blue" />
            <span className="font-extrabold text-sm text-duo-blue-dark dark:text-sky-400">
              {profile.xp}
            </span>
          </div>

          {/* Hearts / Lives */}
          <button
            onClick={onRefillHearts}
            title="Vidas. Toca para recargar"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm"
          >
            <Heart className="w-5 h-5 text-duo-red fill-duo-red" />
            <span className="font-extrabold text-sm text-duo-red-dark dark:text-red-400">
              {profile.hearts}
            </span>
          </button>

          {/* Audio Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title={soundOn ? 'Desactivar sonido' : 'Activar sonido'}
          >
            {soundOn ? <Volume2 className="w-5 h-5 text-duo-green" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Cambiar tema claro/oscuro"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
