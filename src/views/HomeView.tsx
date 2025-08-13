import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../hooks/useActiveUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import calendarIcon from "../assets/calendar.svg";
import certIcon from "../assets/cert.svg";
import citizenshipIcon from "../assets/citizenship.svg";
import passportIcon from "../assets/passport.svg";
import visaIcon from "../assets/visa.svg";
import { useVisaStore } from '../stores/visaStore';
import { useEffect } from "react";


// Definir el tipo de ícono
interface ServiceItem {
  label: string;
  route: string;
  icon: IconDefinition | string;
  bgColor: string;
}

// Lista de servicios con íconos FA y colores
const services: ServiceItem[] = [
  {
    label: "Agendamiento de citas",
    route: "/dashboard/appointments",
    icon: calendarIcon,
    bgColor: "bg-blue-100",
  },
  {
    label: "Pasaporte en línea",
    route: "/passport",
    icon: passportIcon,
    bgColor: "bg-blue-100",
  },
  {
    label: "Visa en línea",
    route: "/visas",
    icon: visaIcon,
    bgColor: "bg-blue-100",
  },
  {
    label: "Certificaciones en línea",
    route: "/certifications",
    icon: certIcon,
    bgColor: "bg-blue-100",
  },
  {
    label: "Naturalización en línea",
    route: "/naturalization",
    icon: citizenshipIcon,
    bgColor: "bg-blue-100",
  },
];

export const HomeView = () => {
  const navigate = useNavigate();
  const { activeUser } = useActiveUser();
  const clearVisaStore = useVisaStore((state) => state.clear);

  useEffect(() => {
    clearVisaStore();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-4 mt-1">
      <h1 className="text-2xl font-semibold text-[#334acc] capitalize mb-2">
        Hola {activeUser?.firstName || "Usuario"}
      </h1>
      <p className="text-xl text-gray-800 mb-14">
        Escoge el trámite que deseas realizar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl w-full">
        {services.map((service) => (
          <button
            key={service.label}
            onClick={() => navigate(service.route)}
            className="group flex flex-col items-center justify-center border border-blue-600 rounded-lg hover:bg-[#334acc] transition py-6 px-4"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${service.bgColor} group-hover:bg-white transition`}
            >
              {typeof service.icon === "string" ? (
                <img src={service.icon} alt="" />
              ) : (
                <FontAwesomeIcon icon={service.icon} className="text-3xl text-blue-600 group-hover:text-[#334acc] transition" />
              )}
            </div>
            <span className="text-blue-600 group-hover:text-white font-medium text-center transition">
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
