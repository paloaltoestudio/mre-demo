import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

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
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      sexo: "",
      estadoCivil: "",
      tieneOtraNacionalidad: "",
      tieneHijos: "",
      nacionalidad: "",
      numeroPasaporte: "",
      // Datos de nacimiento
      fechaNacimiento: "",
      paisNacimiento: "",
      // Formación académica
      nivelEducativo: "",
      tituloDiploma: "",
      areaConocimiento: "",
      subareaConocimiento: "",
      // Datos de domicilio en país de nacionalidad
      paisDomicilio: "",
      ciudadDomicilio: "",
      direccionDomicilio: "",
      telefonoDomicilio: "",
      // Dirección prevista en Colombia
      paisColombia: "COLOMBIA",
      ciudadColombia: "",
      direccionColombia: "",
      telefonoColombia: "",
      telefonoOficina: "",
      // Gastos
      gastosCubiertos: "",
      especificarGastos: "",
      // Redes Sociales
      tieneRedesSociales: "",
      facebookUsuario: "",
      instagramUsuario: "",
      xUsuario: "",
      otroRedSocial: "",
      // Notificaciones
      correoElectronico: "",
      confirmacionCorreo: ""
    }
  });

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
    console.log(data);
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
        <h3 className="mb-4 text-md font-normal">Datos Personales</h3>
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
                    <option value="Prefiero no decir">Prefiero no decir</option>
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
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Viudo">Viudo</option>
                    <option value="Unión Libre">Unión Libre</option>
                    <option value="Separado">Separado</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        </div>

        {/* Sección Otras Nacionalidades - Solo se muestra si selecciona "Si" */}
        {watchTieneOtraNacionalidad === "Si" && (
          <>
            <h3 className="mb-4 text-md font-normal">Otras Nacionalidades</h3>
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

        {/* Sección Otros Menores - Solo se muestra si selecciona "Si" en tiene hijos */}
        {watchTieneHijos === "Si" && (
          <>
            <h3 className="mb-4 text-md font-normal">Otros menores</h3>
            
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
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="RC">Registro Civil</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PP">Pasaporte</option>
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
        <h3 className="mb-4 text-md font-normal">Datos de Nacimiento</h3>
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
                    <option value="Colombia">Colombia</option>
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
        <h3 className="mb-4 text-md font-normal">Formación Académica</h3>
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
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Pregrado">Pregrado</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Postdoctorado">Postdoctorado</option>
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
                    <option value="Bachiller">Bachiller</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Magíster">Magíster</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Postdoctor">Postdoctor</option>
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
                    <option value="Ciencias Naturales">Ciencias Naturales</option>
                    <option value="Ingeniería y Tecnología">Ingeniería y Tecnología</option>
                    <option value="Ciencias Médicas y de la Salud">Ciencias Médicas y de la Salud</option>
                    <option value="Ciencias Agrícolas">Ciencias Agrícolas</option>
                    <option value="Ciencias Sociales">Ciencias Sociales</option>
                    <option value="Humanidades">Humanidades</option>
                    <option value="Educación">Educación</option>
                    <option value="Arte y Arquitectura">Arte y Arquitectura</option>
                    <option value="Administración y Economía">Administración y Economía</option>
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
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biología">Biología</option>
                    <option value="Ingeniería Civil">Ingeniería Civil</option>
                    <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                    <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                    <option value="Medicina">Medicina</option>
                    <option value="Enfermería">Enfermería</option>
                    <option value="Psicología">Psicología</option>
                    <option value="Derecho">Derecho</option>
                    <option value="Administración de Empresas">Administración de Empresas</option>
                    <option value="Contaduría">Contaduría</option>
                    <option value="Economía">Economía</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Datos de domicilio en el país de nacionalidad */}
        <h3 className="mb-4 text-md font-normal">Datos de domicilio en el país de nacionalidad o de establecimiento actual</h3>
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
                    <option value="Colombia">Colombia</option>
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
        <h3 className="mb-4 text-md font-normal">Dirección prevista en Colombia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* País */}
          <div className="flex flex-col justify-between h-full">
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="paisColombia"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="COLOMBIA">COLOMBIA</option>
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
        <h3 className="mb-4 text-md font-normal">Gastos</h3>
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
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                    <option value="Parcialmente">Parcialmente</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Especificar */}
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
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Redes Sociales */}
        <h3 className="mb-4 text-md font-normal">Redes Sociales</h3>
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