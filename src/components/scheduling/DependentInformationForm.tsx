import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { DependentInformationMock } from "../../mocks/dashboardMocks/DependentInformation";
import { documentTypes } from "../../mocks/authMocks/LoginMock";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: "none",
    padding: "0.25rem 0.5rem",
    minHeight: "3rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export const DependentInformationForm = () => {
  const { control } = useFormContext();

  return (
    <section
      id="select-dependent-form"
      aria-label="select-dependent-form"
      className="w-full"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Ingresa los datos de tus dependientes
      </h2>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg border border-gray-100 rounded-lg">
        <div className="w-full p-5">
          <h3 className="font-medium">Dependiente 1</h3>
          <div className="relative w-full mt-4">
            <label
              htmlFor="country"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
            >
              Parentesco
            </label>
            <Controller
              name="country"
              control={control}
              rules={{
                required: "El país es obligatorio",
                validate: (value) => {
                  if (!value) return "Por favor, selecciona un país.";
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    inputId="country"
                    options={DependentInformationMock}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    styles={{
                      ...customStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    formatOptionLabel={({ label }) => <span>{label}</span>}
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
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
          <div className="flex justify-between gap-5">
            <div className="relative w-full mt-4">
              <label
                htmlFor="country"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
              >
                Tipo de documento
              </label>

              <Controller
                name="document-type-dependent"
                control={control}
                rules={{
                  required: "El tipo de documento es obligatorio",
                  validate: (value) => {
                    if (!value)
                      return "Por favor, selecciona un tipo de documento.";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      inputId="document-type-dependent"
                      options={documentTypes}
                      styles={customStyles}
                      formatOptionLabel={({ label }) => <span>{label}</span>}
                      {...field}
                      onChange={(selected) => field.onChange(selected)}
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

            <div className="relative w-full mt-4">
              <label
                htmlFor="country"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
              >
                Número de documento
              </label>
              <Controller
                name="document-number-dependent"
                control={control}
                rules={{
                  required: "El número de documento es obligatorio",
                  validate: (value) => {
                    if (!value)
                      return "Por favor, indique un número de documento.";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <input
                      id="document-number-dependent"
                      type="number"
                      className="min-h-12 px-2 py-1 border focus:border-blue-500 border-gray-300 shadow-none w-full rounded"
                      {...field}
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
        </div>
        <div>
          <h3>Dependiente 2</h3>
        </div>
        <div>
          <h3>Dependiente 3</h3>
        </div>
      </div>
    </section>
  );
};
