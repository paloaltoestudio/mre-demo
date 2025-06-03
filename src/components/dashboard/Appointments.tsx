import { useNavigate } from "react-router-dom";
import type { Estado } from "../../types/dashboard/AppointmentTypes";
import { SessionStore, type UserType } from "../../stores/sessionStore";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { useEffect, useState } from "react";

const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentCards = () => {
  const navigate = useNavigate();
  const { user, document } = SessionStore();
  const { scheduled } = SchedulingsStore();
  const [activeUser, setActiveUser] = useState<UserType>();

  useEffect(() => {
    const newUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );
    setActiveUser(newUser);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mis agendamientos</h2>

      {/* Card de información del solicitante */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Información del solicitante</h3>
          <button
            type="button"
            onClick={() => navigate("/schedulings/select-appointments")}
            className="text-sm text-blue-600 hover:underline"
          >
            Nuevo agendamiento
          </button>
        </div>
        <p className="text-sm">
          <span className="font-semibold">Nombres y apellidos:</span>{" "}
          {activeUser?.firstName} {activeUser?.lastName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Documento:</span>{" "}
          {activeUser?.documentNumber}
        </p>
      </div>

      {/* Cards de citas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {scheduled.map((appt) => (
          <div
            key={`${appt.date}`}
            className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{`${appt.date}`}</p>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  estadoColor[appt.state as Estado]
                }`}
              >
                {appt.state}
              </span>
            </div>
            <p className="text-sm">Trámite: Visa</p>
            <p className="text-sm">
              Consulado: {appt.consulate.consulate.name}
            </p>
            <p className="text-sm">
              Dirección: {appt.consulate.consulate.address}
            </p>
            <p className="text-sm">Código de confirmación: 23423</p>

            <div className="text-sm">
              <span className="font-semibold">Solicitantes:</span>
              <ul className="list-none pl-5 mt-1">
                {appt.parents?.map((s, idx) => (
                  <li key={idx}>
                    {s.names} {s.lastNames}
                  </li>
                ))}
                <li>
                  {activeUser?.firstName} {activeUser?.lastName}
                </li>
              </ul>
            </div>

            <div className="flex justify-end mt-3 gap-2">
              {appt.state === "Agendada" && (
                <>
                  <button className="text-blue-600 hover:underline text-sm">
                    Cancelar
                  </button>
                  <button className="text-blue-600 hover:underline text-sm">
                    Reagendar
                  </button>
                </>
              )}
              {appt.state === "Cancelada" && (
                <button className="text-blue-600 hover:underline text-sm">
                  Archivar
                </button>
              )}
              {appt.state === "Atendida" && (
                <button className="text-blue-600 hover:underline text-sm">
                  Eliminar
                </button>
              )}
              {appt.state === "Pendiente" && (
                <button className="text-blue-600 hover:underline text-sm">
                  Reagendar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
