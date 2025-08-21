import React, { useState } from 'react';
import { useCertificationStore } from '../../stores/certificationStore';
import { createCertification } from '../../services/CertificationService';
import { SessionStore } from '../../stores/sessionStore';
import Swal from 'sweetalert2';

type LiquidationStepProps = {
  onNext: () => void;
  onBack: () => void;
};

const LiquidationStep = ({ onNext, onBack }: LiquidationStepProps) => {
  const {
    montoLiquidado,
    numeroConsecutivo,
    setMontoLiquidado,
    setNumeroConsecutivo,
    getAllData,
  } = useCertificationStore();
  
  const { userId } = SessionStore();

  const [monto, setMonto] = useState(montoLiquidado || 0);
  const [consecutivo, setConsecutivo] = useState(numeroConsecutivo || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleNext = async () => {
    try {
      // Verificar que el usuario esté autenticado
      if (!userId) {
        setError('Debe estar autenticado para enviar la certificación. Por favor, inicie sesión.');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      // Guardar los datos de liquidación en el store
      setMontoLiquidado(monto);
      setNumeroConsecutivo(consecutivo);
      
      // Obtener todos los datos del store para enviar a la API
      const allData = getAllData();
      console.log('Todos los datos recopilados:', allData);
      
      // Verificar campos específicos
      console.log('Campo certificateType:', allData.certificateType);
      console.log('Campo entidadDestino:', allData.entidadDestino);
      console.log('Campo montoLiquidado:', allData.montoLiquidado);
      console.log('Campo numeroConsecutivo:', allData.numeroConsecutivo);
      console.log('Campo nacionalidad:', allData.nacionalidad);
      console.log('UserId del store de sesión:', userId);
      
      // Preparar el payload para la API
      const payload = {
        certificationType: allData.certificateType || 'CERTIFICACIONES',
        destinationEntity: allData.entidadDestino || 'FONDO DE PENSIÓN',
        settledAmount: 0,
        consecutiveNumber: 'CERT-2024-001',
        userId: userId, // Obtener del store de sesión
        nationality: allData.nacionalidad || 'Colombia',
      };
      
      console.log('Payload para la API:', payload);
      
      // Enviar datos a la API
      const response = await createCertification(payload);
      console.log('Respuesta de la API:', response);
      
      // Mostrar modal de éxito
      await Swal.fire({
        title: 'Solicitud Creada',
        icon: 'success',
        iconColor: '#3466cc',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3466cc',
        customClass: {
          popup: 'swal2-border-radius',
          confirmButton: 'swal2-confirm-custom',
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      
      // Si todo sale bien, continuar al siguiente paso
      onNext();
      
    } catch (error) {
      console.error('Error al enviar la certificación:', error);
      // setError('Error al enviar la certificación. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Liquidar trámite</h2>
    
    {/* Mostrar error si existe */}
    {error && (
      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    )}
    
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Información de solicitud</h3>
      <div className="flex justify-between bg-gray-100 p-4 rounded-sm">
        <p>Num.solicitud: 67535467</p>
        <p>Trámite: Certificaciones/Certificación</p>
        <p>Oficina: C. México</p>
        <p>Estado del trámite: En liquidación</p>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Liquidación de pago</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-sm">
        <div className='flex flex-col gap-3'>
          <p>Nombres y apellidos: Mariano Ramirez López</p>
          <p>Tipo de documento: Cédula de ciudadanía</p>
          <p>Número de documento: 093638293</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p>Nacionalidad: Colombia</p>
          <p>Fecha de liquidación: dd/mm/yyyy hh:mm AM/PM</p>
        </div>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Concepto de Recaudo</th>
            <th className="py-2 px-4 text-left">Moneda Reporte (USD)</th>
            <th className="py-2 px-4 text-left">Moneda Local (USD)</th>
            <th className="py-2 px-4 text-left">Seleccionar concepto</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-200'>
            <td className="py-2 px-4">Tipo concepto</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Buscar concepto</title>
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Otros conceptos agregados</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Buscar concepto</title>
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Total a pagar:</td>
            <td className="py-2 px-4">${monto.toFixed(2)}</td>
            <td className="py-2 px-4">${monto.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Descuento</h3>
      <p>¿Desea aplicar descuento?</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input type="radio" name="descuento" value="si" className="mr-2" />
          Sí
        </label>
        <label className="flex items-center">
          <input type="radio" name="descuento" value="no" className="mr-2" />
          No
        </label>
      </div>
      <p className="text-sm text-gray-600">Para aplicar debe tener la documentación requerida según la normativa.</p>
    </div>

    {/* Campos para configuración de la API */}
    {/* <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Configuración para la API</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Monto Liquidado (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Número Consecutivo</label>
          <input
            type="text"
            value={consecutivo}
            onChange={(e) => setConsecutivo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: CERT-2024-001"
          />
        </div>
      </div>
    </div> */}

    <div className="flex gap-5 justify-end mt-8">
      <button 
        onClick={onBack} 
        disabled={isLoading}
        className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Regresar
      </button>
      <button 
        onClick={handleNext} 
        disabled={isLoading}
        className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Enviando...
          </>
        ) : (
          'Siguiente'
        )}
      </button>
    </div>
  </div>
  );
}

export default LiquidationStep;
