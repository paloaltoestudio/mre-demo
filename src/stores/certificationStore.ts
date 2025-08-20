import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CertificationState {
  // Datos del solicitante (paso 1)
  certificateType: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nacionalidad: string;
  lugarExpedicionDocumento: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  pais: string;
  telefono: string;
  email: string;
  particula: string;
  autorizacionTercero: string;
  hasPassport: string;
  numeroPasaporte: string;
  fechaExpedicionPasaporte: string;
  fechaVencimientoPasaporte: string;
  autoridadPasaporte: string;
  pasaporte: string;
  fechaExpedicion: string;

  // Datos de la solicitud (paso 2)
  modalidad: string;
  idioma: string;
  entidadDestino: string;
  funcionario: string;
  oficina: string;

  // Datos del menor (paso 3 - opcional)
  nombreMenor: string;
  apellidoMenor: string;
  fechaNacimientoMenor: string;
  numeroRegistroCivil: string;
  lugarRegistroCivil: string;
  fechaRegistroCivil: string;

  // Datos de liquidación (paso 4)
  montoLiquidado: number;
  numeroConsecutivo: string;

  // Setters para datos del solicitante
  setCertificateType: (value: string) => void;
  setTipoDocumento: (value: string) => void;
  setNumeroDocumento: (value: string) => void;
  setNacionalidad: (value: string) => void;
  setLugarExpedicionDocumento: (value: string) => void;
  setPrimerNombre: (value: string) => void;
  setSegundoNombre: (value: string) => void;
  setPrimerApellido: (value: string) => void;
  setSegundoApellido: (value: string) => void;
  setFechaNacimiento: (value: string) => void;
  setGenero: (value: string) => void;
  setEstadoCivil: (value: string) => void;
  setDireccion: (value: string) => void;
  setCiudad: (value: string) => void;
  setDepartamento: (value: string) => void;
  setPais: (value: string) => void;
  setTelefono: (value: string) => void;
  setEmail: (value: string) => void;
  setParticula: (value: string) => void;
  setAutorizacionTercero: (value: string) => void;
  setHasPassport: (value: string) => void;
  setNumeroPasaporte: (value: string) => void;
  setFechaExpedicionPasaporte: (value: string) => void;
  setFechaVencimientoPasaporte: (value: string) => void;
  setAutoridadPasaporte: (value: string) => void;
  setPasaporte: (value: string) => void;
  setFechaExpedicion: (value: string) => void;

  // Setters para datos de la solicitud
  setModalidad: (value: string) => void;
  setIdioma: (value: string) => void;
  setEntidadDestino: (value: string) => void;
  setFuncionario: (value: string) => void;
  setOficina: (value: string) => void;

  // Setters para datos del menor
  setNombreMenor: (value: string) => void;
  setApellidoMenor: (value: string) => void;
  setFechaNacimientoMenor: (value: string) => void;
  setNumeroRegistroCivil: (value: string) => void;
  setLugarRegistroCivil: (value: string) => void;
  setFechaRegistroCivil: (value: string) => void;

  // Setters para datos de liquidación
  setMontoLiquidado: (value: number) => void;
  setNumeroConsecutivo: (value: string) => void;

  // Función para limpiar el store
  clear: () => void;

  // Función para obtener todos los datos como objeto
  getAllData: () => any;
}

