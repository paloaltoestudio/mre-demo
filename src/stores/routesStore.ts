import {create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

type RouteStates = { fromAuth: boolean }
type RouteActions = { setFromAuth: (fromAuth: boolean) => void }


export const useRoutesStore = create(devtools(persist<RouteStates & RouteActions>(set => ({
  fromAuth: true,
  setFromAuth: (fromAuth) => set({ fromAuth }),
}), {
  name: "routesStore",
  storage: createJSONStorage(() => localStorage),
})));