import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { documentTypes } from "../../mocks/authMocks/LoginMock";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: "none",
    padding: "0.15rem",
    minHeight: "2rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export const OfficialDataForm = () => {
  const { control } = useFormContext();
  return (
    <div
      id="official-data"
      className="flex flex-col items-center justify-center p-2 w-full md:w-11/12"
    >
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-2xl font-semibold text-slate-600 capitalize">{`Hola Pedro`}</h2>
        <p className="text-xl text-gray-800">
          Agrega los datos del ciudadano al que le realizarás el trámite
        </p>
      </div>

      <div className="mt-5 border border-gray-200 rounded-md w-full md:max-w-[800px] px-4 py-1 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"documentTypeOfficial"} className="">
              Tipo de documento
            </label>
            <Controller
              name="documentTypeOfficial"
              control={control}
              rules={{
                required: "El tipo de documento es obligatorio",
                validate: (value) => {
                  if (!value)
                    return "Por favor, selecciona un tipo de documento";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    id="documentTypeOfficial"
                    options={documentTypes}
                    styles={customStyles}
                    value={field.value || null}
                    onChange={(selected) => field.onChange(selected)}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    placeholder="Seleccione un tipo de documento"
                    formatOptionLabel={(option) => (
                      <span>{option.value}</span> // Muestra `value` en el menú desplegable
                    )}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"documentNumberOfficial"} className="">
              Número de documento
            </label>
            <Controller
              name="documentNumberOfficial"
              control={control}
              rules={{
                required: "El tipo de documento es obligatorio",
                validate: (value) => {
                  if (!value)
                    return "Por favor, selecciona un tipo de documento";
                  if (!/^\d+$/.test(value)) return "Solo se permiten números";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    type="text"
                    {...field}
                    id="documentNumberOfficial"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      field.onChange(numericValue);
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-2"
                    placeholder="Ingrese solo números"
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"firstNameOfficial"} className="">
              Primer nombre
            </label>
            <Controller
              name="firstNameOfficial"
              control={control}
              rules={{
                required: "El primer nombre es obligatorio",
                validate: (value) => {
                  if (!value) return "Por favor, indica el primer nombre";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    type="text"
                    id="firstNameOfficial"
                    {...field}
                    className="w-full border border-gray-300 rounded px-2 py-2"
                    placeholder=""
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"secondNameOfficial"} className="">
              Segundo nombre
            </label>
            <Controller
              name="secondNameOfficial"
              control={control}
              rules={{}}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    id="secondNameOfficial"
                    type="text"
                    {...field}
                    className="w-full border border-gray-300 rounded px-2 py-2"
                    placeholder=""
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"lastNameOfficial"} className="">
              Primer apellido
            </label>
            <Controller
              name="lastNameOfficial"
              control={control}
              rules={{
                required: "El primer apellido es obligatorio",
                validate: (value) => {
                  if (!value) return "Por favor, indica el primer apellido";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    id="lastNameOfficial"
                    type="text"
                    {...field}
                    className="w-full border border-gray-300 rounded px-2 py-2"
                    placeholder=""
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="relative w-full gap-1 flex flex-col">
            <label htmlFor={"secondLastNameOfficial"} className="">
              Segundo apellido
            </label>
            <Controller
              name="secondLastNameOfficial"
              control={control}
              rules={{
                required: "El segundo apellido es obligatorio",
                validate: (value) => {
                  if (!value) return "Por favor, indica el segundo apellido";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    id="secondLastNameOfficial"
                    type="text"
                    {...field}
                    className="w-full border border-gray-300 rounded px-2 py-2"
                    placeholder=""
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className="mb-5 w-full flex justify-end items-center px-10">
          <button
            type="submit"
            className="w-full sm:w-11/12 md:w-[200px]  text-white text-normal capitalize p-2 rounded-full bg-[#3669cb] hover:cursor-pointer hover:bg-[#364ccb] duration-150"
          >
            continuar
          </button>
        </div>
      </div>
    </div>
  );
};
