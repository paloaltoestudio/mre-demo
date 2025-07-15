import { create } from "zustand";

interface AppointmentWizardState {
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useAppointmentWizardStore = create<AppointmentWizardState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  reset: () => set({ step: 1 }),
})); 