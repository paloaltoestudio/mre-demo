import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { ConsulatesType } from "../types/dashboard/AppointmentTypes";

type SchedulingsStoreType = {
  scheduled: {
    city: { value: string; label: string };
    consulate: ConsulatesType;
    country: { value: string; label: string; icon: string };
    date: Date;
    dependientesCount: number;
    parents: {
      names: string;
      lastNames: string;
      document: string;
      typeDocument: string;
    }[];
    hora: string;
    selectedOption: string;
    tramites: { value: string; label: string; requeriments: string[] }[];
    state: string;
  }[];
};
// type ScheduledItem = SchedulingsStoreType["scheduled"][number];
type SchedulingsStoreActions = {
  setScheduled: (scheduled: any) => void;
};

export const SchedulingsStore = create(
  devtools(
    persist<SchedulingsStoreType & SchedulingsStoreActions>(
      (set) => ({
        scheduled: [],
        setScheduled: (newScheduled) =>
          set((state) => ({ scheduled: [...state.scheduled, newScheduled] })),
      }),
      {
        name: "schedulings-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
