import { Outlet } from "react-router-dom";
import { PublicHeader } from "../components/public/header/PublicHeader";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { TokenExpirationChecker } from "../components/TokenExpirationChecker";
import { LoadScript } from "@react-google-maps/api";

export const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <main
        id="auth-layout"
        className=""
        aria-label="Contenido de vista de autenticación"
      >
        <TokenExpirationChecker />
        <PublicHeader short={false} />

        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY!}>
          <section id="auth-content" className="pt-10 h-auto w-full">
            <Outlet />
          </section>
        </LoadScript>
      </main>
    </ProtectedRoute>
  );
};
