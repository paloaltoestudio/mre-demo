import { useNavigate } from "react-router-dom";
import { SessionStore, type UserType } from "../stores/sessionStore";
import { useEffect, useState } from "react";

const services = [
  {
    label: "Agendamiento de citas",
    route: "/schedulings/select-appointments",
    icon: "📅",
  },
  {
    label: "Pasaporte en línea",
    route: "/passport",
    icon: "🛂",
  },
  {
    label: "Visa en línea",
    route: "/visa",
    icon: "📝",
  },
  {
    label: "Certificaciones en línea",
    route: "/certifications",
    icon: "📄",
  },
  {
    label: "Naturalización en línea",
    route: "/naturalization",
    icon: "🌐",
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Hola {activeUser?.firstName || "Usuario"}
      </h1>
      <p className="text-md text-gray-600 mb-10">
        Escoge el trámite que deseas realizar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full">
        {services.map((service) => (
          <button
            key={service.label}
            onClick={() => navigate(service.route)}
            className="flex flex-col items-center justify-center border border-blue-600 rounded-lg py-6 px-4 hover:bg-blue-50 transition"
          >
            <span className="text-3xl mb-2">{service.icon}</span>
            <span className="text-blue-600 font-medium text-center">
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};