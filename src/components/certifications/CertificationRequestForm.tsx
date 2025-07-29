import { useForm, Controller } from "react-hook-form";

type CertificationRequestFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const CertificationRequestForm = ({ onNext, onBack }: CertificationRequestFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      modalidad: "",
      idioma: "",
      entidadDestino: "FONDO DE PENSIÓN",
      funcionario: "PEDRO PÉREZ",
      oficina: "CONSULADO GENERAL BOG"
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="certification-request-form"
        aria-label="certification-request-form"
        className="w-full"
      >
        <h2 className="mb-4 text-md font-normal">Datos de la certificación solicitada</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Modalidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Modalidad</label>
            <Controller
              name="modalidad"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccionar</option>
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                  <option value="mixta">Mixta</option>
                </select>
              )}
            />
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-sm font-medium mb-1">Idioma <span className="text-red-500">*</span></label>
            <Controller
              name="idioma"
              control={control}
              rules={{ required: "El idioma es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="español">Español</option>
                    <option value="ingles">Inglés</option>
                    <option value="frances">Francés</option>
                    <option value="aleman">Alemán</option>
                    <option value="italiano">Italiano</option>
                    <option value="portugues">Portugués</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Entidad destino */}
          <div>
            <label className="block text-sm font-medium mb-1">Entidad destino</label>
            <Controller
              name="entidadDestino"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="FONDO DE PENSIÓN">FONDO DE PENSIÓN</option>
                  <option value="BANCO">BANCO</option>
                  <option value="EMPRESA">EMPRESA</option>
                  <option value="UNIVERSIDAD">UNIVERSIDAD</option>
                  <option value="GOBIERNO">GOBIERNO</option>
                </select>
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <h2 className="mb-4 text-md font-normal">Autorizador trámite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Funcionario */}
          <div>
            <label className="block text-sm font-medium mb-1">Funcionario <span className="text-red-500">*</span></label>
            <Controller
              name="funcionario"
              control={control}
              rules={{ required: "El funcionario es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Oficina */}
          <div>
            <label className="block text-sm font-medium mb-1">Oficina <span className="text-red-500">*</span></label>
            <Controller
              name="oficina"
              control={control}
              rules={{ required: "La oficina es obligatoria" }}
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