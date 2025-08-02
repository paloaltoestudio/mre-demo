import { create } from "zustand";

interface BookingTimerState {
  timeLeft: number; // segundos restantes
  isActive: boolean;
  expiredByTimeout: boolean;
  preAppointmentId?: number; // ID de la pre-cita
  startTimer: (duration?: number, preAppointmentId?: number) => void;
  resetTimer: () => void;
  expireTimer: () => void;
  clearExpiredFlag: () => void;
  setPreAppointmentId: (id?: number) => void;
}

let timerInterval: NodeJS.Timeout | null = null;

export const useBookingTimerStore = create<BookingTimerState>((set, get) => ({
  timeLeft: 0,
  isActive: false,
  expiredByTimeout: false,
  preAppointmentId: undefined,
  startTimer: (duration = 300, preAppointmentId?: number) => { // 5 minutos por defecto
    if (timerInterval) clearInterval(timerInterval);
    set({ timeLeft: duration, isActive: true, expiredByTimeout: false, preAppointmentId });
    timerInterval = setInterval(() => {
      const { timeLeft, isActive } = get();
      if (!isActive) {
        clearInterval(timerInterval!);
        return;
      }
      if (timeLeft > 1) {
        set({ timeLeft: timeLeft - 1 });
      } else {
        set({ timeLeft: 0, isActive: false, expiredByTimeout: true });
        clearInterval(timerInterval!);
      }
    }, 1000);
  },
  resetTimer: () => {
    if (timerInterval) clearInterval(timerInterval);
    set({ timeLeft: 0, isActive: false, expiredByTimeout: false, preAppointmentId: undefined });
  },
  expireTimer: () => {
    if (timerInterval) clearInterval(timerInterval);
    set({ timeLeft: 0, isActive: false, expiredByTimeout: true });
  },
  clearExpiredFlag: () => {
    set({ expiredByTimeout: false });
  },
  setPreAppointmentId: (id?: number) => {
    set({ preAppointmentId: id });
  },
})); 