import React from 'react';
import { Check, Lock, Star } from 'lucide-react';
import { LessonNode } from '../../types';
import { sound } from '../../services/sound';

interface RoadmapNodeProps {
  node: LessonNode;
  offsetIndex: number;
  onSelectNode: (node: LessonNode) => void;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  node,
  offsetIndex,
  onSelectNode
}) => {
  // Sine wave zigzag offset (-38px, 0px, +38px, 0px)
  const offsets = [0, 42, 0, -42];
  const xOffset = offsets[offsetIndex % 4];

  const isCompleted = node.completedSteps >= node.totalSteps;
  const isUnlocked = node.unlocked;

  const handleClick = () => {
    if (!isUnlocked) {
      sound.playWrong();
      return;
    }
    sound.playTap();
    onSelectNode(node);
  };

  return (
    <div
      className="flex flex-col items-center my-3 relative transition-transform duration-300"
      style={{ transform: `translateX(${xOffset}px)` }}
    >
      {/* Node Button */}
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center relative transition-all duration-150 select-none group ${
          !isUnlocked
            ? 'bg-slate-300 dark:bg-slate-700 shadow-[0_6px_0_0_#94a3b8] dark:shadow-[0_6px_0_0_#334155] cursor-not-allowed opacity-80'
            : isCompleted
            ? 'bg-duo-yellow hover:bg-duo-yellow-dark shadow-[0_6px_0_0_#e5b400] active:translate-y-1 active:shadow-[0_2px_0_0_#e5b400]'
            : 'bg-duo-green hover:bg-duo-green-dark shadow-[0_6px_0_0_#46a302] active:translate-y-1 active:shadow-[0_2px_0_0_#46a302] ring-4 ring-duo-green-light animate-bounce-subtle'
        }`}
      >
        {/* Pulsating glow for active next lesson */}
        {isUnlocked && !isCompleted && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-duo-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-duo-green"></span>
          </span>
        )}

        {/* Center icon */}
        <div className="text-2xl sm:text-3xl filter drop-shadow">
          {!isUnlocked ? (
            <Lock className="w-7 h-7 text-slate-500 dark:text-slate-400" />
          ) : isCompleted ? (
            <Check className="w-9 h-9 text-white stroke-[3.5]" />
          ) : (
            node.icon
          )}
        </div>

        {/* Stars earned underneath */}
        {isCompleted && (
          <div className="absolute -bottom-2 flex space-x-0.5 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-3.5 h-3.5 ${
                  starIdx <= (node.stars || 3)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
        )}
      </button>

      {/* Label under node */}
      <div className="mt-2 text-center max-w-[140px]">
        <div className="font-extrabold text-xs text-slate-700 dark:text-slate-200 leading-tight">
          {node.title}
        </div>
      </div>
    </div>
  );
};
