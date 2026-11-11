import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  FileMusic,
  Piano,
  Music2,
  Headphones,
  CircleDot,
  BookOpen,
  Layers,
  User,
  MoreHorizontal
} from 'lucide-react';
import { sound } from '../services/sound';

export type NavTab =
  | 'roadmap'
  | 'stave'
  | 'piano'
  | 'compose'
  | 'eartraining'
  | 'circle'
  | 'theory'
  | 'flashcards'
  | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreMenuOpen]);

  const handleSelectTab = (tab: NavTab) => {
    sound.playTap();
    onTabChange(tab);
    setMoreMenuOpen(false);
  };

  const mainTabs = [
    { id: 'roadmap' as NavTab, label: 'Aprender', icon: Compass },
    { id: 'stave' as NavTab, label: 'Partituras', icon: FileMusic },
    { id: 'piano' as NavTab, label: 'Piano', icon: Piano },
    { id: 'compose' as NavTab, label: 'Componer', icon: Music2 },
  ];

  const moreTabs = [
    { id: 'eartraining' as NavTab, label: 'Entrenamiento Auditivo', desc: 'Identifica notas, acordes e intervalos', icon: Headphones, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { id: 'circle' as NavTab, label: 'Círculo de Quintas', desc: 'Rueda armónica de tonalidades', icon: CircleDot, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { id: 'theory' as NavTab, label: 'Manual de Teoría', desc: 'Guía completa con ejemplos sonoros', icon: BookOpen, color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40' },
    { id: 'flashcards' as NavTab, label: 'Flashcards de Repaso', desc: 'Tarjetas interactivas de símbolos y ritmo', icon: Layers, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'profile' as NavTab, label: 'Mi Perfil y Logros', desc: 'Estadísticas, insignias y racha', icon: User, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
  ];

  const isMoreActive = moreTabs.some(t => t.id === activeTab);

  return (
    <>
      {/* "Más" Popup Menu */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div
            ref={menuRef}
            className="w-full max-w-md bg-white dark:bg-[#1b272c] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-700/80 mb-16 sm:mb-0"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-extrabold text-lg text-slate-800 dark:text-white font-['Fredoka']">
                Herramientas Musicales
              </h3>
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold px-2 py-1"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-2">
              {moreTabs.map((item) => {
                const IconComponent = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-150 border text-left ${
                      isSelected
                        ? 'bg-duo-green-light/40 border-duo-green dark:bg-duo-green/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-slate-800 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'text-duo-green dark:text-duo-green font-extrabold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold'
                }`}
              >
                <Icon className={`w-6 h-6 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[11px] leading-tight tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => {
              sound.playTap();
              setMoreMenuOpen(!moreMenuOpen);
            }}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
              isMoreActive
                ? 'text-duo-purple dark:text-duo-purple font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold'
            }`}
          >
            <MoreHorizontal className="w-6 h-6 mb-0.5" />
            <span className="text-[11px] leading-tight tracking-tight">
              Más
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
