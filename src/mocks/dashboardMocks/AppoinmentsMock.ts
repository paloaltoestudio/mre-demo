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
      "Nicolás Gutiérrez Sánchez - T.I. 1099271183",
    ],
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
      "Nicolás Gutiérrez Sánchez - T.I. 1099271183",
    ],
  },
  {
    id: 3,
    estado: "Atendida",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: ["María Fernanda Sánchez Ruiz - C.C. 1055979220"],
  },
  {
    id: 4,
    estado: "Pendiente",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Consulado General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: ["María Fernanda Sánchez Ruiz - C.C. 1055979220"],
  },
];

export const countryOptions = [
  {
    value: "CO",
    label: "Colombia",
    icon: "https://flagcdn.com/w40/co.png",
  },
  {
    value: "US",
    label: "Estados Unidos",
    icon: "https://flagcdn.com/w40/us.png",
  },
];

export const cityOptions = [
  {
    value: "MED",
    label: "Medellín",
  },
  {
    value: "BOG",
    label: "Bogotá",
  },
];

export const consulatesOptions = [
  {
    country: "CO",
    city: "MED",
    consulate: {
      name: "Consulado General MED",
      address: "Calle 42B N° 52-106",
      phone: 3000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-20",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-21",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-22",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-23",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-24",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-25",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-26",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-27",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-28",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-29",
      phone: 2000000000,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-30",
      phone: 2000000000,
    },
  },
];
