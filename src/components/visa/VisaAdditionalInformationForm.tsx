import { useForm, Controller } from "react-hook-form";
import { useVisaStore } from '../../stores/visaStore';
import type { VisaStoreState } from '../../stores/visaStore';
import type { AdditionalInformationData, VisaAdditionalInformationFormProps } from '../../types/visa/additionalInformationTypes';

export const VisaAdditionalInformationForm = ({ onNext, onBack }: VisaAdditionalInformationFormProps) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      tienePEP: useVisaStore((state: VisaStoreState) => state.tienePEP) || "",
      tienePPT: useVisaStore((state: VisaStoreState) => state.tienePPT) || "",
      tieneTMF: useVisaStore((state: VisaStoreState) => state.tieneTMF) || "",
      tieneSC2: useVisaStore((state: VisaStoreState) => state.tieneSC2) || ""
    }
  });

  const setTienePEP = useVisaStore((state) => state.setTienePEP);
  const setTienePPT = useVisaStore((state) => state.setTienePPT);
  const setTieneTMF = useVisaStore((state) => state.setTieneTMF);
  const setTieneSC2 = useVisaStore((state) => state.setTieneSC2);
  
  // Obtener la nacionalidad del store para mostrar condicionalmente la sección
  const nacionalidad = useVisaStore((state) => state.nacionalidad);

  const onSubmit = (data: AdditionalInformationData) => {
    // Guardar en el store
    setTienePEP(data.tienePEP);
    setTienePPT(data.tienePPT);
    setTieneTMF(data.tieneTMF);
    setTieneSC2(data.tieneSC2);
    
    onNext(data);
  };

  console.log('Nacionalidad en Información Adicional:', nacionalidad);
  console.log('¿Es venezolano?', nacionalidad === "Venezolano");
  console.log('Store completo:', useVisaStore.getState());

  // Verificar si la nacionalidad es venezolana
  const isVenezuelan = nacionalidad === "Venezolano";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Información Adicional
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Sección: Información Complementaria - Solo para venezolanos */}
        {isVenezuelan && (
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              Información Complementaria
            </h3>
            
            <div className="space-y-6">
              {/* PEP */}
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium text-sm">
                  ¿Usted tiene o ha tenido Permiso Especial de Permanencia (PEP)?*
                </label>
                <div className="flex space-x-4">
                  <Controller
                    name="tienePEP"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="Si"
                            checked={field.value === "Si"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* PPT */}
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium text-sm">
                  ¿Usted tiene o ha tenido Permiso por Protección Temporal (PPT)?*
                </label>
                <div className="flex space-x-4">
                  <Controller
                    name="tienePPT"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="Si"
                            checked={field.value === "Si"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* TMF */}
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium text-sm">
                  ¿Usted tiene o ha tenido Tarjeta de Movilidad Fronteriza (TMF)?*
                </label>
                <div className="flex space-x-4">
                  <Controller
                    name="tieneTMF"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="Si"
                            checked={field.value === "Si"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* SC-2 */}
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium text-sm">
                  ¿Usted tiene o ha tenido Salvoconducto de Permanencia (SC-2)?*
                </label>
                <div className="flex space-x-4">
                  <Controller
                    name="tieneSC2"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="Si"
                            checked={field.value === "Si"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        
        
        {/* Botones de navegación */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
