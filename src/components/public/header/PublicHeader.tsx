import logotypeGov from "@/assets/logo.svg";
import logoCancilleria from "@/assets/LOGO-CANCILLERÍA1.png";
import { UserHeader } from "./UserHeader";
import { Link } from "react-router-dom";

type PublicHeaderProps = {
  short: boolean;
  official?: boolean;
};

export const PublicHeader = ({
  short = false,
}: PublicHeaderProps) => {
  return (
    <header
      className={`w-full h-[150px] md:h-[120px] shadow-lg relative mb-4`}
      aria-label="Encabezado público principal"
    >
      <div
        className={`w-full  bg-[#3466cc] p-1.5 flex justify-center md:justify-start h-1/6 md:h-8`}
      >
        <img
          src={logotypeGov}
          alt="Logo gov.co"
          title="Logo gov.co"
          className="h-full object-contain cursor-pointer"
          loading="lazy"
        />
      </div>
      {!short && (
        <div className="w-full h-20 p-1.5 flex flex-col md:flex-row relative">
          <div className={`h-full w-full`}>
          <Link to="/home">
            <img
              src={logoCancilleria}
              alt="Agendamiento Cancillería"
              title="Agendamiento Cancillería"
              className="h-full object-contain mx-auto"
              loading="lazy"
            />
            </Link>
          </div>

          {/* Header de usuario para cualquier usuario autenticado */}
          <UserHeader />
        </div>
      )}
    </header>
  );
};
