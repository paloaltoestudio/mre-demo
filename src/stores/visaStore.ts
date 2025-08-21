import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface VisaStoreState {
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
  numeroRegistroSolicitud: string;
  solicitudDe: string;
  categoriaVisa: string;
  claseVisa: string;
  tipoSolicitud: string;
  tipoSolicitante: string;
  mediaName: string;
  specifyActivity: string;
  visitReason: string;
  institution: string;
  entityNameColombia: string;
  participationEvent: string;
  agreement: string;
  businessCategory: string;
  company: string;
  businessNit: string;
  businessPosition: string;
  businessSector: string;
  hadColombianVisa: string;
  previousVisaDenied: string;
  previousVisaCancelledOrInadmitted: string;
  previousVisaType: string;
  previousVisaNumber: string;
  previousVisaIssueDate: string;
  previousVisaExpiryDate: string;
  previousVisaIssuePlace: string;
  deniedVisaClass: string;
  deniedVisaDate: string;
  cancelledOrInadmittedVisaType: string;
  cancelledOrInadmittedVisaDate: string;
  // Información Complementaria
  tienePEP: string;
  tienePPT: string;
  tieneTMF: string;
  tieneSC2: string;
  numeroPEP: string;
  fechaExpedicionPEP: string;
  fechaVencimientoPEP: string;
  numeroPPT: string;
  fechaExpedicionPPT: string;
  fechaVencimientoPPT: string;
  numeroTMF: string;
  fechaExpedicionTMF: string;
  fechaVencimientoTMF: string;
  numeroSC2: string;
  fechaExpedicionSC2: string;
  fechaVencimientoSC2: string;
  // Información Adicional
  expulsadoColombia: string;
  deportadoColombia: string;
  procesosPenales: string;
  permanenciaSinVisa: string;
  cedulaExtranjeria: string;
  // Familiares en Colombia
  familiaresColombia: string;
  // Ubicacion Actual
  ubicacionActual: string;
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
  setNumeroRegistroSolicitud: (numeroRegistroSolicitud: string) => void;
  setSolicitudDe: (solicitudDe: string) => void;
  setCategoriaVisa: (categoriaVisa: string) => void;
  setClaseVisa: (claseVisa: string) => void;
  setTipoSolicitud: (tipoSolicitud: string) => void;
  setTipoSolicitante: (tipoSolicitante: string) => void;
  setMediaName: (mediaName: string) => void;
  setSpecifyActivity: (specifyActivity: string) => void;
  setVisitReason: (visitReason: string) => void;
  setInstitution: (institution: string) => void;
  setEntityNameColombia: (entityNameColombia: string) => void;
  setParticipationEvent: (participationEvent: string) => void;
  setAgreement: (agreement: string) => void;
  setBusinessCategory: (businessCategory: string) => void;
  setCompany: (company: string) => void;
  setBusinessNit: (businessNit: string) => void;
  setBusinessPosition: (businessPosition: string) => void;
  setBusinessSector: (businessSector: string) => void;
  setHadColombianVisa: (hadColombianVisa: string) => void;
  setPreviousVisaDenied: (previousVisaDenied: string) => void;
  setPreviousVisaCancelledOrInadmitted: (previousVisaCancelledOrInadmitted: string) => void;
  setPreviousVisaType: (previousVisaType: string) => void;
  setPreviousVisaNumber: (previousVisaNumber: string) => void;
  setPreviousVisaIssueDate: (previousVisaIssueDate: string) => void;
  setPreviousVisaExpiryDate: (previousVisaExpiryDate: string) => void;
  setPreviousVisaIssuePlace: (previousVisaIssuePlace: string) => void;
  setDeniedVisaClass: (deniedVisaClass: string) => void;
  setDeniedVisaDate: (deniedVisaDate: string) => void;
  setCancelledOrInadmittedVisaType: (cancelledOrInadmittedVisaType: string) => void;
  setCancelledOrInadmittedVisaDate: (cancelledOrInadmittedVisaDate: string) => void;
  // Información Complementaria
  setTienePEP: (tienePEP: string) => void;
  setTienePPT: (tienePPT: string) => void;
  setTieneTMF: (tieneTMF: string) => void;
  setTieneSC2: (tieneSC2: string) => void;
  setNumeroPEP: (numeroPEP: string) => void;
  setFechaExpedicionPEP: (fechaExpedicionPEP: string) => void;
  setFechaVencimientoPEP: (fechaVencimientoPEP: string) => void;
  setNumeroPPT: (numeroPPT: string) => void;
  setFechaExpedicionPPT: (fechaExpedicionPPT: string) => void;
  setFechaVencimientoPPT: (fechaVencimientoPPT: string) => void;
  setNumeroTMF: (numeroTMF: string) => void;
  setFechaExpedicionTMF: (fechaExpedicionTMF: string) => void;
  setFechaVencimientoTMF: (fechaVencimientoTMF: string) => void;
  setNumeroSC2: (numeroSC2: string) => void;
  setFechaExpedicionSC2: (fechaExpedicionSC2: string) => void;
  setFechaVencimientoSC2: (fechaVencimientoSC2: string) => void;
  // Información Adicional
  setExpulsadoColombia: (expulsadoColombia: string) => void;
  setDeportadoColombia: (deportadoColombia: string) => void;
  setProcesosPenales: (procesosPenales: string) => void;
  setPermanenciaSinVisa: (permanenciaSinVisa: string) => void;
  setCedulaExtranjeria: (cedulaExtranjeria: string) => void;
  // Familiares en Colombia
  setFamiliaresColombia: (familiaresColombia: string) => void;
  // Ubicacion Actual
  setUbicacionActual: (ubicacionActual: string) => void;
  clear: () => void;
}

