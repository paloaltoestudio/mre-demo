import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useVisaStore } from '../../stores/visaStore';
import type { VisaStoreState } from '../../stores/visaStore';

type ChildData = {
  id: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nacionalidad: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
};

type VisaPersonalDataFormProps = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export const VisaPersonalDataForm = ({ onNext, onBack }: VisaPersonalDataFormProps) => {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [childFormData, setChildFormData] = useState<Omit<ChildData, 'id'>>({
    tipoDocumento: "",
    numeroDocumento: "",
    nacionalidad: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: ""
  });

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      primerNombre: useVisaStore((state: VisaStoreState) => state.primerNombre) || "",
      segundoNombre: useVisaStore((state: VisaStoreState) => state.segundoNombre) || "",
      primerApellido: useVisaStore((state: VisaStoreState) => state.primerApellido) || "",
      segundoApellido: useVisaStore((state: VisaStoreState) => state.segundoApellido) || "",
      sexo: useVisaStore((state: VisaStoreState) => state.sexo) || "",
      estadoCivil: useVisaStore((state: VisaStoreState) => state.estadoCivil) || "",
      tieneOtraNacionalidad: useVisaStore((state: VisaStoreState) => state.tieneOtraNacionalidad) || "",
      tieneHijos: useVisaStore((state: VisaStoreState) => state.tieneHijos) || "",
      nacionalidad: useVisaStore((state: VisaStoreState) => state.nacionalidad) || "",
      numeroPasaporte: useVisaStore((state: VisaStoreState) => state.numeroPasaporte) || "",
      fechaNacimiento: useVisaStore((state: VisaStoreState) => state.fechaNacimiento) || "",
      paisNacimiento: useVisaStore((state: VisaStoreState) => state.paisNacimiento) || "",
      nivelEducativo: useVisaStore((state: VisaStoreState) => state.nivelEducativo) || "",
      tituloDiploma: useVisaStore((state: VisaStoreState) => state.tituloDiploma) || "",
      areaConocimiento: useVisaStore((state: VisaStoreState) => state.areaConocimiento) || "",
      subareaConocimiento: useVisaStore((state: VisaStoreState) => state.subareaConocimiento) || "",
      paisDomicilio: useVisaStore((state: VisaStoreState) => state.paisDomicilio) || "",
      ciudadDomicilio: useVisaStore((state: VisaStoreState) => state.ciudadDomicilio) || "",
      direccionDomicilio: useVisaStore((state: VisaStoreState) => state.direccionDomicilio) || "",
      telefonoDomicilio: useVisaStore((state: VisaStoreState) => state.telefonoDomicilio) || "",
      paisColombia: useVisaStore((state: VisaStoreState) => state.paisColombia) || "COLOMBIA",
      departamentoColombia: useVisaStore((state: VisaStoreState) => state.departamentoColombia) || "",
      ciudadColombia: useVisaStore((state: VisaStoreState) => state.ciudadColombia) || "",
      direccionColombia: useVisaStore((state: VisaStoreState) => state.direccionColombia) || "",
      telefonoColombia: useVisaStore((state: VisaStoreState) => state.telefonoColombia) || "",
      telefonoOficina: useVisaStore((state: VisaStoreState) => state.telefonoOficina) || "",
      gastosCubiertos: useVisaStore((state: VisaStoreState) => state.gastosCubiertos) || "",
      especificarGastos: useVisaStore((state: VisaStoreState) => state.especificarGastos) || "",
      tieneRedesSociales: useVisaStore((state: VisaStoreState) => state.tieneRedesSociales) || "",
      facebookUsuario: useVisaStore((state: VisaStoreState) => state.facebookUsuario) || "",
      instagramUsuario: useVisaStore((state: VisaStoreState) => state.instagramUsuario) || "",
      xUsuario: useVisaStore((state: VisaStoreState) => state.xUsuario) || "",
      otroRedSocial: useVisaStore((state: VisaStoreState) => state.otroRedSocial) || "",
      correoElectronico: useVisaStore((state: VisaStoreState) => state.correoElectronico) || "",
      confirmacionCorreo: useVisaStore((state: VisaStoreState) => state.confirmacionCorreo) || ""
    }
  });

  const setPrimerNombre = useVisaStore((state) => state.setPrimerNombre);
  const setSegundoNombre = useVisaStore((state) => state.setSegundoNombre);
  const setPrimerApellido = useVisaStore((state) => state.setPrimerApellido);
  const setSegundoApellido = useVisaStore((state) => state.setSegundoApellido);
  const setSexo = useVisaStore((state) => state.setSexo);
  const setEstadoCivil = useVisaStore((state) => state.setEstadoCivil);
  const setTieneOtraNacionalidad = useVisaStore((state) => state.setTieneOtraNacionalidad);
  const setTieneHijos = useVisaStore((state) => state.setTieneHijos);
  const setNacionalidad = useVisaStore((state) => state.setNacionalidad);
  const setNumeroPasaporte = useVisaStore((state) => state.setNumeroPasaporte);
  const setFechaNacimiento = useVisaStore((state) => state.setFechaNacimiento);
  const setPaisNacimiento = useVisaStore((state) => state.setPaisNacimiento);
  const setNivelEducativo = useVisaStore((state) => state.setNivelEducativo);
  const setTituloDiploma = useVisaStore((state) => state.setTituloDiploma);
  const setAreaConocimiento = useVisaStore((state) => state.setAreaConocimiento);
  const setSubareaConocimiento = useVisaStore((state) => state.setSubareaConocimiento);
  const setPaisDomicilio = useVisaStore((state) => state.setPaisDomicilio);
  const setCiudadDomicilio = useVisaStore((state) => state.setCiudadDomicilio);
  const setDireccionDomicilio = useVisaStore((state) => state.setDireccionDomicilio);
  const setTelefonoDomicilio = useVisaStore((state) => state.setTelefonoDomicilio);
  const setPaisColombia = useVisaStore((state) => state.setPaisColombia);
  const setDepartamentoColombia = useVisaStore((state) => state.setDepartamentoColombia);
  const setCiudadColombia = useVisaStore((state) => state.setCiudadColombia);
  const setDireccionColombia = useVisaStore((state) => state.setDireccionColombia);
  const setTelefonoColombia = useVisaStore((state) => state.setTelefonoColombia);
  const setTelefonoOficina = useVisaStore((state) => state.setTelefonoOficina);
  const setGastosCubiertos = useVisaStore((state) => state.setGastosCubiertos);
  const setEspecificarGastos = useVisaStore((state) => state.setEspecificarGastos);
  const setTieneRedesSociales = useVisaStore((state) => state.setTieneRedesSociales);
  const setFacebookUsuario = useVisaStore((state) => state.setFacebookUsuario);
  const setInstagramUsuario = useVisaStore((state) => state.setInstagramUsuario);
  const setXUsuario = useVisaStore((state) => state.setXUsuario);
  const setOtroRedSocial = useVisaStore((state) => state.setOtroRedSocial);
  const setCorreoElectronico = useVisaStore((state) => state.setCorreoElectronico);
  const setConfirmacionCorreo = useVisaStore((state) => state.setConfirmacionCorreo);

  // Observar cambios en los checkboxes para mostrar/ocultar secciones
  const watchTieneOtraNacionalidad = watch("tieneOtraNacionalidad");
  const watchTieneHijos = watch("tieneHijos");
  const watchTieneRedesSociales = watch("tieneRedesSociales");

  const handleAddChild = () => {
    if (childFormData.tipoDocumento && childFormData.numeroDocumento && 
        childFormData.nacionalidad && childFormData.primerNombre && 
        childFormData.primerApellido) {
      const newChild: ChildData = {
        ...childFormData,
        id: Date.now().toString()
      };
      setChildren([...children, newChild]);
      setChildFormData({
        tipoDocumento: "",
        numeroDocumento: "",
        nacionalidad: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: ""
      });
    }
  };

  const handleRemoveChild = (id: string) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const onSubmit = (data: any) => {
    console.log('VisaPersonalDataForm - Datos recibidos:', data);
    console.log('VisaPersonalDataForm - Nacionalidad en datos:', data.nacionalidad);
    
    setPrimerNombre(data.primerNombre);
    setSegundoNombre(data.segundoNombre);
    setPrimerApellido(data.primerApellido);
    setSegundoApellido(data.segundoApellido);
    setSexo(data.sexo);
    setEstadoCivil(data.estadoCivil);
    setTieneOtraNacionalidad(data.tieneOtraNacionalidad);
    setTieneHijos(data.tieneHijos);
    setNacionalidad(data.nacionalidad);
    setNumeroPasaporte(data.numeroPasaporte);
    setFechaNacimiento(data.fechaNacimiento);
    setPaisNacimiento(data.paisNacimiento);
    setNivelEducativo(data.nivelEducativo);
    setTituloDiploma(data.tituloDiploma);
    setAreaConocimiento(data.areaConocimiento);
    setSubareaConocimiento(data.subareaConocimiento);
    setPaisDomicilio(data.paisDomicilio);
    setCiudadDomicilio(data.ciudadDomicilio);
    setDireccionDomicilio(data.direccionDomicilio);
    setTelefonoDomicilio(data.telefonoDomicilio);
    setPaisColombia(data.paisColombia);
    setDepartamentoColombia(data.departamentoColombia);
    setCiudadColombia(data.ciudadColombia);
    setDireccionColombia(data.direccionColombia);
    setTelefonoColombia(data.telefonoColombia);
    setTelefonoOficina(data.telefonoOficina);
    setGastosCubiertos(data.gastosCubiertos);
    setEspecificarGastos(data.especificarGastos);
    setTieneRedesSociales(data.tieneRedesSociales);
    setFacebookUsuario(data.facebookUsuario);
    setInstagramUsuario(data.instagramUsuario);
    setXUsuario(data.xUsuario);
    setOtroRedSocial(data.otroRedSocial);
    setCorreoElectronico(data.correoElectronico);
    setConfirmacionCorreo(data.confirmacionCorreo);
    
    // Verificar el estado del store después de guardar
    console.log('VisaPersonalDataForm - Nacionalidad guardada en store');
    const storeState = useVisaStore.getState();
    console.log('VisaPersonalDataForm - Estado del store después de guardar:', storeState);
    console.log('VisaPersonalDataForm - Nacionalidad en store:', storeState.nacionalidad);
    
    onNext({ ...data, children });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="visa-personal-data-form"
        aria-label="visa-personal-data-form"
        className="w-full"
      >

        {/* Datos Personales */}
        <h3 className="mb-4 text-md font-bold">Datos Personales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Primer Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
            <Controller
              name="primerNombre"
              control={control}
              rules={{ required: "El primer nombre es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Segundo Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
            <Controller
              name="segundoNombre"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Primer Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
            <Controller
              name="primerApellido"
              control={control}
              rules={{ required: "El primer apellido es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Segundo Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
            <Controller
              name="segundoApellido"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium mb-1">Sexo <span className="text-red-500">*</span></label>
            <Controller
              name="sexo"
              control={control}
              rules={{ required: "El sexo es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No binario">No binario</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Estado Civil */}
          <div>
            <label className="block text-sm font-medium mb-1">Estado Civil <span className="text-red-500">*</span></label>
            <Controller
              name="estadoCivil"
              control={control}
              rules={{ required: "El estado civil es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado (a)">Divorciado (a)</option>
                    <option value="Separado de matrimonio">Separado de matrimonio</option>
                    <option value="Separado de unión libre">Separado de unión libre</option>
                    <option value="Soltero(a)">Soltero(a)</option>
                    <option value="Unión libre">Unión libre</option>
                    <option value="Viudo (a)">Viudo (a)</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Sección condicional para Casado */}
        {watch("estadoCivil") === "Casado" && (
          <div className="mt-8 rounded-lg">
            <h3 className="mb-4 text-md font-semibold text-gray-800">Esposa(o)/Compañera(o) Permanente</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tipo Documento */}
          <div>
                <label className="block text-sm font-medium mb-1">Tipo Documento <span className="text-red-500">*</span></label>
                <select className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PASSPORT">Pasaporte</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="NIT">NIT</option>
                </select>
              </div>

              {/* Número de Documento */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
                      <input
                  type="text" 
                  className="input w-full"
                  placeholder=""
                />
              </div>

              {/* Nacionalidad */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <select className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="VENEZOLANA">Venezolana</option>
                  <option value="ECUATORIANA">Ecuatoriana</option>
                  <option value="PERUANA">Peruana</option>
                  <option value="BRASILEÑA">Brasileña</option>
                  <option value="ARGENTINA">Argentina</option>
                  <option value="CHILENA">Chilena</option>
                  <option value="MEXICANA">Mexicana</option>
                  <option value="ESTADOUNIDENSE">Estadounidense</option>
                  <option value="ESPAÑOLA">Española</option>
                  <option value="FRANCESA">Francesa</option>
                  <option value="ALEMANA">Alemana</option>
                  <option value="ITALIANA">Italiana</option>
                  <option value="BRITANICA">Británica</option>
                </select>
              </div>

              {/* Primer Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
                      <input
                  type="text" 
                  className="input w-full"
                  placeholder=""
                />
                  </div>

              {/* Segundo Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
                <input 
                  type="text" 
                  className="input w-full"
                  placeholder=""
            />
          </div>

              {/* Primer Apellido */}
          <div>
                <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="input w-full"
                  placeholder=""
                />
              </div>

              {/* Segundo Apellido */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
                <input 
                  type="text" 
                  className="input w-full"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        )}

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-6">
          {/* ¿Tiene Otra Nacionalidad? */}
          <div>
            <label className="block text-sm font-medium mb-1">¿Tiene Otra Nacionalidad? <span className="text-red-500">*</span></label>
            <Controller
              name="tieneOtraNacionalidad"
              control={control}
              rules={{ required: "Debe seleccionar si tiene otra nacionalidad" }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="Si"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">Si</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="No"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Sección Otras Nacionalidades - Solo se muestra si selecciona "Si" */}
        {watchTieneOtraNacionalidad === "Si" && (
          <>
            <h3 className="mb-4 text-md font-bold">Otras Nacionalidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Nacionalidad */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <Controller
                  name="nacionalidad"
                  control={control}
                  rules={{ required: watchTieneOtraNacionalidad === "Si" ? "La nacionalidad es obligatoria" : false }}
                  render={({ field, fieldState }) => (
                    <>
                      <select {...field} className="input w-full">
                        <option value="">Seleccionar</option>
                        <option value="Colombiana">Colombiana</option>
                        <option value="Venezolana">Venezolana</option>
                        <option value="Ecuatoriana">Ecuatoriana</option>
                        <option value="Peruana">Peruana</option>
                        <option value="Brasileña">Brasileña</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chilena">Chilena</option>
                        <option value="Mexicana">Mexicana</option>
                        <option value="Estadounidense">Estadounidense</option>
                        <option value="Española">Española</option>
                        <option value="Francesa">Francesa</option>
                        <option value="Alemana">Alemana</option>
                        <option value="Italiana">Italiana</option>
                        <option value="Británica">Británica</option>
                      </select>
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* Número de pasaporte */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de pasaporte</label>
                <Controller
                  name="numeroPasaporte"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>
            </div>
          </>
        )}

        {/* ¿Tiene Hijos? */}
        <div>
            <label className="block text-sm font-medium mb-1">¿Tiene Hijos? <span className="text-red-500">*</span></label>
            <Controller
              name="tieneHijos"
              control={control}
              rules={{ required: "Debe seleccionar si tiene hijos" }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="Si"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">Si</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="No"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        {/* Sección Otros Menores - Solo se muestra si selecciona "Si" en tiene hijos */}
        {watchTieneHijos === "Si" && (
          <>
            <h3 className="mb-4 text-md font-bold">Otros menores</h3>
            
            {/* Formulario para agregar hijo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Tipo de Documento */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Documento <span className="text-red-500">*</span></label>
                <select 
                  value={childFormData.tipoDocumento}
                  onChange={(e) => setChildFormData({...childFormData, tipoDocumento: e.target.value})}
                  className="input w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="Cédula de ciudadania">Cédula de ciudadania</option>
                  <option value="Cédula de extranjería colombiana">Cédula de extranjería colombiana</option>
                  <option value="Cedula extranjeria">Cedula extranjeria</option>
                  <option value="Documento extranjero">Documento extranjero</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Permiso especial permanencia">Permiso especial permanencia</option>
                  <option value="Registro civil">Registro civil</option>
                  <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                </select>
              </div>

              {/* Número de Documento */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={childFormData.numeroDocumento}
                  onChange={(e) => setChildFormData({...childFormData, numeroDocumento: e.target.value})}
                  className="input w-full"
                />
              </div>

              {/* Nacionalidad */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <select 
                  value={childFormData.nacionalidad}
                  onChange={(e) => setChildFormData({...childFormData, nacionalidad: e.target.value})}
                  className="input w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="Venezolana">Venezolana</option>
                  <option value="Ecuatoriana">Ecuatoriana</option>
                  <option value="Peruana">Peruana</option>
                  <option value="Brasileña">Brasileña</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chilena">Chilena</option>
                  <option value="Mexicana">Mexicana</option>
                  <option value="Estadounidense">Estadounidense</option>
                  <option value="Española">Española</option>
                  <option value="Francesa">Francesa</option>
                  <option value="Alemana">Alemana</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Británica">Británica</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Primer Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={childFormData.primerNombre}
                  onChange={(e) => setChildFormData({...childFormData, primerNombre: e.target.value})}
                  className="input w-full"
                />
              </div>

              {/* Segundo Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
                <input 
                  type="text" 
                  value={childFormData.segundoNombre}
                  onChange={(e) => setChildFormData({...childFormData, segundoNombre: e.target.value})}
                  className="input w-full"
                />
              </div>

              {/* Primer Apellido */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={childFormData.primerApellido}
                  onChange={(e) => setChildFormData({...childFormData, primerApellido: e.target.value})}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Segundo Apellido */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
                <input 
                  type="text" 
                  value={childFormData.segundoApellido}
                  onChange={(e) => setChildFormData({...childFormData, segundoApellido: e.target.value})}
                  className="input w-full"
                />
              </div>
            </div>

            {/* Botón Adicionar Hijo */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleAddChild}
                className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
              >
                Adicionar Hijo
              </button>
            </div>

            {/* Tabla de hijos */}
            <div className="mb-6">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Identificación</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Nombres y Apellidos</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {children.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-4 text-center text-sm text-gray-500">
                        No hay hijos agregados.
                      </td>
                    </tr>
                  ) : (
                    children.map((child) => (
                      <tr key={child.id} className="border-b border-gray-100">
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {child.tipoDocumento} - {child.numeroDocumento}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {child.primerNombre} {child.segundoNombre} {child.primerApellido} {child.segundoApellido}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveChild(child.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        <hr className="border-gray-200 mb-8" />

        {/* Datos de Nacimiento */}
        <h3 className="mb-4 text-md font-bold">Datos de Nacimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Nacimiento <span className="text-red-500">*</span></label>
            <Controller
              name="fechaNacimiento"
              control={control}
              rules={{ required: "La fecha de nacimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="date" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="paisNacimiento"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Peru">Perú</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Mexico">México</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="España">España</option>
                    <option value="Francia">Francia</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Italia">Italia</option>
                    <option value="Reino Unido">Reino Unido</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Formación Académica */}
        <h3 className="mb-4 text-md font-bold">Formación Académica</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Nivel educativo más alto */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">¿Cuál es el nivel educativo más alto alcanzado? <span className="text-red-500">*</span></label>
            <Controller
              name="nivelEducativo"
              control={control}
              rules={{ required: "El nivel educativo es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Básica primaria (1°-5°)">Básica primaria (1°-5°)</option>
                    <option value="Básica secundaria (6°-9°)">Básica secundaria (6°-9°)</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Formación para el trabajo y el desarrollo humano">Formación para el trabajo y el desarrollo humano</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Media académica o clásico (bachiller clásico)">Media académica o clásico (bachiller clásico)</option>
                    <option value="Media técnica (bachiller técnico)">Media técnica (bachiller técnico)</option>
                    <option value="Ninguna">Ninguna</option>
                    <option value="Normalista">Normalista</option>
                    <option value="Prescolar">Prescolar</option>
                    <option value="Técnica profesional">Técnica profesional</option>
                    <option value="Tecnológica">Tecnológica</option>
                    <option value="Universitario">Universitario</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Título o diploma */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">¿Cuál es el título o diploma de mayor nivel educativo que ha recibido? <span className="text-red-500">*</span></label>
            <Controller
              name="tituloDiploma"
              control={control}
              rules={{ required: "El título o diploma es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Media académica (bachiller clásico)">Media académica (bachiller clásico)</option>
                    <option value="Media técnica (bachiller técnico)">Media técnica (bachiller técnico)</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Normalista">Normalista</option>
                    <option value="Técnico profesional">Técnico profesional</option>
                    <option value="Tecnológica">Tecnológica</option>
                    <option value="Universitario">Universitario</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Área de Conocimiento */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Área de Conocimiento <span className="text-red-500">*</span></label>
            <Controller
              name="areaConocimiento"
              control={control}
              rules={{ required: "El área de conocimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Administración de empresas y derecho">Administración de empresas y derecho</option>
                    <option value="Agropecuario, silvicultura, pesca y veterinaria">Agropecuario, silvicultura, pesca y veterinaria</option>
                    <option value="Artes y humanidades">Artes y humanidades</option>
                    <option value="Ciencias naturales, matemáticas y estadística">Ciencias naturales, matemáticas y estadística</option>
                    <option value="Ciencias sociales, periodismo e información">Ciencias sociales, periodismo e información</option>
                    <option value="Educación">Educación</option>
                    <option value="Ingeniería, industria y construcción">Ingeniería, industria y construcción</option>
                    <option value="Programas y certificaciones genéricos">Programas y certificaciones genéricos</option>
                    <option value="Salud y bienestar">Salud y bienestar</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Tecnologías de la información y la comunicación (TIC)">Tecnologías de la información y la comunicación (TIC)</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Subárea de Conocimiento */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Subárea de Conocimiento <span className="text-red-500">*</span></label>
            <Controller
              name="subareaConocimiento"
              control={control}
              rules={{ required: "La subárea de conocimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Artes dramáticas y representativas">Artes dramáticas y representativas</option>
                    <option value="Artes plásticos, visuales y afines">Artes plásticos, visuales y afines</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Música">Música</option>
                    <option value="Otro programa de bellas artes">Otro programa de bellas artes</option>
                    <option value="Publicidad y afines">Publicidad y afines</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Ocupación e Ingresos */}
        <div className="mb-8">
          <h3 className="mb-4 text-md font-bold">Ocupación e Ingresos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ocupación */}
            <div>
              <label className="block text-sm font-medium mb-1">¿Durante el mes pasado a que se dedicó principalmente? <span className="text-red-500">*</span></label>
              <select className="input w-full">
                <option value="">Seleccione Ocupación</option>
                <option value="Buscando trabajo">Buscando trabajo</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Incapacidad permantente para trabajar">Incapacidad permantente para trabajar</option>
                <option value="No aplica">No aplica</option>
                <option value="Oficios del hogar">Oficios del hogar</option>
                <option value="Otra actividad">Otra actividad</option>
                <option value="Trabajó en una actividad que le generó algún ingreso">Trabajó en una actividad que le generó algún ingreso</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            {/* Profesión */}
            <div>
              <label className="block text-sm font-medium mb-1">¿Con qué profesión se relaciona su trabajo? <span className="text-red-500">*</span></label>
              <select className="input w-full">
                <option value="">Seleccione Profesión</option>
                <option value="Agricultores y trabajadores calificados agropecuarios, forestales y pesqueros">Agricultores y trabajadores calificados agropecuarios, forestales y pesqueros</option>
                <option value="Directores y gerentes">Directores y gerentes</option>
                <option value="No aplica">No aplica</option>
                <option value="Ocupaciones elementales">Ocupaciones elementales</option>
                <option value="Oficiales, operarios, artesanos y oficios relacionados">Oficiales, operarios, artesanos y oficios relacionados</option>
                <option value="Operadores de instalaciones y máquinas y ensambladores">Operadores de instalaciones y máquinas y ensambladores</option>
                <option value="Personal de apoyo administrativo">Personal de apoyo administrativo</option>
                <option value="Profesionales, científicos e intelectuales">Profesionales, científicos e intelectuales</option>
                <option value="Técnicos y profesionales del nivel medio">Técnicos y profesionales del nivel medio</option>
                <option value="Trabajadores de los servicios y vendedores y comerciales y mercados">Trabajadores de los servicios y vendedores y comerciales y mercados</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            {/* Ingreso Mensual */}
            <div>
              <label className="block text-sm font-medium mb-1">¿Cuál fue el ingreso mensual que usted recibió o percibe en pesos colombianos por las actividades desarrolladas actualmente en Colombia? <span className="text-red-500">*</span></label>
              <select className="input w-full">
                <option value="">Seleccione Rango de Ingresos</option>
                <option value="0-435375">$0-$435.375</option>
                <option value="435375-874999">$435.375-$874.999</option>
                <option value="875000-1423499">$875.000-$1.423.499</option>
                <option value="1423500-1623500">$1.423.500-$1.623.500</option>
                <option value="1623501-2000000">$1.623.501-$2.000.000</option>
                <option value="2000001-2847000">$2.000.001-$2.847.000</option>
                <option value="mas-de-2845000">Más de- $2.84.500</option>
                <option value="no-aplica">No aplica</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Datos de domicilio en el país de nacionalidad */}
        <h3 className="mb-4 text-md font-bold">Datos de domicilio en el país de nacionalidad o de establecimiento actual</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* País */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="paisDomicilio"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Peru">Perú</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Mexico">México</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="España">España</option>
                    <option value="Francia">Francia</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Italia">Italia</option>
                    <option value="Reino Unido">Reino Unido</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Ciudad / Municipio */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Ciudad / Municipio <span className="text-red-500">*</span></label>
            <Controller
              name="ciudadDomicilio"
              control={control}
              rules={{ required: "La ciudad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className="input w-full"
                    placeholder="Ingrese su ciudad o municipio"
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

         

          {/* Dirección */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Dirección <span className="text-red-500">*</span></label>
            <Controller
              name="direccionDomicilio"
              control={control}
              rules={{ required: "La dirección es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" placeholder="Ingrese su dirección completa" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <Controller
              name="telefonoDomicilio"
              control={control}
              render={({ field }) => (
                <input {...field} type="tel" className="input w-full" placeholder="Ingrese su número de teléfono" />
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Dirección prevista en Colombia */}
        <h3 className="mb-4 text-md font-bold">Dirección prevista en Colombia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Departamento */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Departamento <span className="text-red-500">*</span></label>
            <Controller
              name="departamentoColombia"
              control={control}
              rules={{ required: "El departamento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Amazonas">Amazonas</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Bolívar">Bolívar</option>
                    <option value="Boyacá">Boyacá</option>
                    <option value="Caldas">Caldas</option>
                    <option value="Caquetá">Caquetá</option>
                    <option value="Casanare">Casanare</option>
                    <option value="Cauca">Cauca</option>
                    <option value="Cesar">Cesar</option>
                    <option value="Chocó">Chocó</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Guainía">Guainía</option>
                    <option value="Guaviare">Guaviare</option>
                    <option value="Huila">Huila</option>
                    <option value="La Guajira">La Guajira</option>
                    <option value="Magdalena">Magdalena</option>
                    <option value="Meta">Meta</option>
                    <option value="Nariño">Nariño</option>
                    <option value="Norte de Santander">Norte de Santander</option>
                    <option value="Putumayo">Putumayo</option>
                    <option value="Quindío">Quindío</option>
                    <option value="Risaralda">Risaralda</option>
                    <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                    <option value="Santander">Santander</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Tolima">Tolima</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Vaupés">Vaupés</option>
                    <option value="Vichada">Vichada</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Ciudad / Municipio */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Ciudad / Municipio <span className="text-red-500">*</span></label>
            <Controller
              name="ciudadColombia"
              control={control}
              rules={{ required: "La ciudad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Bogota">Bogotá</option>
                    <option value="Medellin">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Pereira">Pereira</option>
                    <option value="Manizales">Manizales</option>
                    <option value="Ibague">Ibagué</option>
                    <option value="Villavicencio">Villavicencio</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Dirección */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Dirección (especifique el tipo y datos de hospedaje o alojamiento en Colombia) <span className="text-red-500">*</span></label>
            <Controller
              name="direccionColombia"
              control={control}
              rules={{ required: "La dirección es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Hostal">Hostal</option>
                    <option value="Residencia">Residencia</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Teléfono en Colombia */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Teléfono en Colombia <span className="text-red-500">*</span></label>
            <Controller
              name="telefonoColombia"
              control={control}
              rules={{ required: "El teléfono en Colombia es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="tel" className="input w-full" placeholder="Ingrese su número de teléfono en Colombia" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Teléfono Oficina */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Teléfono Oficina</label>
            <Controller
              name="telefonoOficina"
              control={control}
              render={({ field }) => (
                <input {...field} type="tel" className="input w-full" placeholder="Ingrese su número de teléfono de oficina" />
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Gastos */}
        <h3 className="mb-4 text-md font-bold">Gastos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Gastos cubiertos */}
          <div>
            <label className="block text-sm font-medium mb-1">Los gastos de viaje y subsistencia durante su viaje y permanencia en Colombia estancia están cubiertos <span className="text-red-500">*</span></label>
            <Controller
              name="gastosCubiertos"
              control={control}
              rules={{ required: "Debe especificar si los gastos están cubiertos" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Por el propio solicitante">Por el propio solicitante</option>
                    <option value="Por un patrocinador (familiar, anfitrión, empresa u organización)">Por un patrocinador (familiar, anfitrión, empresa u organización)</option>
                    <option value="Otra (especificar)">Otra (especificar)</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Especificar */}
          {watch("gastosCubiertos") === "Otra (especificar)" && (
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">Especifique <span className="text-red-500">*</span></label>
            <Controller
              name="especificarGastos"
              control={control}
              rules={{ required: "Debe especificar los gastos" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" placeholder="Especifique cómo están cubiertos los gastos" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
          )}
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Redes Sociales */}
        <h3 className="mb-4 text-md font-bold">Redes Sociales</h3>
        <div className="mb-4">
          {/* ¿Tiene Redes Sociales? */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">¿Tiene Redes Sociales? <span className="text-red-500">*</span></label>
            <Controller
              name="tieneRedesSociales"
              control={control}
              rules={{ required: "Debe seleccionar si tiene redes sociales" }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="Si"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">Si</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...field}
                        type="radio"
                        value="No"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Campos de redes sociales - Solo se muestran si selecciona "Si" */}
          {watchTieneRedesSociales === "Si" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium mb-1">Facebook, usuario <span className="text-red-500">*</span></label>
                  <Controller
                    name="facebookUsuario"
                    control={control}
                    rules={{ required: watchTieneRedesSociales === "Si" ? "El usuario de Facebook es obligatorio" : false }}
                    render={({ field, fieldState }) => (
                      <>
                        <input {...field} type="text" className="input w-full" placeholder="Ingrese su usuario de Facebook" />
                        {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram, usuario <span className="text-red-500">*</span></label>
                  <Controller
                    name="instagramUsuario"
                    control={control}
                    rules={{ required: watchTieneRedesSociales === "Si" ? "El usuario de Instagram es obligatorio" : false }}
                    render={({ field, fieldState }) => (
                      <>
                        <input {...field} type="text" className="input w-full" placeholder="Ingrese su usuario de Instagram" />
                        {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>

                {/* X (Twitter) */}
                <div>
                  <label className="block text-sm font-medium mb-1">X, usuario <span className="text-red-500">*</span></label>
                  <Controller
                    name="xUsuario"
                    control={control}
                    rules={{ required: watchTieneRedesSociales === "Si" ? "El usuario de X es obligatorio" : false }}
                    render={({ field, fieldState }) => (
                      <>
                        <input {...field} type="text" className="input w-full" placeholder="Ingrese su usuario de X" />
                        {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Otro red social */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Otro, especificar cuál, usuario <span className="text-red-500">*</span></label>
                  <Controller
                    name="otroRedSocial"
                    control={control}
                    rules={{ required: watchTieneRedesSociales === "Si" ? "Debe especificar otra red social" : false }}
                    render={({ field, fieldState }) => (
                      <>
                        <input {...field} type="text" className="input w-full" placeholder="Especifique red social y usuario" />
                        {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notificaciones por Email */}
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">⚠️</div>
              <div className="text-sm text-blue-800">
                <strong>Indique al correo electrónico en cual desea recibir notificaciones sobre el estado de su trámite.</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Correo Electrónico */}
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
              <Controller
                name="correoElectronico"
                control={control}
                rules={{ 
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingrese un correo electrónico válido"
                  }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="email" className="input w-full" placeholder="ejemplo@correo.com" />
                    {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                  </>
                )}
              />
            </div>

            {/* Confirmación Correo Electrónico */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirmación Correo Electrónico <span className="text-red-500">*</span></label>
              <Controller
                name="confirmacionCorreo"
                control={control}
                rules={{ 
                  required: "La confirmación del correo electrónico es obligatoria",
                  validate: (value) => {
                    const email = watch("correoElectronico");
                    return value === email || "Los correos electrónicos no coinciden";
                  }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="email" className="input w-full" placeholder="Confirme su correo electrónico" />
                    {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
        </div>

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