import { Outlet } from "react-router-dom";
import { PublicHeader } from "../components/public/header/PublicHeader";

export const AccessLayout = () => {
  return (
    <main
      id="auth-layout"
      className=""
      aria-label="Contenido de vista de autenticación"
    >
      <PublicHeader short={true} />

      <section id="auth-content" className="pt-10 h-auto w-full">
        <Outlet />
      </section>
    </main>
  );
};
