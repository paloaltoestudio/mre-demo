export interface AdditionalInformationData {
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
  especificacionExpulsion?: string; // Campo condicional para especificar expulsión
  deportadoColombia: string;
  especificacionDeportacion?: string; // Campo condicional para especificar deportación
  procesosPenales: string;
  especificacionProcesosPenales?: string; // Campo condicional para especificar procesos penales
  permanenciaSinVisa: string;
  especificacionPermanenciaSinVisa?: string; // Campo condicional para especificar permanencia sin visa
  cedulaExtranjeria: string;
  especificacionCedulaExtranjeria?: string; // Campo condicional para especificar cédula de extranjería
  familiaresColombia: string;
  parentescoFamiliar?: string; // Campo condicional para parentesco del familiar
  tipoVisaFamiliar?: string; // Campo condicional para tipo de visa del familiar
  nombreCompletoFamiliar?: string; // Campo condicional para nombre completo del familiar
  nacionalidadFamiliar?: string; // Campo condicional para nacionalidad del familiar
  ubicacionActual: string;
  paisUbicacion?: string; // Campo condicional para país de ubicación
  ciudadUbicacion?: string; // Campo condicional para ciudad de ubicación
}

export interface VisaAdditionalInformationFormProps {
  onNext: (data: AdditionalInformationData) => void;
  onBack: () => void;
}