export const useCertificationStore = create<CertificationState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        certificateType: '',
        tipoDocumento: '',
        numeroDocumento: '',
        nacionalidad: '',
        lugarExpedicionDocumento: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaNacimiento: '',
        genero: '',
        estadoCivil: '',
        direccion: '',
        ciudad: '',
        departamento: '',
        pais: '',
        telefono: '',
        email: '',
        particula: '',
        autorizacionTercero: '',
        hasPassport: '',
        numeroPasaporte: '',
        fechaExpedicionPasaporte: '',
        fechaVencimientoPasaporte: '',
        autoridadPasaporte: '',
        pasaporte: '',
        fechaExpedicion: '',

        modalidad: '',
        idioma: '',
        entidadDestino: 'FONDO DE PENSIÓN',
        funcionario: 'PEDRO PÉREZ',
        oficina: 'CONSULADO GENERAL BOG',

        nombreMenor: '',
        apellidoMenor: '',
        fechaNacimientoMenor: '',
        numeroRegistroCivil: '',
        lugarRegistroCivil: '',
        fechaRegistroCivil: '',

        montoLiquidado: 0,
        numeroConsecutivo: '',

        // Setters para datos del solicitante
        setCertificateType: (value) => set({ certificateType: value }),
        setTipoDocumento: (value) => set({ tipoDocumento: value }),
        setNumeroDocumento: (value) => set({ numeroDocumento: value }),
        setNacionalidad: (value) => set({ nacionalidad: value }),
        setLugarExpedicionDocumento: (value) => set({ lugarExpedicionDocumento: value }),
        setPrimerNombre: (value) => set({ primerNombre: value }),
        setSegundoNombre: (value) => set({ segundoNombre: value }),
        setPrimerApellido: (value) => set({ primerApellido: value }),
        setSegundoApellido: (value) => set({ segundoApellido: value }),
        setFechaNacimiento: (value) => set({ fechaNacimiento: value }),
        setGenero: (value) => set({ genero: value }),
        setEstadoCivil: (value) => set({ estadoCivil: value }),
        setDireccion: (value) => set({ direccion: value }),
        setCiudad: (value) => set({ ciudad: value }),
        setDepartamento: (value) => set({ departamento: value }),
        setPais: (value) => set({ pais: value }),
        setTelefono: (value) => set({ telefono: value }),
        setEmail: (value) => set({ email: value }),
        setParticula: (value) => set({ particula: value }),
        setAutorizacionTercero: (value) => set({ autorizacionTercero: value }),
        setHasPassport: (value) => set({ hasPassport: value }),
        setNumeroPasaporte: (value) => set({ numeroPasaporte: value }),
        setFechaExpedicionPasaporte: (value) => set({ fechaExpedicionPasaporte: value }),
        setFechaVencimientoPasaporte: (value) => set({ fechaVencimientoPasaporte: value }),
        setAutoridadPasaporte: (value) => set({ autoridadPasaporte: value }),
        setPasaporte: (value) => set({ pasaporte: value }),
        setFechaExpedicion: (value) => set({ fechaExpedicion: value }),

        // Setters para datos de la solicitud
        setModalidad: (value) => set({ modalidad: value }),
        setIdioma: (value) => set({ idioma: value }),
        setEntidadDestino: (value) => set({ entidadDestino: value }),
        setFuncionario: (value) => set({ funcionario: value }),
        setOficina: (value) => set({ oficina: value }),

        // Setters para datos del menor
        setNombreMenor: (value) => set({ nombreMenor: value }),
        setApellidoMenor: (value) => set({ apellidoMenor: value }),
        setFechaNacimientoMenor: (value) => set({ fechaNacimientoMenor: value }),
        setNumeroRegistroCivil: (value) => set({ numeroRegistroCivil: value }),
        setLugarRegistroCivil: (value) => set({ lugarRegistroCivil: value }),
        setFechaRegistroCivil: (value) => set({ fechaRegistroCivil: value }),

        // Setters para datos de liquidación
        setMontoLiquidado: (value) => set({ montoLiquidado: value }),
        setNumeroConsecutivo: (value) => set({ numeroConsecutivo: value }),

        // Función para limpiar el store
        clear: () => set({
          certificateType: '',
          tipoDocumento: '',
          numeroDocumento: '',
          nacionalidad: '',
          lugarExpedicionDocumento: '',
          primerNombre: '',
          segundoNombre: '',
          primerApellido: '',
          segundoApellido: '',
          fechaNacimiento: '',
          genero: '',
          estadoCivil: '',
          direccion: '',
          ciudad: '',
          departamento: '',
          pais: '',
          telefono: '',
          email: '',
          particula: '',
          autorizacionTercero: '',
          hasPassport: '',
          numeroPasaporte: '',
                  fechaExpedicionPasaporte: '',
        fechaVencimientoPasaporte: '',
        autoridadPasaporte: '',
        pasaporte: '',
        fechaExpedicion: '',
        modalidad: '',
          idioma: '',
          entidadDestino: 'FONDO DE PENSIÓN',
          funcionario: 'PEDRO PÉREZ',
          oficina: 'CONSULADO GENERAL BOG',
          nombreMenor: '',
          apellidoMenor: '',
          fechaNacimientoMenor: '',
          numeroRegistroCivil: '',
          lugarRegistroCivil: '',
          fechaRegistroCivil: '',
          montoLiquidado: 0,
          numeroConsecutivo: '',
        }),

        // Función para obtener todos los datos como objeto
        getAllData: () => {
          const state = get();
          return {
            certificateType: state.certificateType,
            tipoDocumento: state.tipoDocumento,
            numeroDocumento: state.numeroDocumento,
            nacionalidad: state.nacionalidad,
            lugarExpedicionDocumento: state.lugarExpedicionDocumento,
            primerNombre: state.primerNombre,
            segundoNombre: state.segundoNombre,
            primerApellido: state.primerApellido,
            segundoApellido: state.segundoApellido,
            fechaNacimiento: state.fechaNacimiento,
            genero: state.genero,
            estadoCivil: state.estadoCivil,
            direccion: state.direccion,
            ciudad: state.ciudad,
            departamento: state.departamento,
            pais: state.pais,
            telefono: state.telefono,
            email: state.email,
            hasPassport: state.hasPassport,
            numeroPasaporte: state.numeroPasaporte,
            fechaExpedicionPasaporte: state.fechaExpedicionPasaporte,
            fechaVencimientoPasaporte: state.fechaVencimientoPasaporte,
            autoridadPasaporte: state.autoridadPasaporte,
            modalidad: state.modalidad,
            idioma: state.idioma,
            entidadDestino: state.entidadDestino,
            funcionario: state.funcionario,
            oficina: state.oficina,
            nombreMenor: state.nombreMenor,
            apellidoMenor: state.apellidoMenor,
            fechaNacimientoMenor: state.fechaNacimientoMenor,
            numeroRegistroCivil: state.numeroRegistroCivil,
            lugarRegistroCivil: state.lugarRegistroCivil,
            fechaRegistroCivil: state.fechaRegistroCivil,
            montoLiquidado: state.montoLiquidado,
            numeroConsecutivo: state.numeroConsecutivo,
          };
        },
      }),
      {
        name: 'certification-storage',
      }
    )
  )
);
