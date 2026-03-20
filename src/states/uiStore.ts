// src/states/uiStore.ts
import { Briefcase, Calendar, Trophy, Users } from 'lucide-react';
import { create } from 'zustand';

// تعريف شكل البيانات (Typescript Interface)
interface UIState {
  isMenuOpen: boolean;     // حالة المنيو في الموبايل
  isPaletteOpen: boolean;  // حالة لوحة الأوامر (Command Palette)
  activeSection: string;   // السكشن اللي اليوزر واقف عنده حالياً
  
  // الأكشنز (الوظائف اللي بتغير الحالة)
  toggleMenu: () => void;
  closeMenu: () => void;
  togglePalette: () => void;
  closePalette: () => void;
  setSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 1. البيانات الابتدائية (Initial State)
  isMenuOpen: false,
  isPaletteOpen: false,
  activeSection: 'hero',

  // 2. التحكم في المنيو + قفل الـ Scroll بتاع الصفحة للحفاظ على الـ UX
  toggleMenu: () => set((state) => {
    const nextState = !state.isMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : 'unset';
    }
    return { isMenuOpen: nextState, isPaletteOpen: false }; // لو فتحت المنيو، اقفل الباليت تلقائياً
  }),

  closeMenu: () => {
    if (typeof document !== 'undefined') document.body.style.overflow = 'unset';
    set({ isMenuOpen: false });
  },

  // 3. التحكم في الـ Command Palette (CMD+K)
  togglePalette: () => set((state) => {
    const nextState = !state.isPaletteOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : 'unset';
    }
    return { isPaletteOpen: nextState, isMenuOpen: false }; // لو فتحت الباليت، اقفل المنيو
  }),

  closePalette: () => {
    if (typeof document !== 'undefined') document.body.style.overflow = 'unset';
    set({ isPaletteOpen: false });
  },

  setSection: (section) => set({ activeSection: section }),
}));


// --- 3. Main Component ---
export const SKILLS = [
  { label: "Business Planning", value: 92 },
  { label: "Financial Advices", value: 90 },
  { label: "Investment Strategy", value: 85 },
  { label: "Business Security", value: 95 },
];

export const STATS = [
  { icon: Briefcase, count: "582", label: "Projects completed for our respected clients." },
  { icon: Users, count: "215+", label: "Experienced professionals serving to clients." },
  { icon: Calendar, count: "30+", label: "Years experience in business & consulting." },
  { icon: Trophy, count: "70+", label: "Business & consulting awards won over world." },
];
