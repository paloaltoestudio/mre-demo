import React, { useState, useEffect } from 'react';
import { useCertificationStore } from '../../stores/certificationStore';
import { useCertification } from '../../hooks/useCertification';
import { CertificationService } from '../../services/CertificationService';

interface CertificationFinalStepProps {
  onBack: () => void;
  onComplete: () => void;
}

export const CertificationFinalStep: React.FC<CertificationFinalStepProps> = ({ onBack, onComplete }) => {
  const { getAllData, clear } = useCertificationStore();
  const { isLoading, error, success, createCertification, resetState } = useCertification();
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleSubmitToAPI = async () => {
    try {
      // Obtener todos los datos del store
      const allData = getAllData();
      console.log('Enviando datos a la API:', allData);

      // Preparar el payload para la API
      const payload = {
        certificationType: allData.certificateType || 'CERTIFICACIONES',
        destinationEntity: allData.entidadDestino || 'FONDO DE PENSIÓN',
        settledAmount: allData.montoLiquidado || 0,
        consecutiveNumber: allData.numeroConsecutivo || 'CERT-2024-001',
        userId: 1, // TODO: Obtener del contexto de autenticación
        nationality: allData.nacionalidad || 'Colombia',
      };

      console.log('Payload para la API:', payload);

      // Llamar al servicio
      const response = await createCertification(payload);
      setApiResponse(response);
      
      // Si es exitoso, limpiar el store y continuar
      if (success) {
        clear();
        resetState();
        onComplete();
      }
    } catch (err) {
      console.error('Error al enviar a la API:', err);
    }
  };

  const handleBack = () => {
    onBack();
  };

  const handleComplete = () => {
    clear();
    resetState();
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen y Envío Final</h2>
      
      {/* Resumen de datos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Resumen de la Solicitud</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">Datos del Solicitante</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Tipo de Certificado:</span> {getAllData().certificateType || 'No especificado'}</p>
              <p><span className="font-medium">Nombre:</span> {getAllData().primerNombre} {getAllData().segundoNombre} {getAllData().primerApellido} {getAllData().segundoApellido}</p>
              <p><span className="font-medium">Documento:</span> {getAllData().tipoDocumento} {getAllData().numeroDocumento}</p>
              <p><span className="font-medium">Nacionalidad:</span> {getAllData().nacionalidad}</p>
              <p><span className="font-medium">Email:</span> {getAllData().email}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">Datos de la Solicitud</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Entidad Destino:</span> {getAllData().entidadDestino}</p>
              <p><span className="font-medium">Idioma:</span> {getAllData().idioma}</p>
              <p><span className="font-medium">Oficina:</span> {getAllData().oficina}</p>
              <p><span className="font-medium">Monto:</span> ${getAllData().montoLiquidado?.toFixed(2) || '0.00'}</p>
              <p><span className="font-medium">Consecutivo:</span> {getAllData().numeroConsecutivo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de la API */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">Error al procesar la solicitud</h4>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">¡Solicitud procesada exitosamente!</h4>
          <p className="text-green-700 text-sm">La certificación ha sido creada en el sistema.</p>
          {apiResponse && (
            <div className="mt-3 p-3 bg-green-100 rounded">
              <p className="text-green-800 text-sm">
                <strong>ID:</strong> {apiResponse.data?.id}<br/>
                <strong>Estado:</strong> {apiResponse.status}<br/>
                <strong>Mensaje:</strong> {apiResponse.message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Regresar
        </button>
        
        {!success ? (
          <button
            type="button"
            onClick={handleSubmitToAPI}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar a la API'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleComplete}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Finalizar
          </button>
        )}
      </div>

      {/* Información de debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Debug Info (Solo desarrollo)</h4>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(getAllData(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
