import { UserProfile, SavedComposition } from '../types';

const PROFILE_KEY = 'musicgo_user_profile';
const COMPOSITIONS_KEY = 'musicgo_saved_compositions';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'music_student',
  username: 'Nuevo Músico',
  xp: 0,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  hearts: 5,
  maxHearts: 5,
  completedLessonIds: [],
  lessonStars: {},
  unlockedNodes: ['u1_l1'],
  badges: []
};

class StorageService {
  public getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Limpieza automática si el perfil aún tiene los datos de prueba de la plantilla inicial
        if (parsed.streakDays === 3 && parsed.xp === 120 && parsed.username === 'Músico Prodigio') {
          this.saveProfile(DEFAULT_PROFILE);
          return DEFAULT_PROFILE;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading profile from localStorage', e);
    }
    return DEFAULT_PROFILE;
  }

  public saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }

  public recordLessonComplete(lessonId: string, stars: number, xpGained: number, nextLessonId?: string): UserProfile {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    // Check streak
    if (profile.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (profile.lastActiveDate === yesterdayStr) {
        profile.streakDays += 1;
      } else {
        profile.streakDays = 1;
      }
      profile.lastActiveDate = today;
    }

    // Add XP
    profile.xp += xpGained;

    // Record stars & completion
    if (!profile.completedLessonIds.includes(lessonId)) {
      profile.completedLessonIds.push(lessonId);
    }
    profile.lessonStars[lessonId] = Math.max(profile.lessonStars[lessonId] || 0, stars);

    // Unlock next node
    if (nextLessonId && !profile.unlockedNodes.includes(nextLessonId)) {
      profile.unlockedNodes.push(nextLessonId);
    }

    // Award badges
    if (profile.completedLessonIds.length >= 1 && !profile.badges.includes('first_step')) {
      profile.badges.push('first_step');
    }
    if (profile.xp >= 300 && !profile.badges.includes('xp_master')) {
      profile.badges.push('xp_master');
    }

    this.saveProfile(profile);
    return profile;
  }

  public loseHeart(): UserProfile {
    const profile = this.getProfile();
    if (profile.hearts > 0) {
      profile.hearts -= 1;
      this.saveProfile(profile);
    }
    return profile;
  }

  public refillHearts(): UserProfile {
    const profile = this.getProfile();
    profile.hearts = profile.maxHearts;
    this.saveProfile(profile);
    return profile;
  }

  public getSavedCompositions(): SavedComposition[] {
    try {
      const raw = localStorage.getItem(COMPOSITIONS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    // Default sample compositions
    return [
      {
        id: 'comp_ode_to_joy',
        title: 'Himno a la Alegría (Beethoven)',
        tempo: 120,
        clef: 'treble',
        createdAt: '2026-11-01',
        notes: [
          { id: '1', pitch: 'E4', duration: '4' },
          { id: '2', pitch: 'E4', duration: '4' },
          { id: '3', pitch: 'F4', duration: '4' },
          { id: '4', pitch: 'G4', duration: '4' },
          { id: '5', pitch: 'G4', duration: '4' },
          { id: '6', pitch: 'F4', duration: '4' },
          { id: '7', pitch: 'E4', duration: '4' },
          { id: '8', pitch: 'D4', duration: '4' },
          { id: '9', pitch: 'C4', duration: '4' },
          { id: '10', pitch: 'C4', duration: '4' },
          { id: '11', pitch: 'D4', duration: '4' },
          { id: '12', pitch: 'E4', duration: '4' },
          { id: '13', pitch: 'E4', duration: '2' },
          { id: '14', pitch: 'D4', duration: '4' },
          { id: '15', pitch: 'D4', duration: '2' }
        ]
      },
      {
        id: 'comp_canon',
        title: 'Canon en Re (Pachelbel)',
        tempo: 96,
        clef: 'treble',
        createdAt: '2026-11-05',
        notes: [
          { id: '1', pitch: 'F#4', duration: '4' },
          { id: '2', pitch: 'E4', duration: '4' },
          { id: '3', pitch: 'D4', duration: '4' },
          { id: '4', pitch: 'C#4', duration: '4' },
          { id: '5', pitch: 'B3', duration: '4' },
          { id: '6', pitch: 'A3', duration: '4' },
          { id: '7', pitch: 'B3', duration: '4' },
          { id: '8', pitch: 'C#4', duration: '4' }
        ]
      }
    ];
  }

  public saveComposition(comp: SavedComposition): void {
    const list = this.getSavedCompositions().filter(c => c.id !== comp.id);
    list.unshift(comp);
    localStorage.setItem(COMPOSITIONS_KEY, JSON.stringify(list));
  }
}

export const storageService = new StorageService();
