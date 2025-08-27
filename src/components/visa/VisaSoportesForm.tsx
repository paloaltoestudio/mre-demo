import React, { useState, useRef } from "react";
import Swal from 'sweetalert2';
import { useVisaStore } from '../../stores/visaStore';
import type { VisaSoportesFormProps } from '../../types/visa/soportesTypes';

export const VisaSoportesForm = ({ onNext, onBack }: VisaSoportesFormProps) => {
  const { setMediaName, setFotoPreviewUrl } = useVisaStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para los documentos de soporte
  const [supportDocuments, setSupportDocuments] = useState<Record<number, File>>({});

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor selecciona un archivo de imagen válido',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      // Validar tamaño (300 KB = 307,200 bytes)
      if (file.size > 307200) {
        Swal.fire({
          icon: 'warning',
          title: 'Archivo muy grande',
          text: 'El archivo debe tener un tamaño máximo de 300 KB',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      
      // Guardar en el store
      setMediaName(file.name);

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        setPreviewUrl(previewUrl);
        setFotoPreviewUrl(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Funciones para manejar documentos de soporte
  const handleDocumentUpload = (documentId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
              if (file.type !== 'application/pdf') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor selecciona un archivo PDF válido',
          confirmButtonText: 'Entendido'
        });
        return;
      }
        setSupportDocuments(prev => ({
          ...prev,
          [documentId]: file
        }));
      }
    };
    input.click();
  };

  const handleDocumentView = (documentId: number) => {
    const document = supportDocuments[documentId];
    if (document) {
      const url = URL.createObjectURL(document);
      window.open(url, '_blank');
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin documento',
        text: 'No hay documento cargado para ver',
        customClass: {
          confirmButton: 'modal-button'
        },
        confirmButtonText: 'Entendido'
      });
    }
  };

  const handleDocumentDelete = (documentId: number) => {
    if (supportDocuments[documentId]) {
      setSupportDocuments(prev => {
        const newDocs = { ...prev };
        delete newDocs[documentId];
        return newDocs;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Foto requerida',
        text: 'Por favor selecciona una foto',
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'modal-button'
        }
      });
      return;
    }

    // TODO: Implementar lógica de envío de datos
    onNext({
      fotoDigital: selectedFile,
      fileName: fileName,
      supportDocuments: supportDocuments
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="mb-4 text-md font-bold">Foto Digital</h2>
      
      {/* Box informativo */}
      <div className="bg-gray-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">i</span>
            </div>
          </div>
          <div className="ml-3 text-sm text-gray-700">
            <ul className="space-y-1">
              <li>• Foto reciente a color con fondo blanco de 4 centímetros de alto por 3 de ancho.</li>
              <li>• Debe estar mirando de frente a la cámara y la cabeza debe salir centrada y completa.</li>
              <li>• Ambos ojos deben salir abiertos y las orejas deben ser visibles.</li>
              <li>• No deben salir destellos en la foto, no permitir que el cabello u otros accesorios cubran el rostro.</li>
              <li>• El formato de la imagen es JPG y debe tener un tamaño máximo de 300 KB.</li>
              <li>• No usar la foto de la visa anterior</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Campo de carga de foto */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Foto *
            </label>
            
            <div className="flex items-center space-x-4">
              {/* Botón de carga */}
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <span className="text-lg">+</span>
                <span>Cargar Foto</span>
              </button>

              {/* Input file oculto */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Campo de nombre del archivo */}
              <input
                type="text"
                value={fileName}
                placeholder="Nombre del archivo"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />

              {/* Preview de la imagen */}
              <div className="w-16 h-16 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview de la foto" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Información del archivo seleccionado */}
            {selectedFile && (
              <div className="text-sm text-gray-600">
                <p>Archivo: {fileName}</p>
                <p>Tamaño: {(selectedFile.size / 1024).toFixed(1)} KB</p>
                <p>Tipo: {selectedFile.type}</p>
              </div>
            )}
          </div>

          {/* Sección de Documentos Soporte */}
          <div className="space-y-3">
            <h2 className="mb-4 text-md font-bold">Documentos Soporte Solicitud Visa</h2>
            <p className="text-sm text-gray-600 mb-4">
              Por favor adjunte los archivos en formato PDF, en el orden indicado, tenga en cuenta que modificar el orden de los documentos puede afectar el resultado de su solicitud.
            </p>

            {/* Tabla de documentos */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Orden</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Nombre</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">Documento Guardado</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">Opciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/* Documento 1 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">1</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Copia de la página principal del pasaporte o documento de viaje vigente donde aparecen registrados los datos personales del titular con hojas libres para visado.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[1] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(1)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(1)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(1)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 2 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">2</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Copia del último sello de ingreso, de salida o salvoconducto según el caso o copia del documento que demuestra su permanencia regular en el país de residencia diferente al propio.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[2] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(2)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(2)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(2)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 3 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">3</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Copia de la última visa colombiana. En caso de que ésta hubiere sido otorgada con el OCR este requisito no será necesario.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[3] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(3)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(3)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(3)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 4 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">4</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Poder debidamente otorgado si el trámite va a ser finalizado por un apoderado.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[4] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(4)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(4)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(4)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 5 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">5</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      En el caso que la solicitud se presente a título personal o individual o con respaldo y patrocinio de una persona natural: 1. Carta firmada por el solicitante o por la persona que respalda la solicitud que incluya: Identificación plena del solicitante o de la persona que respalda la visa (como aparece en el Pasaporte o cédula de ciudadanía), explicación sobre el vínculo con el extranjero, el motivo del viaje y declaración de responsabilidad económica por los gastos de estadía y desplazamientos personales o del extranjero. 2. Extractos bancarios del solicitante o de la persona que respalda la solicitud de los seis (6) meses previos a la solicitud de visa.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[5] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(5)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(5)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(5)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 6 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">6</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      En caso que la solicitud se presente con el respaldo de uno o varias personas jurídicas: 1. Carta firmada por el representante legal de la institución o empresa que incluya: Nombre de la institución o empresa, NIT (en caso de estar constituida legalmente en Colombia) y datos de contacto. Identificación completa del extranjero como aparece en el pasaporte. Actividad, duración y agenda prevista para el extranjero. Vínculo con el extranjero y cualificación o experticia. Declaración de responsabilidad económica por los gastos de estadía y desplazamientos del extranjero. 2. Cuando la institución o empresa que respalde la solicitud sea privada y constituida en el extranjero deberá aportar certificado de existencia y representación legal o el documento que haga sus veces debidamente apostillado o legalizado según corresponda. En caso de estar en un idioma diferente al castellano, deberá estar traducido y legalizado. 3. Acreditar liquidez mediante la presentación de los extractos bancarios de Institución o Empresa correspondientes a los 6 meses previos a la solicitud. Las entidades públicas no requieren cumplir con este requisito.
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[6] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(6)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(6)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(6)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Documento 11 */}
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">11</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Documentos Adicionales según requerimiento
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supportDocuments[11] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDocumentUpload(11)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Agregar documento"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentView(11)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Ver documento"
                        >
                          <span className="text-lg">🔍</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(11)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar documento"
                        >
                          <span className="text-lg">✗</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
