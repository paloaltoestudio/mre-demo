export interface VisaSoportesFormProps {
  onNext: (data: SoportesData) => void;
  onBack: () => void;
}

export interface SoportesData {
  fotoDigital: File;
  fileName: string;
  supportDocuments: Record<number, File>;
  // TODO: Agregar más campos de soportes según sea necesario
  // documentosIdentidad?: File[];
  // comprobantesResidencia?: File[];
  // certificadosLaborales?: File[];
  // etc.
}
