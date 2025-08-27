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
      especificacionExpulsion: useVisaStore((state: VisaStoreState) => state.especificacionExpulsion) || "",
      deportadoColombia: useVisaStore((state: VisaStoreState) => state.deportadoColombia) || "",
      especificacionDeportacion: useVisaStore((state: VisaStoreState) => state.especificacionDeportacion) || "",
      procesosPenales: useVisaStore((state: VisaStoreState) => state.procesosPenales) || "",
      especificacionProcesosPenales: useVisaStore((state: VisaStoreState) => state.especificacionProcesosPenales) || "",
      permanenciaSinVisa: useVisaStore((state: VisaStoreState) => state.permanenciaSinVisa) || "",
      especificacionPermanenciaSinVisa: useVisaStore((state: VisaStoreState) => state.especificacionPermanenciaSinVisa) || "",
      cedulaExtranjeria: useVisaStore((state: VisaStoreState) => state.cedulaExtranjeria) || "",
      especificacionCedulaExtranjeria: useVisaStore((state: VisaStoreState) => state.especificacionCedulaExtranjeria) || "",
      familiaresColombia: useVisaStore((state: VisaStoreState) => state.familiaresColombia) || "",
      parentescoFamiliar: useVisaStore((state: VisaStoreState) => state.parentescoFamiliar) || "",
      tipoVisaFamiliar: useVisaStore((state: VisaStoreState) => state.tipoVisaFamiliar) || "",
      nombreCompletoFamiliar: useVisaStore((state: VisaStoreState) => state.nombreCompletoFamiliar) || "",
      nacionalidadFamiliar: useVisaStore((state: VisaStoreState) => state.nacionalidadFamiliar) || "",
      ubicacionActual: useVisaStore((state: VisaStoreState) => state.ubicacionActual) || "",
      paisUbicacion: useVisaStore((state: VisaStoreState) => state.paisUbicacion) || "",
      ciudadUbicacion: useVisaStore((state: VisaStoreState) => state.ciudadUbicacion) || ""
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
  const setEspecificacionExpulsion = useVisaStore((state) => state.setEspecificacionExpulsion);
  const setDeportadoColombia = useVisaStore((state) => state.setDeportadoColombia);
  const setEspecificacionDeportacion = useVisaStore((state) => state.setEspecificacionDeportacion);
  const setProcesosPenales = useVisaStore((state) => state.setProcesosPenales);
  const setEspecificacionProcesosPenales = useVisaStore((state) => state.setEspecificacionProcesosPenales);
  const setPermanenciaSinVisa = useVisaStore((state) => state.setPermanenciaSinVisa);
  const setEspecificacionPermanenciaSinVisa = useVisaStore((state) => state.setEspecificacionPermanenciaSinVisa);
  const setCedulaExtranjeria = useVisaStore((state) => state.setCedulaExtranjeria);
  const setEspecificacionCedulaExtranjeria = useVisaStore((state) => state.setEspecificacionCedulaExtranjeria);
  const setFamiliaresColombia = useVisaStore((state) => state.setFamiliaresColombia);
  const setParentescoFamiliar = useVisaStore((state) => state.setParentescoFamiliar);
  const setTipoVisaFamiliar = useVisaStore((state) => state.setTipoVisaFamiliar);
  const setNombreCompletoFamiliar = useVisaStore((state) => state.setNombreCompletoFamiliar);
  const setNacionalidadFamiliar = useVisaStore((state) => state.setNacionalidadFamiliar);
  const setUbicacionActual = useVisaStore((state) => state.setUbicacionActual);
  const setPaisUbicacion = useVisaStore((state) => state.setPaisUbicacion);
  const setCiudadUbicacion = useVisaStore((state) => state.setCiudadUbicacion);
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
    setEspecificacionExpulsion(data.especificacionExpulsion || "");
    setDeportadoColombia(data.deportadoColombia);
    setEspecificacionDeportacion(data.especificacionDeportacion || "");
    setProcesosPenales(data.procesosPenales);
    setEspecificacionProcesosPenales(data.especificacionProcesosPenales || "");
    setPermanenciaSinVisa(data.permanenciaSinVisa);
    setEspecificacionPermanenciaSinVisa(data.especificacionPermanenciaSinVisa || "");
    setCedulaExtranjeria(data.cedulaExtranjeria);
    setEspecificacionCedulaExtranjeria(data.especificacionCedulaExtranjeria || "");
    setFamiliaresColombia(data.familiaresColombia);
    setParentescoFamiliar(data.parentescoFamiliar || "");
    setTipoVisaFamiliar(data.tipoVisaFamiliar || "");
    setNombreCompletoFamiliar(data.nombreCompletoFamiliar || "");
    setNacionalidadFamiliar(data.nacionalidadFamiliar || "");
    setUbicacionActual(data.ubicacionActual);
    setPaisUbicacion(data.paisUbicacion || "");
    setCiudadUbicacion(data.ciudadUbicacion || "");
    onNext(data);
  };

  console.log('Nacionalidad en Información Adicional:', nacionalidad);
  console.log('¿Es venezolano?', nacionalidad === "Venezolano");
  console.log('Store completo:', useVisaStore.getState());

  // Verificar si la nacionalidad es venezolana
  const isVenezuelan = nacionalidad === "Venezolano";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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
            
            {/* Campo condicional: Especifique */}
            {watch("expulsadoColombia") === "Si" && (
              <div className="mt-4 ml-4">
                <label className="block text-sm font-medium mb-2">
                  Especifique *
                </label>
                <Controller
                  name="especificacionExpulsion"
                  control={control}
                  rules={{ 
                    required: watch("expulsadoColombia") === "Si" ? "Este campo es requerido" : false 
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Por favor especifique los detalles de la expulsión..."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            )}
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
            
            {/* Campo condicional: Especifique deportación */}
            {watch("deportadoColombia") === "Si" && (
              <div className="mt-4 ml-4">
                <label className="block text-sm font-medium mb-2">
                  Especifique *
                </label>
                <Controller
                  name="especificacionDeportacion"
                  control={control}
                  rules={{ 
                    required: watch("deportadoColombia") === "Si" ? "Este campo es requerido" : false 
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Por favor especifique los detalles de la deportación..."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            )}
          </div>

          {/* Pregunta 3: Procesos penales */}
          <div className="w-full mb-3">
            <p className="block text-sm font-medium mb-1">
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
            
            {/* Campo condicional: Especifique procesos penales */}
            {watch("procesosPenales") === "Si" && (
              <div className="mt-4 ml-4">
                <label className="block text-sm font-medium mb-2">
                  Especifique *
                </label>
                <Controller
                  name="especificacionProcesosPenales"
                  control={control}
                  rules={{ 
                    required: watch("procesosPenales") === "Si" ? "Este campo es requerido" : false 
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Por favor especifique los detalles de los procesos penales..."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            )}
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

            {/* Campo condicional: Especifique permanencia sin visa */}
            {watch("permanenciaSinVisa") === "Si" && (
              <div className="mt-4 ml-4">
                <label className="block text-sm font-medium mb-2">
                  Especifique *
                </label>
                <Controller
                  name="especificacionPermanenciaSinVisa"
                  control={control}
                  rules={{ 
                    required: watch("permanenciaSinVisa") === "Si" ? "Este campo es requerido" : false 
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Por favor especifique los detalles de su permanencia sin visa..."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            )}
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

            {/* Campo condicional: Especifique cédula de extranjería */}
            {watch("cedulaExtranjeria") === "Si" && (
              <div className="mt-4 ml-4">
                <label className="block text-sm font-medium mb-2">
                  Especifique *
                </label>
                <Controller
                  name="especificacionCedulaExtranjeria"
                  control={control}
                  rules={{ 
                    required: watch("cedulaExtranjeria") === "Si" ? "Este campo es requerido" : false 
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Por favor especifique los detalles de su cédula de extranjería..."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            )}
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
            
            {/* Campos condicionales: Información del familiar */}
            {watch("familiaresColombia") === "Si" && (
              <div className="mt-6 ml-4 space-y-4 grid grid-cols-2 gap-4">
                {/* Parentesco */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Parentesco *
                  </label>
                  <Controller
                    name="parentescoFamiliar"
                    control={control}
                    rules={{ 
                      required: watch("familiaresColombia") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <select
                          {...field}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Seleccione Parentesco</option>
                          <option value="Padre">Padre</option>
                          <option value="Madre">Madre</option>
                          <option value="Hermano">Hermano</option>
                          <option value="Hermana">Hermana</option>
                          <option value="Hijo">Hijo</option>
                          <option value="Hija">Hija</option>
                          <option value="Esposo">Esposo</option>
                          <option value="Esposa">Esposa</option>
                          <option value="Abuelo">Abuelo</option>
                          <option value="Abuela">Abuela</option>
                          <option value="Tío">Tío</option>
                          <option value="Tía">Tía</option>
                          <option value="Primo">Primo</option>
                          <option value="Prima">Prima</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Tipo de Visa */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Tipo Visa *
                  </label>
                  <Controller
                    name="tipoVisaFamiliar"
                    control={control}
                    rules={{ 
                      required: watch("familiaresColombia") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <select
                          {...field}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Seleccione...</option>
                          <option value="Visa de Turista">Visa de Turista</option>
                          <option value="Visa de Trabajo">Visa de Trabajo</option>
                          <option value="Visa de Estudiante">Visa de Estudiante</option>
                          <option value="Visa de Negocios">Visa de Negocios</option>
                          <option value="Visa de Inversionista">Visa de Inversionista</option>
                          <option value="Visa de Reunificación Familiar">Visa de Reunificación Familiar</option>
                          <option value="Visa de Residente">Visa de Residente</option>
                          <option value="Ciudadanía Colombiana">Ciudadanía Colombiana</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Nombre Completo del Familiar */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Nombre Completo del Familiar *
                  </label>
                  <Controller
                    name="nombreCompletoFamiliar"
                    control={control}
                    rules={{ 
                      required: watch("familiaresColombia") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Ingrese el nombre completo del familiar"
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        />
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Nacionalidad */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Nacionalidad *
                  </label>
                  <Controller
                    name="nacionalidadFamiliar"
                    control={control}
                    rules={{ 
                      required: watch("familiaresColombia") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <select
                          {...field}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Seleccione Nacionalidad</option>
                          <option value="Venezolana">Venezolana</option>
                          <option value="Estadounidense">Estadounidense</option>
                          <option value="Española">Española</option>
                          <option value="Mexicana">Mexicana</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Chilena">Chilena</option>
                          <option value="Peruana">Peruana</option>
                          <option value="Ecuatoriana">Ecuatoriana</option>
                          <option value="Brasileña">Brasileña</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            )}
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
            
            {/* Campos condicionales: Información de ubicación fuera de Colombia */}
            {watch("ubicacionActual") === "Si" && (
              <div className="mt-6 ml-4 space-y-4 grid grid-cols-2 gap-4">
                {/* País */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Indique en que país se encuentra *
                  </label>
                  <Controller
                    name="paisUbicacion"
                    control={control}
                    rules={{ 
                      required: watch("ubicacionActual") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Ingrese el país donde se encuentra"
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        />
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Ciudad */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Indique en la ciudad en donde se encuentra *
                  </label>
                  <Controller
                    name="ciudadUbicacion"
                    control={control}
                    rules={{ 
                      required: watch("ubicacionActual") === "Si" ? "Este campo es requerido" : false 
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Ingrese la ciudad donde se encuentra"
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        />
                        {fieldState.error && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            )}
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
    </div>
  );
};
