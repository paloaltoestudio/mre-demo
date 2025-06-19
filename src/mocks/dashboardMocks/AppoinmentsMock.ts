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
    value: "EC",
    label: "Ecuador",
    icon: "https://flagcdn.com/w40/ec.png",
  },
  {
    value: "FR",
    label: "Francia",
    icon: "https://flagcdn.com/w40/fr.png",
  },
  {
    value: "IT",
    label: "Italia",
    icon: "https://flagcdn.com/w40/it.png",
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
    country: "CO",
  },
  {
    value: "BOG",
    label: "Bogotá",
    country: "CO",
  },
  {
    value: "QUI",
    label: "Quito",
    country: "EC",
  },
  {
    value: "GUA",
    label: "Guayaquil",
    country: "EC",
  },
  {
    value: "PAR",
    label: "Paris",
    country: "FR",
  },
  {
    value: "LYO",
    label: "Lyon",
    country: "FR",
  },
  {
    value: "ROM",
    label: "Roma",
    country: "IT",
  },
  {
    value: "MIL",
    label: "Milán",
    country: "IT",
  },
  {
    value: "LA",
    label: "Los Ángeles",
    country: "US",
  },
  {
    value: "NYK",
    label: "Nueva York",
    country: "US",
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

export const consulatesOptions = [
  // Colombia - Medellín
  {
    country: "CO",
    city: "MED",
    consulate: {
      name: "Consulado Medellín 1",
      address: "Calle 42B N° 52-106",
      phone: 3001111111,
    },
  },
  {
    country: "CO",
    city: "MED",
    consulate: {
      name: "Consulado Medellín 2",
      address: "Carrera 45 #53-200",
      phone: 3002222222,
    },
  },

  // Colombia - Bogotá
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado Bogotá 1",
      address: "Calle 110 #10-20",
      phone: 3011111111,
    },
  },
  {
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado Bogotá 2",
      address: "Calle 110 #10-21",
      phone: 3012222222,
    },
  },

  // Ecuador - Quito
  {
    country: "EC",
    city: "QUI",
    consulate: {
      name: "Consulado Quito 1",
      address: "Av. Amazonas N37-123",
      phone: 3021111111,
    },
  },
  {
    country: "EC",
    city: "QUI",
    consulate: {
      name: "Consulado Quito 2",
      address: "Calle Juan León Mera 456",
      phone: 3022222222,
    },
  },

  // Ecuador - Guayaquil
  {
    country: "EC",
    city: "GUA",
    consulate: {
      name: "Consulado Guayaquil 1",
      address: "Av. 9 de Octubre 100",
      phone: 3031111111,
    },
  },
  {
    country: "EC",
    city: "GUA",
    consulate: {
      name: "Consulado Guayaquil 2",
      address: "Malecón 2000",
      phone: 3032222222,
    },
  },

  // Francia - París
  {
    country: "FR",
    city: "PAR",
    consulate: {
      name: "Consulado París 1",
      address: "Rue de Rivoli 99",
      phone: 3041111111,
    },
  },
  {
    country: "FR",
    city: "PAR",
    consulate: {
      name: "Consulado París 2",
      address: "Boulevard Haussmann 45",
      phone: 3042222222,
    },
  },

  // Francia - Lyon
  {
    country: "FR",
    city: "LYO",
    consulate: {
      name: "Consulado Lyon 1",
      address: "Rue de la République 10",
      phone: 3051111111,
    },
  },
  {
    country: "FR",
    city: "LYO",
    consulate: {
      name: "Consulado Lyon 2",
      address: "Place Bellecour 20",
      phone: 3052222222,
    },
  },

  // Italia - Roma
  {
    country: "IT",
    city: "ROM",
    consulate: {
      name: "Consulado Roma 1",
      address: "Via del Corso 123",
      phone: 3061111111,
    },
  },
  {
    country: "IT",
    city: "ROM",
    consulate: {
      name: "Consulado Roma 2",
      address: "Piazza Venezia 1",
      phone: 3062222222,
    },
  },

  // Italia - Milán
  {
    country: "IT",
    city: "MIL",
    consulate: {
      name: "Consulado Milán 1",
      address: "Corso Buenos Aires 50",
      phone: 3071111111,
    },
  },
  {
    country: "IT",
    city: "MIL",
    consulate: {
      name: "Consulado Milán 2",
      address: "Piazza del Duomo",
      phone: 3072222222,
    },
  },

  // Estados Unidos - Los Ángeles
  {
    country: "US",
    city: "LA",
    consulate: {
      name: "Consulado Los Ángeles 1",
      address: "Wilshire Blvd 1234",
      phone: 3081111111,
    },
  },
  {
    country: "US",
    city: "LA",
    consulate: {
      name: "Consulado Los Ángeles 2",
      address: "Sunset Blvd 4321",
      phone: 3082222222,
    },
  },

  // Estados Unidos - Nueva York
  {
    country: "US",
    city: "NYK",
    consulate: {
      name: "Consulado Nueva York 1",
      address: "5th Avenue 789",
      phone: 3091111111,
    },
  },
  {
    country: "US",
    city: "NYK",
    consulate: {
      name: "Consulado Nueva York 2",
      address: "Madison Ave 101",
      phone: 3092222222,
    },
  },
];

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
