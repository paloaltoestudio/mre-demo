import type { Appointment } from "../../types/dashboard/AppointmentTypes";

export const appointments: Appointment[] = [
  {
    id: 1,
    estado: "Agendada",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Oficina General Central de Colombia en Madrid",
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
    lugar: "Oficina General Central de Colombia en Madrid",
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
    lugar: "Oficina General Central de Colombia en Madrid",
    direccion: "Av. la coronación n.º 78 - 17, Madrid, España",
    codigo: "024984476",
    solicitantes: ["María Fernanda Sánchez Ruiz - C.C. 1055979220"],
  },
  {
    id: 4,
    estado: "Pendiente",
    fecha: "25/12/2024 - 10:34:27",
    lugar: "Oficina General Central de Colombia en Madrid",
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
  // Colombia
  { id: 1, name: "Consulado Medellín 1", cityId: 1, cityName: "Medellín" },
  { id: 2, name: "Consulado Medellín 2", cityId: 1, cityName: "Medellín" },
  { id: 3, name: "Consulado Bogotá 1", cityId: 2, cityName: "Bogotá" },
  { id: 4, name: "Consulado Bogotá 2", cityId: 2, cityName: "Bogotá" },

  // Ecuador
  { id: 5, name: "Consulado Quito 1", cityId: 3, cityName: "Quito" },
  { id: 6, name: "Consulado Quito 2", cityId: 3, cityName: "Quito" },
  { id: 7, name: "Consulado Guayaquil 1", cityId: 4, cityName: "Guayaquil" },
  { id: 8, name: "Consulado Guayaquil 2", cityId: 4, cityName: "Guayaquil" },

  // Francia
  { id: 9, name: "Consulado París 1", cityId: 5, cityName: "Paris" },
  { id: 10, name: "Consulado París 2", cityId: 5, cityName: "Paris" },
  { id: 11, name: "Consulado Lyon 1", cityId: 6, cityName: "Lyon" },
  { id: 12, name: "Consulado Lyon 2", cityId: 6, cityName: "Lyon" },

  // Italia
  { id: 13, name: "Consulado Roma 1", cityId: 7, cityName: "Roma" },
  { id: 14, name: "Consulado Roma 2", cityId: 7, cityName: "Roma" },
  { id: 15, name: "Consulado Milán 1", cityId: 8, cityName: "Milán" },
  { id: 16, name: "Consulado Milán 2", cityId: 8, cityName: "Milán" },

  // Estados Unidos
  {
    id: 17,
    name: "Consulado Los Ángeles 1",
    cityId: 9,
    cityName: "Los Ángeles",
  },
  {
    id: 18,
    name: "Consulado Los Ángeles 2",
    cityId: 9,
    cityName: "Los Ángeles",
  },
  {
    id: 19,
    name: "Consulado Nueva York 1",
    cityId: 10,
    cityName: "Nueva York",
  },
  {
    id: 20,
    name: "Consulado Nueva York 2",
    cityId: 10,
    cityName: "Nueva York",
  },
];

// export const consulatesOptions = [
//   {
//     country: "CO",
//     city: "MED",
//     consulate: {
//       name: "Oficina General MED",
//       address: "Calle 42B N° 52-106",
//       phone: 3000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-20",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-21",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-22",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-23",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-24",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-25",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-26",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-27",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-28",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-29",
//       phone: 2000000000,
//     },
//   },
//   {
//     country: "CO",
//     city: "BOG",
//     consulate: {
//       name: "Oficina General BOG",
//       address: "Calle 110 #10-30",
//       phone: 2000000000,
//     },
//   },
// ];

export const proceduresOptions = [
  {
    value: "pasaporte",
    label: "Pasaporte",
    requeriments: ["Requisito 1", "Requisito 2"],
  },
  {
    value: "visa",
    label: "Visa",
    requeriments: ["Requisito 1", "Requisito 2"],
  },
  // {
  //   value: "registroCivil",
  //   label: "Registro Civil",
  //   requeriments: ["Requisito 1", "Requisito 2"],
  // },
  // {
  //   value: "tramiteConsular",
  //   label: "Trámite Consular",
  //   requeriments: ["Requisito 1", "Requisito 2"],
  // },
];
