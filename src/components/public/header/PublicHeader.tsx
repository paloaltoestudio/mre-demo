import logotypeGov from "@/assets/logo.svg";
import logoCancilleria from "@/assets/LOGO-CANCILLERÍA1.png";

type PublicHeaderProps = {
  short: boolean;
};

export const PublicHeader = ({ short = false }: PublicHeaderProps) => {
  return (
    <header
      className={`w-full ${short ? "h-[7vh]" : "h-[20vh]"} shadow-lg`}
      aria-label="Encabezado público principal"
    >
      <div
        className={`w-full  bg-[#3466cc] p-1.5 ${
          short ? "flex justify-center h-full" : "h-2/6"
        }`}
      >
        <img
          src={logotypeGov}
          alt="Logo gov.co"
          title="Logo gov.co"
          className="h-full object-contain"
          loading="lazy"
        />
      </div>
      {!short && (
        <div className="w-full h-4/6 p-1.5">
          <img
            src={logoCancilleria}
            alt="Agendamiento Cancillería"
            title="Agendamiento Cancillería"
            className="h-full object-contain mx-auto"
            loading="lazy"
          />
        </div>
      )}
    </header>
  );
};
