import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type RouteStates = { fromAuth: boolean; typeUser: string; registry: boolean };
type RouteActions = {
  setFromAuth: (fromAuth: boolean) => void;
  setTypeUser: (typeUser: string) => void;
  setRegistry: (registry: boolean) => void;
};

export const useRoutesStore = create(
  devtools(
    persist<RouteStates & RouteActions>(
      (set) => ({
        fromAuth: true,
        typeUser: "Ciudadano",
        registry: false,
        setFromAuth: (fromAuth) => set({ fromAuth }),
        setTypeUser: (typeUser) => set({ typeUser }),
        setRegistry: (registry) => set({ registry }),
      }),
      {
        name: "routesStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
