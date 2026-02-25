import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

const useWindowStore = create(immer((set) => ({
    windows: WINDOW_CONFIG,
    dynamicWindows: [], // [{ key, data, zIndex, isOpen }]
    nextZIndex: INITIAL_Z_INDEX + 1,

    // --- Static windows (existing behavior) ---
    openWindow: (windowKey, data = null) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
    }),

    closeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
    }),

    focusWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
    }),

    // --- Dynamic windows (for photos, multiple images, etc.) ---
    openDynamicWindow: (data) => set((state) => {
        const key = `dynamic_${Date.now()}`;
        state.dynamicWindows.push({
            key,
            data,
            zIndex: state.nextZIndex++,
            isOpen: true,
        });
    }),

    closeDynamicWindow: (key) => set((state) => {
        state.dynamicWindows = state.dynamicWindows.filter(w => w.key !== key);
    }),

    focusDynamicWindow: (key) => set((state) => {
        const win = state.dynamicWindows.find(w => w.key === key);
        if (!win) return;
        win.zIndex = state.nextZIndex++;
    }),
})));

export default useWindowStore;