export interface AdditionalInformationData {
  tienePEP: string;
  tienePPT: string;
  tieneTMF: string;
  tieneSC2: string;
}

export interface VisaAdditionalInformationFormProps {
  onNext: (data: AdditionalInformationData) => void;
  onBack: () => void;
}
