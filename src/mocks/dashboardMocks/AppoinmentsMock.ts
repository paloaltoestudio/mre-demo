import type { Appointment } from "../../types/dashboard/AppointmentTypes";

export const appointments: Appointment[] = [
  {
    id: 1,
    estado: "Agendada",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: [
      "María Fernanda Sánchez Ruiz - C.C. 1055979220",
      "Martina Gutiérrez Sánchez - T.I. 100598243",
      "Nicolás Gutiérrez Sánchez - T.I. 1099271183"
    ]
  },
  {
    id: 2,
    estado: "Cancelada",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: [
      "María Fernanda Sánchez Ruiz - C.C. 1055979220",
      "Martina Gutiérrez Sánchez - T.I. 100598243",
      "Nicolás Gutiérrez Sánchez - T.I. 1099271183"
    ]
  },
  {
    id: 3,
    estado: "Atendida",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: [
      "María Fernanda Sánchez Ruiz - C.C. 1055979220"
    ]
  },
  {
    id: 4,
    estado: "Pendiente",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: [
      "María Fernanda Sánchez Ruiz - C.C. 1055979220"
    ]
  }
];
