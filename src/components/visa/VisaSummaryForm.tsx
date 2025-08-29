import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVisaStore } from '../../stores/visaStore';

interface VisaSummaryFormProps {
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  onExit: () => void;
}

export const VisaSummaryForm: React.FC<VisaSummaryFormProps> = ({
  // onNext,
  onBack,
  onEdit,
  // onExit
}) => {
  const navigate = useNavigate();
  const visaStore = useVisaStore();

  const handleEditStep = (step: number) => {
    onEdit(step);
  };

  const handleRegister = async () => {
    try {
      // Aquí se implementaría la lógica para registrar la solicitud
      console.log('Registrando solicitud de visa...');
      
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
      
      // Redirigir al home después de la confirmación
      navigate('/home');
      
    } catch (error) {
      console.error('Error al registrar la solicitud:', error);
      // Mostrar error si algo falla
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la solicitud. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'modal-button'
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Encabezado del Resumen */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Resumen de Solicitud de {visaStore.categoriaVisa ? `Visa ${visaStore.categoriaVisa}` : 'Visa'}
        </h1>
        <p className="text-gray-600">
          Revisa toda la información antes de registrar formalmente tu solicitud
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Solicitud a: Título propio o en calidad de tercero */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            1. Solicitud a: {visaStore.tipoSolicitud || 'Título propio'}
          </h3>
          <div className="text-gray-700">
            {visaStore.tipoSolicitud === 'tercero' ? (
              <p>Solicitud en calidad de tercero</p>
            ) : (
              <p>Solicitud a título propio</p>
            )}
          </div>
          <button
            onClick={() => handleEditStep(1)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 2. Datos del extranjero solicitante de visa */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            2. Datos del extranjero solicitante de visa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><strong>Primer Nombre:</strong> {visaStore.primerNombre || 'No especificado'}</p>
              <p><strong>Segundo Nombre:</strong> {visaStore.segundoNombre || 'No especificado'}</p>
              <p><strong>Primer Apellido:</strong> {visaStore.primerApellido || 'No especificado'}</p>
              <p><strong>Segundo Apellido:</strong> {visaStore.segundoApellido || 'No especificado'}</p>
            </div>
            <div>
              <p><strong>Nacionalidad:</strong> {visaStore.nacionalidad || 'No especificado'}</p>
              <p><strong>Fecha de nacimiento:</strong> {visaStore.fechaNacimiento || 'No especificado'}</p>
              <p><strong>Género:</strong> {visaStore.genero || 'No especificado'}</p>
              <p><strong>Número de pasaporte:</strong> {visaStore.numeroPasaporte || 'No especificado'}</p>
            </div>
          </div>
          <button
            onClick={() => handleEditStep(2)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 3. Calidad del solicitante de visa */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            3. Calidad del solicitante de visa: {visaStore.tipoSolicitante || 'Titular'}
          </h3>
          <div className="text-gray-700">
            <p>El solicitante actúa como: <strong>{visaStore.tipoSolicitante || 'Titular'}</strong></p>
          </div>
          <button
            onClick={() => handleEditStep(3)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 4. Preguntas y respuestas sobre antecedentes */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            4. Antecedentes de visa y control migratorio
          </h3>
          <div className="text-gray-700 space-y-2">
            <p><strong>¿Ha tenido visa colombiana anteriormente?</strong> {visaStore.hadColombianVisa === 'si' ? 'Sí' : 'No'}</p>
            {visaStore.hadColombianVisa === 'si' && (
              <p><strong>Número de visa anterior:</strong> {visaStore.previousVisaNumber || 'No especificado'}</p>
            )}
            <p><strong>¿Ha sido deportado de Colombia?</strong> {visaStore.deportadoColombia === 'si' ? 'Sí' : 'No'}</p>
            <p><strong>¿Tiene procesos penales?</strong> {visaStore.procesosPenales === 'si' ? 'Sí' : 'No'}</p>
          </div>
          <button
            onClick={() => handleEditStep(5)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 5. Visualización foto */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            5. Foto del solicitante
          </h3>
          <div className="text-gray-700">
            {visaStore.fotoPreviewUrl ? (
              <div className="w-32 h-40 border rounded overflow-hidden">
                <img 
                  src={visaStore.fotoPreviewUrl} 
                  alt="Foto del solicitante" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <p className="text-gray-500">No se ha cargado foto</p>
            )}
          </div>
          <button
            onClick={() => handleEditStep(6)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 6. Visualización copia pasaporte */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            6. Copia del pasaporte
          </h3>
          <div className="text-gray-700">
            {visaStore.numeroPasaporte ? (
              <div className="text-gray-700">
                <p><strong>Número de pasaporte:</strong> {visaStore.numeroPasaporte}</p>
                <p><strong>Fecha de expedición:</strong> {visaStore.fechaExpedicionPasaporte || 'No especificado'}</p>
                <p><strong>Fecha de vencimiento:</strong> {visaStore.fechaVencimientoPasaporte || 'No especificado'}</p>
              </div>
            ) : (
              <p className="text-gray-500">No se ha especificado información del pasaporte</p>
            )}
          </div>
          <button
            onClick={() => handleEditStep(6)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 7. Tipo de solicitud y datos de la solicitud */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            7. Tipo de solicitud y datos de la solicitud
          </h3>
          <div className="text-gray-700 space-y-2">
            <p><strong>Tipo de solicitud:</strong> {visaStore.tipoSolicitud || 'Visa'}</p>
            <p><strong>Categoría de visa:</strong> {visaStore.categoriaVisa || 'No especificado'}</p>
            <p><strong>Clase de visa:</strong> {visaStore.claseVisa || 'No especificado'}</p>
            <p><strong>Motivo del viaje:</strong> {visaStore.visitReason || 'No especificado'}</p>
            <p><strong>Actividad en Colombia:</strong> {visaStore.activityInColombia || 'No especificado'}</p>
          </div>
          <button
            onClick={() => handleEditStep(1)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 8. Datos adicionales de caracterización */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            8. Datos adicionales de caracterización
          </h3>
          <div className="text-gray-700 space-y-2">
            <p><strong>Estado civil:</strong> {visaStore.estadoCivil || 'No especificado'}</p>
            <p><strong>Nivel educativo:</strong> {visaStore.nivelEducativo || 'No especificado'}</p>
            <p><strong>Título o diploma:</strong> {visaStore.tituloDiploma || 'No especificado'}</p>
            <p><strong>Área de conocimiento:</strong> {visaStore.areaConocimiento || 'No especificado'}</p>
            <p><strong>Sector laboral:</strong> {visaStore.sector || 'No especificado'}</p>
            <p><strong>Cargo:</strong> {visaStore.position || 'No especificado'}</p>
          </div>
          <button
            onClick={() => handleEditStep(4)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>

        {/* 9. Datos de contacto */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            9. Datos de contacto
          </h3>
          <div className="text-gray-700 space-y-2">
            <p><strong>País de domicilio:</strong> {visaStore.paisDomicilio || 'No especificado'}</p>
            <p><strong>Ciudad de domicilio:</strong> {visaStore.ciudadDomicilio || 'No especificado'}</p>
            <p><strong>Dirección de domicilio:</strong> {visaStore.direccionDomicilio || 'No especificado'}</p>
            <p><strong>Teléfono de domicilio:</strong> {visaStore.telefonoDomicilio || 'No especificado'}</p>
            <p><strong>Correo electrónico:</strong> {visaStore.correoElectronico || 'No especificado'}</p>
          </div>
          <button
            onClick={() => handleEditStep(3)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-5 justify-end mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={() => {
            Swal.fire({
              title: '¿Estás seguro?',
              text: 'Si sales ahora, perderás toda la información ingresada en la solicitud de visa.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, salir',
              cancelButtonText: 'Cancelar',
              confirmButtonColor: '#dc2626',
              cancelButtonColor: '#6b7280',
              customClass: {
                popup: 'swal2-border-radius',
                confirmButton: 'swal2-confirm-custom',
                cancelButton: 'swal2-cancel-custom',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/home');
              }
            });
          }}
          className="text-red-600 border-2 border-red-600 hover:text-white hover:border-red-700 font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-red-700 duration-150"
        >
          Salir y Abandonar
        </button>
        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
        >
          Registrar Solicitud
        </button>
      </div>
    </div>
  );
};
