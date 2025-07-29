import { useForm, Controller } from "react-hook-form";

type VisaApplicantFormProps = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export const VisaApplicantForm = ({ onNext, onBack }: VisaApplicantFormProps) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="visa-applicant-form"
        aria-label="visa-applicant-form"
        className="w-full"
      >
        <h2 className="mb-4 text-lg font-semibold">Datos del Solicitante</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Tipo de documento */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de documento <span className="text-red-500">*</span></label>
            <Controller
              name="tipoDocumento"
              control={control}
              rules={{ required: "El tipo de documento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="RC">Registro Civil</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PP">Pasaporte</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Número de documento */}
          <div>
            <label className="block text-sm font-medium mb-1">Número de documento <span className="text-red-500">*</span></label>
            <Controller
              name="numeroDocumento"
              control={control}
              rules={{ required: "El número de documento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Nacionalidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
            <Controller
              name="nacionalidad"
              control={control}
              rules={{ required: "La nacionalidad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Lugar de expedición */}
          <div>
            <label className="block text-sm font-medium mb-1">Lugar de expedición <span className="text-red-500">*</span></label>
            <Controller
              name="lugarExpedicion"
              control={control}
              rules={{ required: "El lugar de expedición es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
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