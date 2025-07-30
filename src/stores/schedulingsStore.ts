import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type {
  AppointmentType,
  ConsulatesType,
} from "../types/dashboard/AppointmentTypes";
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
    relationship: number;
  }[];
  hora: string;
  selectedOption: string;
  tramites: {
    id: string;
    name: string;
    requirements: string;
  };
  state: string;
};

type reschedulingType = {
  appointmentOldId: number;
  availabilityBlockId: number;
};

type SchedulingsStoreType = {
  scheduled: SchedulingStoreType[];
  toRemove: AppointmentType;
  toReplace: SchedulingStoreType;
  reschedulings: reschedulingType;
  country: number;
  requeriments: requerimentsType;
  procedure: string;
  toSavedDate: number;
};

type SchedulingsStoreActions = {
  setScheduled: (scheduled: any) => void;
  removeScheduled: (scheduled: SchedulingStoreType) => void;
  updateState: (scheduled: SchedulingStoreType) => void;
  // updateState: (scheduled: SchedulingStoreType) => void;
  setToRemove: (toRemove: AppointmentType) => void;
  // setToRemove: (toRemove: SchedulingStoreType) => void;
  setToReplace: (toReplace: SchedulingStoreType) => void;
  setReschedulings: (reschedulings: reschedulingType) => void;
  rescheduling: (
    toRemove: SchedulingStoreType,
    scheduled: SchedulingStoreType
  ) => void;
  setCountry: (country: number) => void;
  setRequeriments: (setRequeriments: requerimentsType) => void;
  setProcedure: (procedure: string) => void;
  setToSavedDate: (toSavedDate: number) => void;
  setRemoveSavedDate: () => void;
};

export const SchedulingsStore = create(
  devtools(
    persist<SchedulingsStoreType & SchedulingsStoreActions>(
      (set) => ({
        scheduled: [],
        toRemove: {} as AppointmentType,
        toReplace: {} as SchedulingStoreType,
        reschedulings: {} as reschedulingType,
        country: 0,
        requeriments: [] as requerimentsType,
        procedure: "",
        toSavedDate: 0,
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
        setReschedulings: (reschedulings) => set({ reschedulings }),
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
        setToSavedDate: (toSavedDate) => set({ toSavedDate }),
        setRemoveSavedDate: () => set({ toSavedDate: 0 }),
      }),
      {
        name: "schedulings-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
