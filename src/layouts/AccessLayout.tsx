import { Outlet } from "react-router-dom";
import { PublicHeader } from "../components/public/header/PublicHeader";
import { TimerBanner } from "../components/TimerBanner";
import { BookingTimerExpirationHandler } from "../components/BookingTimerExpirationHandler";

export const AccessLayout = () => {
  return (
    <main
      id="auth-layout"
      className=""
      aria-label="Contenido de vista de autenticación"
    >
      <PublicHeader short={true} />
      <TimerBanner />
      <BookingTimerExpirationHandler />

      <section id="auth-content" className="h-auto w-full">
        <Outlet />
      </section>
    </main>
  );
};