export const useVisaStore = create<VisaStoreState>()(
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
        numeroRegistroSolicitud: '',
        solicitudDe: '',
        categoriaVisa: '',
        claseVisa: '',
        tipoSolicitud: '',
        tipoSolicitante: '',
        mediaName: '',
        specifyActivity: '',
        visitReason: '',
        institution: '',
        entityNameColombia: '',
        participationEvent: '',
        agreement: '',
        businessCategory: '',
        company: '',
        businessNit: '',
        businessPosition: '',
        businessSector: '',
        hadColombianVisa: '',
        previousVisaDenied: '',
        previousVisaCancelledOrInadmitted: '',
        previousVisaType: '',
        previousVisaNumber: '',
        previousVisaIssueDate: '',
        previousVisaExpiryDate: '',
        previousVisaIssuePlace: '',
        deniedVisaClass: '',
        deniedVisaDate: '',
        cancelledOrInadmittedVisaType: '',
        cancelledOrInadmittedVisaDate: '',
        // Información Complementaria
        tienePEP: '',
        tienePPT: '',
        tieneTMF: '',
        tieneSC2: '',
        numeroPEP: '',
        fechaExpedicionPEP: '',
        fechaVencimientoPEP: '',
        numeroPPT: '',
        fechaExpedicionPPT: '',
        fechaVencimientoPPT: '',
        numeroTMF: '',
        fechaExpedicionTMF: '',
        fechaVencimientoTMF: '',
        numeroSC2: '',
        fechaExpedicionSC2: '',
        fechaVencimientoSC2: '',
        // Información Adicional
        expulsadoColombia: '',
        deportadoColombia: '',
        procesosPenales: '',
        permanenciaSinVisa: '',
        cedulaExtranjeria: '',
        // Familiares en Colombia
        familiaresColombia: '',
        // Ubicacion Actual
        ubicacionActual: '',
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
        setNumeroRegistroSolicitud: (numeroRegistroSolicitud) => set({ numeroRegistroSolicitud }),
        setSolicitudDe: (solicitudDe) => set({ solicitudDe }),
        setCategoriaVisa: (categoriaVisa) => set({ categoriaVisa }),
        setClaseVisa: (claseVisa) => set({ claseVisa }),
        setTipoSolicitud: (tipoSolicitud) => set({ tipoSolicitud }),
        setTipoSolicitante: (tipoSolicitante) => set({ tipoSolicitante }),
        setMediaName: (mediaName) => set({ mediaName }),
        setSpecifyActivity: (specifyActivity) => set({ specifyActivity }),
        setVisitReason: (visitReason) => set({ visitReason }),
        setInstitution: (institution) => set({ institution }),
        setEntityNameColombia: (entityNameColombia) => set({ entityNameColombia }),
        setParticipationEvent: (participationEvent) => set({ participationEvent }),
        setAgreement: (agreement) => set({ agreement }),
        setBusinessCategory: (businessCategory) => set({ businessCategory }),
        setCompany: (company) => set({ company }),
        setBusinessNit: (businessNit) => set({ businessNit }),
        setBusinessPosition: (businessPosition) => set({ businessPosition }),
        setBusinessSector: (businessSector) => set({ businessSector }),
        setHadColombianVisa: (hadColombianVisa) => set({ hadColombianVisa }),
        setPreviousVisaDenied: (previousVisaDenied) => set({ previousVisaDenied }),
        setPreviousVisaCancelledOrInadmitted: (previousVisaCancelledOrInadmitted) => set({ previousVisaCancelledOrInadmitted }),
        setPreviousVisaType: (previousVisaType) => set({ previousVisaType }),
        setPreviousVisaNumber: (previousVisaNumber) => set({ previousVisaNumber }),
        setPreviousVisaIssueDate: (previousVisaIssueDate) => set({ previousVisaIssueDate }),
        setPreviousVisaExpiryDate: (previousVisaExpiryDate) => set({ previousVisaExpiryDate }),
        setPreviousVisaIssuePlace: (previousVisaIssuePlace) => set({ previousVisaIssuePlace }),
        setDeniedVisaClass: (deniedVisaClass) => set({ deniedVisaClass }),
        setDeniedVisaDate: (deniedVisaDate) => set({ deniedVisaDate }),
        setCancelledOrInadmittedVisaType: (cancelledOrInadmittedVisaType) => set({ cancelledOrInadmittedVisaType }),
        setCancelledOrInadmittedVisaDate: (cancelledOrInadmittedVisaDate) => set({ cancelledOrInadmittedVisaDate }),
        // Información Complementaria
        setTienePEP: (tienePEP) => set({ tienePEP }),
        setTienePPT: (tienePPT) => set({ tienePPT }),
        setTieneTMF: (tieneTMF) => set({ tieneTMF }),
        setTieneSC2: (tieneSC2) => set({ tieneSC2 }),
        setNumeroPEP: (numeroPEP) => set({ numeroPEP }),
        setFechaExpedicionPEP: (fechaExpedicionPEP) => set({ fechaExpedicionPEP }),
        setFechaVencimientoPEP: (fechaVencimientoPEP) => set({ fechaVencimientoPEP }),
        setNumeroPPT: (numeroPPT) => set({ numeroPPT }),
        setFechaExpedicionPPT: (fechaExpedicionPPT) => set({ fechaExpedicionPPT }),
        setFechaVencimientoPPT: (fechaVencimientoPPT) => set({ fechaVencimientoPPT }),
        setNumeroTMF: (numeroTMF) => set({ numeroTMF }),
        setFechaExpedicionTMF: (fechaExpedicionTMF) => set({ fechaExpedicionTMF }),
        setFechaVencimientoTMF: (fechaVencimientoTMF) => set({ fechaVencimientoTMF }),
        setNumeroSC2: (numeroSC2) => set({ numeroSC2 }),
        setFechaExpedicionSC2: (fechaExpedicionSC2) => set({ fechaExpedicionSC2 }),
        setFechaVencimientoSC2: (fechaVencimientoSC2) => set({ fechaVencimientoSC2 }),
        // Información Adicional
        setExpulsadoColombia: (expulsadoColombia) => set({ expulsadoColombia }),
        setDeportadoColombia: (deportadoColombia) => set({ deportadoColombia }),
        setProcesosPenales: (procesosPenales) => set({ procesosPenales }),
        setPermanenciaSinVisa: (permanenciaSinVisa) => set({ permanenciaSinVisa }),
        setCedulaExtranjeria: (cedulaExtranjeria) => set({ cedulaExtranjeria }),
        // Familiares en Colombia
        setFamiliaresColombia: (familiaresColombia) => set({ familiaresColombia }),
        // Ubicacion Actual
        setUbicacionActual: (ubicacionActual) => set({ ubicacionActual }),
        clear: () => set({
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
          numeroRegistroSolicitud: '',
          solicitudDe: '',
          categoriaVisa: '',
          claseVisa: '',
          tipoSolicitud: '',
          tipoSolicitante: '',
          mediaName: '',
          specifyActivity: '',
          visitReason: '',
          institution: '',
          entityNameColombia: '',
          participationEvent: '',
          agreement: '',
          businessCategory: '',
          company: '',
          businessNit: '',
          businessPosition: '',
          businessSector: '',
          hadColombianVisa: '',
          previousVisaDenied: '',
          previousVisaCancelledOrInadmitted: '',
          previousVisaType: '',
          previousVisaNumber: '',
          previousVisaIssueDate: '',
          previousVisaExpiryDate: '',
          previousVisaIssuePlace: '',
          deniedVisaClass: '',
          deniedVisaDate: '',
          cancelledOrInadmittedVisaType: '',
          cancelledOrInadmittedVisaDate: '',
          // Información Complementaria
          tienePEP: '',
          tienePPT: '',
          tieneTMF: '',
          tieneSC2: '',
          numeroPEP: '',
          fechaExpedicionPEP: '',
          fechaVencimientoPEP: '',
          numeroPPT: '',
          fechaExpedicionPPT: '',
          fechaVencimientoPPT: '',
          numeroTMF: '',
          fechaExpedicionTMF: '',
          fechaVencimientoTMF: '',
          numeroSC2: '',
          fechaExpedicionSC2: '',
          fechaVencimientoSC2: '',
          // Información Adicional
          expulsadoColombia: '',
          deportadoColombia: '',
          procesosPenales: '',
          permanenciaSinVisa: '',
          cedulaExtranjeria: '',
          familiaresColombia: '',
          ubicacionActual: ''
        }),
      }),
      {
        name: 'visaStore',
      }
    )
  )
);
