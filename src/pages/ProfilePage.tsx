import React from 'react';
import { UserProfile } from '../types';
import { Trophy, Award, Flame, Sparkles, BookCheck, RotateCcw, Volume2, ShieldCheck } from 'lucide-react';
import { sound } from '../services/sound';
import { storageService, DEFAULT_PROFILE } from '../services/storageService';

interface ProfilePageProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

const ALL_BADGES = [
  { id: 'first_step', name: 'Primer Acorde', desc: 'Completaste tu primera lección en MusicGo!', icon: '🎵' },
  { id: 'stave_reader', name: 'Ojo de Lince', desc: 'Identificaste notas en el pentagrama', icon: '🎼' },
  { id: 'piano_touch', name: 'Manos al Piano', desc: 'Tocaste notas en el teclado virtual', icon: '🎹' },
  { id: 'rhythm_master', name: 'Reloj Humano', desc: 'Dominaste los tiempos y figuras rítmicas', icon: '⏱️' },
  { id: 'xp_master', name: 'Prodigio Musical', desc: 'Alcanzaste más de 300 puntos de XP', icon: '⚡' },
  { id: 'composer', name: 'Joven Mozart', desc: 'Guardaste tu propia composición musical', icon: '🪄' }
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onProfileUpdate
}) => {
  const handleResetProgress = () => {
    if (window.confirm('¿Seguro que deseas reiniciar tu progreso y volver al inicio?')) {
      storageService.saveProfile(DEFAULT_PROFILE);
      onProfileUpdate(DEFAULT_PROFILE);
      sound.playTap();
    }
  };

  const getLevelTitle = (xp: number) => {
    if (xp >= 500) return 'Maestro Armónico';
    if (xp >= 300) return 'Compositor Emergente';
    if (xp >= 150) return 'Lector de Claves';
    return 'Aprendiz de Solfeo';
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto select-none space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-[#1b272c] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
        <div className="w-20 h-20 rounded-2xl bg-duo-green flex items-center justify-center text-4xl shadow-duo-btn-sm">
          🧙‍♂️
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
            {profile.username}
          </h2>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-duo-green/15 text-duo-green-dark dark:text-duo-green font-black text-xs">
            Nivel: {getLevelTitle(profile.xp)}
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Miembro de MusicGo!
          </p>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-[#1b272c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Flame className="w-6 h-6 text-duo-orange fill-duo-orange mx-auto mb-1" />
          <div className="text-xl font-black text-slate-800 dark:text-white">
            {profile.streakDays}
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">
            Días Racha
          </div>
        </div>

        <div className="bg-white dark:bg-[#1b272c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Sparkles className="w-6 h-6 text-duo-blue fill-duo-blue mx-auto mb-1" />
          <div className="text-xl font-black text-slate-800 dark:text-white">
            {profile.xp}
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">
            Total XP
          </div>
        </div>

        <div className="bg-white dark:bg-[#1b272c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <BookCheck className="w-6 h-6 text-duo-green mx-auto mb-1" />
          <div className="text-xl font-black text-slate-800 dark:text-white">
            {profile.completedLessonIds.length}
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">
            Lecciones
          </div>
        </div>

        <div className="bg-white dark:bg-[#1b272c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Trophy className="w-6 h-6 text-duo-yellow fill-duo-yellow mx-auto mb-1" />
          <div className="text-xl font-black text-slate-800 dark:text-white">
            {profile.badges.length}
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">
            Insignias
          </div>
        </div>
      </div>

      {/* Badges / Medals Collection */}
      <div className="bg-white dark:bg-[#1b272c] p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-['Fredoka']">
            Vitrina de Logros Musicales
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {profile.badges.length} / {ALL_BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_BADGES.map((b) => {
            const isUnlocked = profile.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border flex items-center space-x-3 transition-all ${
                  isUnlocked
                    ? 'border-duo-green/40 bg-duo-green/5 dark:bg-duo-green/10'
                    : 'border-slate-200 dark:border-slate-800 opacity-50 bg-slate-50 dark:bg-slate-900'
                }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                  {b.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">
                    {b.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {b.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings & Reset */}
      <div className="bg-white dark:bg-[#1b272c] p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-['Fredoka']">
          Ajustes de la Aplicación
        </h3>
        <button
          onClick={handleResetProgress}
          className="w-full py-3 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-duo-red font-bold text-sm flex items-center justify-center space-x-2 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Progreso de Aprendizaje</span>
        </button>
      </div>
    </div>
  );
};
