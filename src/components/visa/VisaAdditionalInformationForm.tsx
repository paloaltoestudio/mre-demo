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
      tieneSC2: useVisaStore((state: VisaStoreState) => state.tieneSC2) || "",
      numeroPEP: useVisaStore((state: VisaStoreState) => state.numeroPEP) || "",
      fechaExpedicionPEP: useVisaStore((state: VisaStoreState) => state.fechaExpedicionPEP) || "",
      fechaVencimientoPEP: useVisaStore((state: VisaStoreState) => state.fechaVencimientoPEP) || "",
      numeroPPT: useVisaStore((state: VisaStoreState) => state.numeroPPT) || "",
      fechaExpedicionPPT: useVisaStore((state: VisaStoreState) => state.fechaExpedicionPPT) || "",
      fechaVencimientoPPT: useVisaStore((state: VisaStoreState) => state.fechaVencimientoPPT) || "",
      numeroTMF: useVisaStore((state: VisaStoreState) => state.numeroTMF) || "",
      fechaExpedicionTMF: useVisaStore((state: VisaStoreState) => state.fechaExpedicionTMF) || "",
      fechaVencimientoTMF: useVisaStore((state: VisaStoreState) => state.fechaVencimientoTMF) || "",
      numeroSC2: useVisaStore((state: VisaStoreState) => state.numeroSC2) || "",
      fechaExpedicionSC2: useVisaStore((state: VisaStoreState) => state.fechaExpedicionSC2) || "",
      fechaVencimientoSC2: useVisaStore((state: VisaStoreState) => state.fechaVencimientoSC2) || "",
      expulsadoColombia: useVisaStore((state: VisaStoreState) => state.expulsadoColombia) || "",
      deportadoColombia: useVisaStore((state: VisaStoreState) => state.deportadoColombia) || "",
      procesosPenales: useVisaStore((state: VisaStoreState) => state.procesosPenales) || "",
      permanenciaSinVisa: useVisaStore((state: VisaStoreState) => state.permanenciaSinVisa) || "",
      cedulaExtranjeria: useVisaStore((state: VisaStoreState) => state.cedulaExtranjeria) || "",
      familiaresColombia: useVisaStore((state: VisaStoreState) => state.familiaresColombia) || "",
      ubicacionActual: useVisaStore((state: VisaStoreState) => state.ubicacionActual) || ""
    }
  });

  const setTienePEP = useVisaStore((state) => state.setTienePEP);
  const setTienePPT = useVisaStore((state) => state.setTienePPT);
  const setTieneTMF = useVisaStore((state) => state.setTieneTMF);
  const setTieneSC2 = useVisaStore((state) => state.setTieneSC2);
  const setNumeroPEP = useVisaStore((state) => state.setNumeroPEP);
  const setFechaExpedicionPEP = useVisaStore((state) => state.setFechaExpedicionPEP);
  const setFechaVencimientoPEP = useVisaStore((state) => state.setFechaVencimientoPEP);
  const setNumeroPPT = useVisaStore((state) => state.setNumeroPPT);
  const setFechaExpedicionPPT = useVisaStore((state) => state.setFechaExpedicionPPT);
  const setFechaVencimientoPPT = useVisaStore((state) => state.setFechaVencimientoPPT);
  const setNumeroTMF = useVisaStore((state) => state.setNumeroTMF);
  const setFechaExpedicionTMF = useVisaStore((state) => state.setFechaExpedicionTMF);
  const setFechaVencimientoTMF = useVisaStore((state) => state.setFechaVencimientoTMF);
  const setNumeroSC2 = useVisaStore((state) => state.setNumeroSC2);
  const setFechaExpedicionSC2 = useVisaStore((state) => state.setFechaExpedicionSC2);
  const setFechaVencimientoSC2 = useVisaStore((state) => state.setFechaVencimientoSC2);
  const setExpulsadoColombia = useVisaStore((state) => state.setExpulsadoColombia);
  const setDeportadoColombia = useVisaStore((state) => state.setDeportadoColombia);
  const setProcesosPenales = useVisaStore((state) => state.setProcesosPenales);
  const setPermanenciaSinVisa = useVisaStore((state) => state.setPermanenciaSinVisa);
  const setCedulaExtranjeria = useVisaStore((state) => state.setCedulaExtranjeria);
  const setFamiliaresColombia = useVisaStore((state) => state.setFamiliaresColombia);
  const setUbicacionActual = useVisaStore((state) => state.setUbicacionActual);
  // Obtener la nacionalidad del store para mostrar condicionalmente la sección
  const nacionalidad = useVisaStore((state) => state.nacionalidad);

  // Watch the tienePEP value to conditionally show fields
  const tienePEPValue = watch("tienePEP");
  const tienePPTValue = watch("tienePPT");
  const tieneTMFValue = watch("tieneTMF");
  const tieneSC2Value = watch("tieneSC2");

  const onSubmit = (data: AdditionalInformationData) => {
    // Guardar en el store
    setTienePEP(data.tienePEP);
    setTienePPT(data.tienePPT);
    setTieneTMF(data.tieneTMF);
    setTieneSC2(data.tieneSC2);
    setNumeroPEP(data.numeroPEP);
    setFechaExpedicionPEP(data.fechaExpedicionPEP);
    setFechaVencimientoPEP(data.fechaVencimientoPEP);
    setNumeroPPT(data.numeroPPT);
    setFechaExpedicionPPT(data.fechaExpedicionPPT);
    setFechaVencimientoPPT(data.fechaVencimientoPPT);
    setNumeroTMF(data.numeroTMF);
    setFechaExpedicionTMF(data.fechaExpedicionTMF);
    setFechaVencimientoTMF(data.fechaVencimientoTMF);
    setNumeroSC2(data.numeroSC2);
    setFechaExpedicionSC2(data.fechaExpedicionSC2);
    setFechaVencimientoSC2(data.fechaVencimientoSC2);
    setExpulsadoColombia(data.expulsadoColombia);
    setDeportadoColombia(data.deportadoColombia);
    setProcesosPenales(data.procesosPenales);
    setPermanenciaSinVisa(data.permanenciaSinVisa);
    setCedulaExtranjeria(data.cedulaExtranjeria);
    setFamiliaresColombia(data.familiaresColombia);
    setUbicacionActual(data.ubicacionActual);
    onNext(data);
  };

  console.log('Nacionalidad en Información Adicional:', nacionalidad);
  console.log('¿Es venezolano?', nacionalidad === "Venezolano");
  console.log('Store completo:', useVisaStore.getState());

  // Verificar si la nacionalidad es venezolana
  const isVenezuelan = nacionalidad === "Venezolano";

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <section
            id="visa-personal-data-form"
            aria-label="visa-personal-data-form"
            className="w-full"
          >
        

        {/* Sección: Información Complementaria - Solo para venezolanos */}
        {isVenezuelan && (
            <div className="flex flex-col space-y-8 mb-4">
              <h2 className="mb-4 text-md font-bold">Información Complementaria</h2>
              
              {/* PEP */}
              <div className="w-full mb-3">
                <p className="block text-sm font-medium mb-1">
                  ¿Usted tiene o ha tenido Permiso Especial de Permanencia (PEP)?*
                </p>
                <div className="flex space-x-6 ml-4">
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
                          <span className="text-base text-gray-900">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-base text-gray-900">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>

                {/* Campos condicionales cuando PEP es "Si" */}
                {tienePEPValue === "Si" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número del PEP */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número del PEP*
                      </label>
                      <Controller
                        name="numeroPEP"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese el número del PEP"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Expedición */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Expedición
                      </label>
                      <Controller
                        name="fechaExpedicionPEP"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <Controller
                        name="fechaVencimientoPEP"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PPT */}
              <div className="w-full mb-3">
                <p className="block text-sm font-medium mb-1">
                  ¿Usted tiene o ha tenido Permiso por Protección Temporal (PPT)?*
                </p>
                <div className="flex space-x-6 ml-4">
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
                          <span className="text-base text-gray-900">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-base text-gray-900">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>

                {/* Campos condicionales cuando PPT es "Si" */}
                {tienePPTValue === "Si" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número del PPT */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número del PPT*
                      </label>
                      <Controller
                        name="numeroPPT"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese el número del PPT"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Expedición del PPT */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Expedición
                      </label>
                      <Controller
                        name="fechaExpedicionPPT"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Vencimiento del PPT */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <Controller
                        name="fechaVencimientoPPT"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TMF */}
              <div className="w-full mb-3">
                <p className="block text-sm font-medium mb-1">
                  ¿Usted tiene o ha tenido Tarjeta de Movilidad Fronteriza (TMF)?*
                </p>
                <div className="flex space-x-6 ml-4">
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
                          <span className="text-base text-gray-900">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-base text-gray-900">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>

                {/* Campos condicionales cuando TMF es "Si" */}
                {tieneTMFValue === "Si" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número del TMF */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número del TMF*
                      </label>
                      <Controller
                        name="numeroTMF"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese el número del TMF"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Expedición del TMF */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Expedición
                      </label>
                      <Controller
                        name="fechaExpedicionTMF"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Vencimiento del TMF */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <Controller
                        name="fechaVencimientoTMF"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SC-2 */}
              <div className="w-full mb-3">
                <p className="block text-sm font-medium mb-1">
                  ¿Usted tiene o ha tenido Salvoconducto de Permanencia (SC-2)?*
                </p>
                <div className="flex space-x-6 ml-4">
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
                          <span className="text-base text-gray-900">Si</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="No"
                            checked={field.value === "No"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-base text-gray-900">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>

                {/* Campos condicionales cuando SC-2 es "Si" */}
                {tieneSC2Value === "Si" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número del SC-2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número del Salvoconducto (SC-2)*
                      </label>
                      <Controller
                        name="numeroSC2"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese el número del Salvoconducto (SC-2)"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Expedición del SC-2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Expedición
                      </label>
                      <Controller
                        name="fechaExpedicionSC2"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>

                    {/* Fecha de Vencimiento del SC-2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <Controller
                        name="fechaVencimientoSC2"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
              <hr className="border-gray-300" />
            </div>
        )}

        
        {/* Sección: Información Adicional - Para todos los usuarios */}
        <h2 className="mb-4 mt-8 text-md font-bold">Información Adicional</h2>
        <div className="flex flex-col space-y-8">
          {/* Pregunta 1: Expulsión de Colombia */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Ha sido expulsado de Colombia alguna vez?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="expulsadoColombia"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>

          {/* Pregunta 2: Deportación de Colombia */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Ha sido deportado de Colombia alguna vez?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="deportadoColombia"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>

          {/* Pregunta 3: Procesos penales */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1s">
              ¿Ha tenido o tiene procesos penales en su contra?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="procesosPenales"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>

          {/* Pregunta 4: Permanencia sin visa */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Alguna vez ha permanecido en Colombia sin visa que lo autorice?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="permanenciaSinVisa"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>

          {/* Pregunta 5: Cédula de extranjería */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Usted tiene o ha tenido cédula de extranjería en Colombia?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="cedulaExtranjeria"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Sección: Familiares en Colombia - Para todos los usuarios */}
        <h2 className="mb-4 mt-8 text-md font-bold">Familiares en Colombia</h2>
        <div className="flex flex-col space-y-8">
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Algún familiar suyo reside en Colombia?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="familiaresColombia"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Sección: Informacion de ubicacion - Para todos los usuarios */}
        <h2 className="mb-4 mt-8 text-md font-bold">Información de ubicación</h2>
        <div className="flex flex-col space-y-8">
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
              ¿Al momento de realizar esta solicitud, se encuentra fuera de Colombia?*
            </p>
            <div className="flex space-x-6 ml-4">
              <Controller
                name="ubicacionActual"
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
                      <span className="text-base text-gray-900">Si</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="No"
                        checked={field.value === "No"}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-900">No</span>
                    </label>
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex gap-5 justify-end mt-8">
          <button
            type="button"
            onClick={onBack}
            className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
          >
            Siguiente
          </button>
        </div>
        </section>
      </form>
  );
};
