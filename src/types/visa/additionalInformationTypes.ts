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
  deportadoColombia: string;
  procesosPenales: string;
  permanenciaSinVisa: string;
  cedulaExtranjeria: string;
  familiaresColombia: string;
  ubicacionActual: string;
}

export interface VisaAdditionalInformationFormProps {
  onNext: (data: AdditionalInformationData) => void;
  onBack: () => void;
}
