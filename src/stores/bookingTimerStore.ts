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
    console.log("⏰ [TIMER STORE] Iniciando timer:", { duration, preAppointmentId });
    
    // Limpiar timer anterior si existe
    if (timerInterval) {
      console.log("⏰ [TIMER STORE] Limpiando timer anterior");
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    // Resetear estado al iniciar nuevo timer
    set({ timeLeft: duration, isActive: true, expiredByTimeout: false, preAppointmentId });
    
    timerInterval = setInterval(() => {
      const { timeLeft, isActive } = get();
      
      if (!isActive) {
        console.log("⏰ [TIMER STORE] Timer inactivo, limpiando intervalo");
        clearInterval(timerInterval!);
        timerInterval = null;
        return;
      }
      
      if (timeLeft > 1) {
        set({ timeLeft: timeLeft - 1 });
      } else {
        console.log("⏰ [TIMER STORE] Timer expirado, marcando como expirado");
        // Solo marcar como expirado si no está ya marcado
        const currentState = get();
        if (!currentState.expiredByTimeout) {
          set({ timeLeft: 0, isActive: false, expiredByTimeout: true });
        }
        clearInterval(timerInterval!);
        timerInterval = null;
      }
    }, 1000);
  },
  resetTimer: () => {
    console.log("⏰ [TIMER STORE] Reseteando timer");
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set({ timeLeft: 0, isActive: false, expiredByTimeout: false, preAppointmentId: undefined });
  },
  expireTimer: () => {
    console.log("⏰ [TIMER STORE] Expirando timer manualmente");
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set({ timeLeft: 0, isActive: false, expiredByTimeout: true });
  },
  clearExpiredFlag: () => {
    console.log("⏰ [TIMER STORE] Limpiando flag de expiración");
    set({ expiredByTimeout: false });
  },
  setPreAppointmentId: (id?: number) => {
    console.log("⏰ [TIMER STORE] Estableciendo preAppointmentId:", id);
    set({ preAppointmentId: id });
  },
})); 