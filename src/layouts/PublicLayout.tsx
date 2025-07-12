import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <main
      id="public-layout"
      className=""
      aria-label="Contenido público"
    >
      <section id="public-content" className="h-auto w-full">
        <Outlet />
      </section>
    </main>
  );
}; 