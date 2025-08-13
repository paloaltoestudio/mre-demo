import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface VisaState {
  selectedCategory: string;
  sector: string;
  subsector: string;
  activityInColombia: string;
  position: string;
  nit: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  sexo: string;
  estadoCivil: string;
  tieneOtraNacionalidad: string;
  tieneHijos: string;
  nacionalidad: string;
  numeroPasaporte: string;
  fechaNacimiento: string;
  paisNacimiento: string;
  nivelEducativo: string;
  tituloDiploma: string;
  areaConocimiento: string;
  subareaConocimiento: string;
  paisDomicilio: string;
  ciudadDomicilio: string;
  direccionDomicilio: string;
  telefonoDomicilio: string;
  paisColombia: string;
  departamentoColombia: string;
  ciudadColombia: string;
  direccionColombia: string;
  telefonoColombia: string;
  telefonoOficina: string;
  gastosCubiertos: string;
  especificarGastos: string;
  tieneRedesSociales: string;
  facebookUsuario: string;
  instagramUsuario: string;
  xUsuario: string;
  otroRedSocial: string;
  correoElectronico: string;
  confirmacionCorreo: string;
  tramitadaPor: string;
  fechaExpedicionPasaporte: string;
  fechaVencimientoPasaporte: string;
  ciudadNacimiento: string;
  genero: string;
  paisResidencia: string;
  ciudadResidencia: string;
  lugarResidencia: string;
  otraNacionalidad: string;
  autoridad: string;
  setSelectedCategory: (category: string) => void;
  setSector: (sector: string) => void;
  setSubsector: (subsector: string) => void;
  setActivityInColombia: (activity: string) => void;
  setPosition: (position: string) => void;
  setNit: (nit: string) => void;
  setPrimerNombre: (primerNombre: string) => void;
  setSegundoNombre: (segundoNombre: string) => void;
  setPrimerApellido: (primerApellido: string) => void;
  setSegundoApellido: (segundoApellido: string) => void;
  setSexo: (sexo: string) => void;
  setEstadoCivil: (estadoCivil: string) => void;
  setTieneOtraNacionalidad: (tieneOtraNacionalidad: string) => void;
  setTieneHijos: (tieneHijos: string) => void;
  setNacionalidad: (nacionalidad: string) => void;
  setNumeroPasaporte: (numeroPasaporte: string) => void;
  setFechaNacimiento: (fechaNacimiento: string) => void;
  setPaisNacimiento: (paisNacimiento: string) => void;
  setNivelEducativo: (nivelEducativo: string) => void;
  setTituloDiploma: (tituloDiploma: string) => void;
  setAreaConocimiento: (areaConocimiento: string) => void;
  setSubareaConocimiento: (subareaConocimiento: string) => void;
  setPaisDomicilio: (paisDomicilio: string) => void;
  setCiudadDomicilio: (ciudadDomicilio: string) => void;
  setDireccionDomicilio: (direccionDomicilio: string) => void;
  setTelefonoDomicilio: (telefonoDomicilio: string) => void;
  setPaisColombia: (paisColombia: string) => void;
  setDepartamentoColombia: (departamentoColombia: string) => void;
  setCiudadColombia: (ciudadColombia: string) => void;
  setDireccionColombia: (direccionColombia: string) => void;
  setTelefonoColombia: (telefonoColombia: string) => void;
  setTelefonoOficina: (telefonoOficina: string) => void;
  setGastosCubiertos: (gastosCubiertos: string) => void;
  setEspecificarGastos: (especificarGastos: string) => void;
  setTieneRedesSociales: (tieneRedesSociales: string) => void;
  setFacebookUsuario: (facebookUsuario: string) => void;
  setInstagramUsuario: (instagramUsuario: string) => void;
  setXUsuario: (xUsuario: string) => void;
  setOtroRedSocial: (otroRedSocial: string) => void;
  setCorreoElectronico: (correoElectronico: string) => void;
  setConfirmacionCorreo: (confirmacionCorreo: string) => void;
  setTramitadaPor: (tramitadaPor: string) => void;
  setFechaExpedicionPasaporte: (fechaExpedicionPasaporte: string) => void;
  setFechaVencimientoPasaporte: (fechaVencimientoPasaporte: string) => void;
  setCiudadNacimiento: (ciudadNacimiento: string) => void;
  setGenero: (genero: string) => void;
  setPaisResidencia: (paisResidencia: string) => void;
  setCiudadResidencia: (ciudadResidencia: string) => void;
  setLugarResidencia: (lugarResidencia: string) => void;
  setOtraNacionalidad: (otraNacionalidad: string) => void;
  setAutoridad: (autoridad: string) => void;
}

