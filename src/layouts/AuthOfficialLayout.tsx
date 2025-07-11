import { PublicHeader } from "../components/public/header/PublicHeader";
import { Outlet } from "react-router-dom";

export const AuthOfficialLayout = () => {
  return (
    <main
      id="auth-layout"
      className=""
      aria-label="Contenido de vista de autenticación"
    >
      <PublicHeader short={false} official={true}/>

      <section id="auth-content" className="pt-10 h-auto w-full">
        <Outlet />
      </section>
    </main>
  );
};
