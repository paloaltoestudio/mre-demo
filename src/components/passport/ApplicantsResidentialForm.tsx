import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../common/reactSelectStyles";

type ApplicantsResidentialFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const ApplicantsResidentialForm = ({ onNext, onBack }: ApplicantsResidentialFormProps) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  console.log(errors, watch());
  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="applicants-residential-form"
        aria-label="applicants-residential-form"
        className="w-full"
      >
        <h2 className="mb-4 text-md font-normal mt-8">Datos de Residencia y Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Colombia", label: "Colombia" },
                      { value: "Venezuela", label: "Venezuela" },
                      { value: "Ecuador", label: "Ecuador" },
                      { value: "Peru", label: "Perú" },
                      { value: "Chile", label: "Chile" },
                    ]}
                    styles={customStyles}
                    placeholder="Seleccionar"
                    isClearable
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad <span className="text-red-500">*</span></label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "La ciudad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Bogota", label: "Bogotá" },
                      { value: "Medellin", label: "Medellín" },
                      { value: "Cali", label: "Cali" },
                      { value: "Barranquilla", label: "Barranquilla" },
                      { value: "Cartagena", label: "Cartagena" },
                    ]}
                    styles={customStyles}
                    placeholder="Seleccionar"
                    isClearable
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Dirección <span className="text-red-500">*</span></label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "La dirección es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Country code */}
          <div>
            <label className="block text-sm font-medium mb-1">Indicativo del país <span className="text-red-500">*</span></label>
            <Controller
              name="countryCode"
              control={control}
              rules={{ required: "El indicativo del país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="+57">+57 (Colombia)</option>
                    <option value="+58">+58 (Venezuela)</option>
                    <option value="+593">+593 (Ecuador)</option>
                    <option value="+51">+51 (Perú)</option>
                    <option value="+56">+56 (Chile)</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono <span className="text-red-500">*</span></label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "El teléfono es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="tel" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Postal code */}
          <div>
            <label className="block text-sm font-medium mb-1">Código Postal</label>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
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

export default ApplicantsResidentialForm; 