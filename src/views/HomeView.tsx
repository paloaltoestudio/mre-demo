import { useNavigate } from "react-router-dom";
import { SessionStore, type UserType } from "../stores/sessionStore";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPassport, faIdCard, faFileAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";


// Definir el tipo de ícono
interface ServiceItem {
  label: string;
  route: string;
  icon: IconDefinition;
  bgColor: string;
}

// Lista de servicios con íconos FA y colores
const services: ServiceItem[] = [
  {
    label: "Agendamiento de citas",
    route: "/schedulings/select-appointments",
    icon: faCalendarAlt,
    bgColor: "bg-blue-100",
  },
  {
    label: "Pasaporte en línea",
    route: "/passport",
    icon: faPassport,
    bgColor: "bg-green-100",
  },
  {
    label: "Visa en línea",
    route: "/visa",
    icon: faIdCard,
    bgColor: "bg-yellow-100",
  },
  {
    label: "Certificaciones en línea",
    route: "/certifications",
    icon: faFileAlt,
    bgColor: "bg-purple-100",
  },
  {
    label: "Naturalización en línea",
    route: "/naturalization",
    icon: faGlobe,
    bgColor: "bg-pink-100",
  },
];

export const HomeView = () => {
  const navigate = useNavigate();
  const { user, document } = SessionStore();
  const [activeUser, setActiveUser] = useState<UserType>();

  useEffect(() => {
    const newUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );
    setActiveUser(
      newUser || {
        documentType: "CC",
        documentNumber: "10256341",
        firstName: "Luis Alberto",
        lastName: "Diaz Castro",
        birthDate: "1990-01-01",
        email: "arquitecto@italm.com.co",
        phoneCode: "+57",
        phoneNumber: "3125642169",
        whatsappCode: "+57",
        whatsappNumber: "3125642169",
        password: "10256341",
        confirmPassword: "10256341",
        acceptData: true,
        acceptTerms: true,
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-4">
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
              <FontAwesomeIcon
                icon={service.icon}
                className="text-blue-600 text-2xl group-hover:text-[#334acc]"
              />
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
