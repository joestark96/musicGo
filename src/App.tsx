import React, { useState, useEffect } from 'react';
import { setupIonicReact, IonApp, IonContent } from '@ionic/react';
import { UserProfile, LessonNode } from './types';
import { storageService } from './services/storageService';
import { CURRICULUM } from './data/curriculumData';
import { TopBar } from './components/TopBar';
import { BottomNav, NavTab } from './components/BottomNav';
import { QuizModal } from './components/Quiz/QuizModal';
import { sound } from './services/sound';

// Pages
import { RoadmapPage } from './pages/RoadmapPage';
import { StaveReaderPage } from './pages/StaveReaderPage';
import { PianoPage } from './pages/PianoPage';
import { CompositionPage } from './pages/CompositionPage';
import { EarTrainingPage } from './pages/EarTrainingPage';
import { CircleOfFifthsPage } from './pages/CircleOfFifthsPage';
import { TheoryPage } from './pages/TheoryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ProfilePage } from './pages/ProfilePage';

// Ionic core CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact({
  mode: 'ios'
});

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getProfile());
  const [activeQuizLesson, setActiveQuizLesson] = useState<LessonNode | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    sound.playTap();
    setDarkMode(!darkMode);
  };

  const handleRefillHearts = () => {
    sound.playCorrect();
    const updated = storageService.refillHearts();
    setProfile(updated);
  };

  const handleLoseHeart = () => {
    const updated = storageService.loseHeart();
    setProfile(updated);
  };

  const handleQuizComplete = (stars: number, xpGained: number) => {
    if (!activeQuizLesson) return;
    
    // Buscar la siguiente lección en el curriculum completo
    const allNodes = CURRICULUM.flatMap(u => u.nodes);
    const currentIndex = allNodes.findIndex(n => n.id === activeQuizLesson.id);
    let nextLessonId: string | undefined = undefined;
    if (currentIndex >= 0 && currentIndex < allNodes.length - 1) {
      nextLessonId = allNodes[currentIndex + 1].id;
    }

    const updated = storageService.recordLessonComplete(
      activeQuizLesson.id,
      stars,
      xpGained,
      nextLessonId
    );
    setProfile(updated);
    setActiveQuizLesson(null);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'roadmap':
        return (
          <RoadmapPage
            profile={profile}
            onSelectLesson={(lesson) => setActiveQuizLesson(lesson)}
          />
        );
      case 'stave':
        return <StaveReaderPage />;
      case 'piano':
        return <PianoPage />;
      case 'compose':
        return <CompositionPage />;
      case 'eartraining':
        return <EarTrainingPage />;
      case 'circle':
        return <CircleOfFifthsPage />;
      case 'theory':
        return <TheoryPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      case 'profile':
        return (
          <ProfilePage
            profile={profile}
            onProfileUpdate={(updated) => setProfile(updated)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <IonApp>
      <TopBar
        profile={profile}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onRefillHearts={handleRefillHearts}
      />

      <IonContent fullscreen className="bg-[#f7f7f7] dark:bg-[#131f24]">
        <main className="min-h-full">
          {renderActivePage()}
        </main>
      </IonContent>

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Quiz Modal if a lesson is running */}
      {activeQuizLesson && (
        <QuizModal
          lesson={activeQuizLesson}
          hearts={profile.hearts}
          onLoseHeart={handleLoseHeart}
          onComplete={handleQuizComplete}
          onClose={() => setActiveQuizLesson(null)}
        />
      )}
    </IonApp>
  );
};
