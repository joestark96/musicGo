import React, { useState } from 'react';
import { Unit, LessonNode, UserProfile } from '../types';
import { RoadmapNode } from '../components/Roadmap/RoadmapNode';
import { CURRICULUM } from '../data/curriculumData';
import { Sparkles, Trophy, BookOpen, Flame, Music, Play } from 'lucide-react';
import { sound } from '../services/sound';

interface RoadmapPageProps {
  profile: UserProfile;
  onSelectLesson: (lesson: LessonNode) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  profile,
  onSelectLesson
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [activePreviewNode, setActivePreviewNode] = useState<LessonNode | null>(null);

  // Sync curriculum with user unlocked & stars state
  const units: Unit[] = CURRICULUM.map((unit) => ({
    ...unit,
    nodes: unit.nodes.map((node) => {
      const isUnlocked = profile.unlockedNodes.includes(node.id) || node.lessonNumber === 1 && unit.id === 1;
      const completed = profile.completedLessonIds.includes(node.id);
      const stars = profile.lessonStars[node.id] || (completed ? 3 : 0);
      return {
        ...node,
        unlocked: isUnlocked,
        completedSteps: completed ? node.totalSteps : 0,
        stars
      };
    })
  }));

  const handleStartNode = (node: LessonNode) => {
    setActivePreviewNode(null);
    onSelectLesson(node);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-xl mx-auto select-none">
      {/* Unit Selector Banner */}
      <div className="mb-6 space-y-4">
        {units.map((unit) => {
          const isCurrentUnit = unit.id === selectedUnitId;
          const completedCount = unit.nodes.filter(n => n.completedSteps >= n.totalSteps).length;
          const isUnitUnlocked = unit.id === 1 || units[unit.id - 2]?.nodes.some(n => n.completedSteps >= n.totalSteps);

          return (
            <div
              key={unit.id}
              className={`rounded-3xl border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isCurrentUnit
                  ? 'border-duo-green bg-white dark:bg-[#1b272c]'
                  : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60'
              }`}
            >
              {/* Unit Header Card */}
              <div
                onClick={() => {
                  sound.playTap();
                  setSelectedUnitId(unit.id);
                }}
                className="p-4 cursor-pointer flex items-center justify-between"
                style={{
                  borderLeft: `8px solid ${unit.themeColor}`
                }}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Unidad {unit.id}
                    </span>
                    {completedCount === unit.nodes.length && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-duo-green/20 text-duo-green-dark dark:text-duo-green">
                        ¡COMPLETA!
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-white font-['Fredoka']">
                    {unit.title.replace(/^Unidad \d+:\s*/, '')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {unit.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">
                      {completedCount}/{unit.nodes.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Nodes Tree for Active Unit */}
              {isCurrentUnit && (
                <div className="py-6 px-4 bg-slate-50/70 dark:bg-[#131f24]/50 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center">
                  <div className="space-y-4">
                    {unit.nodes.map((node, idx) => (
                      <RoadmapNode
                        key={node.id}
                        node={node}
                        offsetIndex={idx}
                        onSelectNode={(selected) => setActivePreviewNode(selected)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lesson Preview Modal Popup */}
      {activePreviewNode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1b272c] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-duo-green/15 text-3xl flex items-center justify-center">
                {activePreviewNode.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-duo-green-dark dark:text-duo-green uppercase tracking-wider">
                  Lección {activePreviewNode.lessonNumber}
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-white font-['Fredoka'] leading-tight">
                  {activePreviewNode.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {activePreviewNode.description}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>Ejercicios: {activePreviewNode.exercises.length}</span>
              <span className="text-duo-blue font-extrabold">+25 XP</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setActivePreviewNode(null)}
                className="flex-1 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-2xl text-slate-600 dark:text-slate-300 font-bold text-sm"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleStartNode(activePreviewNode)}
                className="flex-1 py-3 bg-duo-green hover:bg-duo-green-dark text-white font-black text-sm rounded-2xl shadow-duo-btn uppercase tracking-wider active:translate-y-0.5"
              >
                ¡Comenzar!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
