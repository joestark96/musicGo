import React, { useState } from 'react';
import { THEORY_TOPICS, TheoryTopic } from '../data/theoryData';
import { StaveVisualizer } from '../components/StaveVisualizer';
import { BookOpen, Clock, ChevronDown, ChevronUp, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../services/sound';

export const TheoryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('el-pentagrama-y-claves');

  const categories = ['Todos', 'Fundamentos', 'Ritmo', 'Escalas', 'Armonía', 'Composición'];

  const filteredTopics = selectedCategory === 'Todos'
    ? THEORY_TOPICS
    : THEORY_TOPICS.filter(t => t.category === selectedCategory);

  const toggleExpand = (id: string) => {
    sound.playTap();
    setExpandedTopicId(prev => prev === id ? null : id);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-2xl mx-auto select-none space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white font-['Fredoka']">
          Manual de Teoría Musical
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Guías claras, diagramas y fundamentos explicados paso a paso
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playTap();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-duo-green text-white shadow-duo-btn-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Theory Articles List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <div
              key={topic.id}
              className={`rounded-3xl border-2 transition-all duration-200 overflow-hidden bg-white dark:bg-[#1b272c] ${
                isExpanded
                  ? 'border-duo-blue shadow-md'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(topic.id)}
                className="p-5 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-duo-blue">
                      {topic.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <div className="flex items-center text-[10px] font-bold text-slate-400 space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{topic.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-800 dark:text-white font-['Fredoka'] mt-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {topic.subtitle}
                  </p>
                </div>

                <div className="p-2 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-4">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                    {topic.summary}
                  </p>

                  {/* Stave diagram if available */}
                  {topic.staveNotes && (
                    <div className="py-2">
                      <StaveVisualizer
                        clef={topic.clef || 'treble'}
                        notes={topic.staveNotes}
                        height={150}
                        interactive={true}
                        showNoteNames={true}
                      />
                    </div>
                  )}

                  {/* Sections */}
                  {topic.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2 pt-2">
                      <h4 className="font-extrabold text-sm text-slate-800 dark:text-white font-['Fredoka']">
                        {sec.heading}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {sec.content}
                      </p>

                      {sec.highlightBox && (
                        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300">
                          {sec.highlightBox}
                        </div>
                      )}

                      {sec.bulletPoints && (
                        <ul className="space-y-1.5 pl-2">
                          {sec.bulletPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start space-x-2">
                              <span className="text-duo-green font-black">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
