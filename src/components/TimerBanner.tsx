import { useBookingTimerStore } from "../stores/bookingTimerStore";

export const TimerBanner = () => {
  const { timeLeft, isActive } = useBookingTimerStore();

  if (!isActive) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="w-full flex justify-center bg-yellow-100 border-b border-yellow-400 text-yellow-800 py-2 shadow">
      <span className="font-semibold">Tiempo de reserva:</span> {formatTime(timeLeft)}
    </div>
  );
}; 