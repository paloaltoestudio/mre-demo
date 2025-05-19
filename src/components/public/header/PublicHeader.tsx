import logotypeGov from "@/assets/logo.svg";
import logoCancilleria from "@/assets/LOGO-CANCILLERÍA1.png";

export const PublicHeader = () => {
  return (
    <header
      className="w-full h-[20vh] shadow-lg"
      aria-label="Encabezado público principal"
    >
      <div className="w-full h-2/6 bg-[#3466cc] p-1.5">
        <img
          src={logotypeGov}
          alt="Logo gov.co"
          title="Logo gov.co"
          className="h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="w-full h-4/6 p-1.5">
        <img
          src={logoCancilleria}
          alt="Agendamiento Cancillería"
          title="Agendamiento Cancillería"
          className="h-full object-contain mx-auto"
          loading="lazy"
        />
      </div>
    </header>
  );
};
