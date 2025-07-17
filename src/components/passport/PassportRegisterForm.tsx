import { useForm, Controller } from "react-hook-form";

type PassportRegisterFormProps = {
  onNext: () => void;
};

export const PassportRegisterForm = ({ onNext }: PassportRegisterFormProps) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data: any) => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section
        id="select-appointment-form"
        aria-label="select-appointment-form"
        className="w-full"
      >
        <h2 className="mb-4 text-lg font-semibold">Datos de Registro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
            <Controller
              name="primerNombre"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Requerido</span>}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
            <Controller
              name="segundoNombre"
              control={control}
              render={({ field }) => (
                <input {...field} className="input input-bordered w-full" />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
            <Controller
              name="primerApellido"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Requerido</span>}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Partícula</label>
            <Controller
              name="particula"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="de"
                      className="radio radio-primary"
                    />
                    <span>de</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="del"
                      className="radio radio-primary"
                    />
                    <span>del</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="la"
                      className="radio radio-primary"
                    />
                    <span>la</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="las"
                      className="radio radio-primary"
                    />
                    <span>las</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="los"
                      className="radio radio-primary"
                    />
                    <span>los</span>
                  </label>
                </div>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
            <Controller
              name="segundoApellido"
              control={control}
              render={({ field }) => (
                <input {...field} className="input input-bordered w-full" />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico <span className="text-red-500">*</span></label>
            <Controller
              name="correo"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <input type="email" {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Requerido</span>}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmación de correo electrónico <span className="text-red-500">*</span></label>
            <Controller
              name="confirmCorreo"
              control={control}
              rules={{ required: true, validate: value => value === watch("correo") }}
              render={({ field, fieldState }) => (
                <>
                  <input type="email" {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Debe coincidir</span>}
                </>
              )}
            />
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
            <label className="block text-sm font-medium mb-1">Número telefónico <span className="text-red-500">*</span></label>
            <Controller
              name="telefono"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <input type="tel" {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Requerido</span>}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">PIN <span className="text-red-500">*</span></label>
            <Controller
              name="pin"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <input type="password" {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Requerido</span>}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmación PIN <span className="text-red-500">*</span></label>
            <Controller
              name="confirmPin"
              control={control}
              rules={{ required: true, validate: value => value === watch("pin") }}
              render={({ field, fieldState }) => (
                <>
                  <input type="password" {...field} className="input input-bordered w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">Debe coincidir</span>}
                </>
              )}
            />
          </div>
        </div>


        <div className="flex justify-end gap-4 mt-8">
          <button type="button" className="border border-blue-600 text-blue-600 rounded-full px-6 py-2 hover:bg-blue-50">Regresar</button>
          <button type="submit" className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700">Siguiente</button>
        </div>
      </section>    
    </form>
  );
};

export default PassportRegisterForm; 