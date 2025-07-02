import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { ConsulatesType } from "../types/dashboard/appointmentTypes";
import type { requerimentsType } from "../types/dashboard/proceduresTypes";

export type SchedulingStoreType = {
  city: { value: string; label: string };
  consulate: ConsulatesType;
  country: { value: string; label: string; icon: string };
  date: Date;
  dependientesCount: number;
  parents: {
    names: string;
    lastNames: string;
    document: string;
    typeDocument: { value: string; label: string };
  }[];
  hora: string;
  selectedOption: string;
  tramites: {
    id: string;
    value: string;
    label: string;
    requeriments: string[];
  };
  state: string;
};

type SchedulingsStoreType = {
  scheduled: SchedulingStoreType[];
  toRemove: SchedulingStoreType;
  toReplace: SchedulingStoreType;
  country: number;
  requeriments: requerimentsType;
  procedure: string;
};

type SchedulingsStoreActions = {
  setScheduled: (scheduled: any) => void;
  removeScheduled: (scheduled: SchedulingStoreType) => void;
  updateState: (scheduled: SchedulingStoreType) => void;
  setToRemove: (toRemove: SchedulingStoreType) => void;
  setToReplace: (toReplace: SchedulingStoreType) => void;
  rescheduling: (
    toRemove: SchedulingStoreType,
    scheduled: SchedulingStoreType
  ) => void;
  setCountry: (country: number) => void;
  setRequeriments: (setRequeriments: requerimentsType) => void;
  setProcedure: (procedure: string) => void;
};

export const SchedulingsStore = create(
  devtools(
    persist<SchedulingsStoreType & SchedulingsStoreActions>(
      (set) => ({
        scheduled: [],
        toRemove: {} as SchedulingStoreType,
        toReplace: {} as SchedulingStoreType,
        country: 0,
        requeriments: [] as requerimentsType,
        procedure: "",
        setScheduled: (newScheduled) =>
          set((state) => ({ scheduled: [...state.scheduled, newScheduled] })),
        removeScheduled: (scheduledToRemove) =>
          set((state) => ({
            scheduled: state.scheduled.filter(
              (schedule) => schedule !== scheduledToRemove
            ),
          })),
        updateState: (scheduledToUpdate) =>
          set((state) => ({
            scheduled: state.scheduled.map((scheduled) => {
              if (scheduled === scheduledToUpdate) {
                return {
                  ...scheduled,
                  state: "Cancelada",
                };
              }
              return scheduled;
            }),
          })),
        setToRemove: (toRemove) => set({ toRemove }),
        setToReplace: (toReplace) => set({ toReplace }),
        rescheduling: (scheduledToRemove, scheduledToReplace) =>
          set((state) => ({
            scheduled: state.scheduled.map((schedule) =>
              schedule === scheduledToRemove ? scheduledToReplace : schedule
            ),
          })),
        setCountry: (country) => set({ country }),
        setRequeriments: (setRequeriments) =>
          set({ requeriments: setRequeriments }),
        setProcedure: (procedure) => set({ procedure }),
      }),
      {
        name: "schedulings-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