export const useVisaStore = create<VisaState>()(
  devtools(
    persist(
      (set) => ({
        selectedCategory: '',
        sector: '',
        subsector: '',
        activityInColombia: '',
        position: '',
        nit: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        sexo: '',
        estadoCivil: '',
        tieneOtraNacionalidad: '',
        tieneHijos: '',
        nacionalidad: '',
        numeroPasaporte: '',
        fechaNacimiento: '',
        paisNacimiento: '',
        nivelEducativo: '',
        tituloDiploma: '',
        areaConocimiento: '',
        subareaConocimiento: '',
        paisDomicilio: '',
        ciudadDomicilio: '',
        direccionDomicilio: '',
        telefonoDomicilio: '',
        paisColombia: 'COLOMBIA',
        departamentoColombia: '',
        ciudadColombia: '',
        direccionColombia: '',
        telefonoColombia: '',
        telefonoOficina: '',
        gastosCubiertos: '',
        especificarGastos: '',
        tieneRedesSociales: '',
        facebookUsuario: '',
        instagramUsuario: '',
        xUsuario: '',
        otroRedSocial: '',
        correoElectronico: '',
        confirmacionCorreo: '',
        tramitadaPor: '',
        fechaExpedicionPasaporte: '',
        fechaVencimientoPasaporte: '',
        ciudadNacimiento: '',
        genero: '',
        paisResidencia: '',
        ciudadResidencia: '',
        lugarResidencia: '',
        otraNacionalidad: '',
        autoridad: '',
        setSelectedCategory: (category) => set({ selectedCategory: category }),
        setSector: (sector) => set({ sector }),
        setSubsector: (subsector) => set({ subsector }),
        setActivityInColombia: (activity) => set({ activityInColombia: activity }),
        setPosition: (position) => set({ position }),
        setNit: (nit) => set({ nit }),
        setPrimerNombre: (primerNombre) => set({ primerNombre }),
        setSegundoNombre: (segundoNombre) => set({ segundoNombre }),
        setPrimerApellido: (primerApellido) => set({ primerApellido }),
        setSegundoApellido: (segundoApellido) => set({ segundoApellido }),
        setSexo: (sexo) => set({ sexo }),
        setEstadoCivil: (estadoCivil) => set({ estadoCivil }),
        setTieneOtraNacionalidad: (tieneOtraNacionalidad) => set({ tieneOtraNacionalidad }),
        setTieneHijos: (tieneHijos) => set({ tieneHijos }),
        setNacionalidad: (nacionalidad) => set({ nacionalidad }),
        setNumeroPasaporte: (numeroPasaporte) => set({ numeroPasaporte }),
        setFechaNacimiento: (fechaNacimiento) => set({ fechaNacimiento }),
        setPaisNacimiento: (paisNacimiento) => set({ paisNacimiento }),
        setNivelEducativo: (nivelEducativo) => set({ nivelEducativo }),
        setTituloDiploma: (tituloDiploma) => set({ tituloDiploma }),
        setAreaConocimiento: (areaConocimiento) => set({ areaConocimiento }),
        setSubareaConocimiento: (subareaConocimiento) => set({ subareaConocimiento }),
        setPaisDomicilio: (paisDomicilio) => set({ paisDomicilio }),
        setCiudadDomicilio: (ciudadDomicilio) => set({ ciudadDomicilio }),
        setDireccionDomicilio: (direccionDomicilio) => set({ direccionDomicilio }),
        setTelefonoDomicilio: (telefonoDomicilio) => set({ telefonoDomicilio }),
        setPaisColombia: (paisColombia) => set({ paisColombia }),
        setDepartamentoColombia: (departamentoColombia) => set({ departamentoColombia }),
        setCiudadColombia: (ciudadColombia) => set({ ciudadColombia }),
        setDireccionColombia: (direccionColombia) => set({ direccionColombia }),
        setTelefonoColombia: (telefonoColombia) => set({ telefonoColombia }),
        setTelefonoOficina: (telefonoOficina) => set({ telefonoOficina }),
        setGastosCubiertos: (gastosCubiertos) => set({ gastosCubiertos }),
        setEspecificarGastos: (especificarGastos) => set({ especificarGastos }),
        setTieneRedesSociales: (tieneRedesSociales) => set({ tieneRedesSociales }),
        setFacebookUsuario: (facebookUsuario) => set({ facebookUsuario }),
        setInstagramUsuario: (instagramUsuario) => set({ instagramUsuario }),
        setXUsuario: (xUsuario) => set({ xUsuario }),
        setOtroRedSocial: (otroRedSocial) => set({ otroRedSocial }),
        setCorreoElectronico: (correoElectronico) => set({ correoElectronico }),
        setConfirmacionCorreo: (confirmacionCorreo) => set({ confirmacionCorreo }),
        setTramitadaPor: (tramitadaPor) => set({ tramitadaPor }),
        setFechaExpedicionPasaporte: (fechaExpedicionPasaporte) => set({ fechaExpedicionPasaporte }),
        setFechaVencimientoPasaporte: (fechaVencimientoPasaporte) => set({ fechaVencimientoPasaporte }),
        setCiudadNacimiento: (ciudadNacimiento) => set({ ciudadNacimiento }),
        setGenero: (genero) => set({ genero }),
        setPaisResidencia: (paisResidencia) => set({ paisResidencia }),
        setCiudadResidencia: (ciudadResidencia) => set({ ciudadResidencia }),
        setLugarResidencia: (lugarResidencia) => set({ lugarResidencia }),
        setOtraNacionalidad: (otraNacionalidad) => set({ otraNacionalidad }),
        setAutoridad: (autoridad) => set({ autoridad }),
      }),
      {
        name: 'visaStore',
      }
    )
  )
);
