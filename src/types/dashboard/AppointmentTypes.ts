export type Estado = "Agendada" | "Cancelada" | "Atendida" | "Pendiente";

export type Appointment = {
  id: number;
  estado: Estado;
  fecha: string;
  lugar: string;
  direccion: string;
  codigo: string;
  solicitantes: string[];
};

export type ConsulatesType = {
  country: string;
  city: string;
  consulate: {
    name: string;
    address: string;
    phone: number;
  };
};


