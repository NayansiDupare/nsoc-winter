import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  snowEnabled: boolean;
  toggleSnow: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      snowEnabled: true,
      toggleSnow: () => set((s) => ({ snowEnabled: !s.snowEnabled })),
      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
    }),
    {
      name: "nsoc-ui",
      // Only the snow preference survives reloads.
      partialize: (s) => ({ snowEnabled: s.snowEnabled }),
    },
  ),
);
