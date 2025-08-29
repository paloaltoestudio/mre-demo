import { type Dispatch, type SetStateAction } from "react";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleExclamation,
  faPeopleGroup,
  faSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CancelBtn } from "./CancelBtn";
import { useQueryClient } from "@tanstack/react-query";
import type { CountriesInfoType } from "../../types/dashboard/countryInfo";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { toast } from "react-toastify";
import type { ProceduresResponseType } from "../../types/dashboard/proceduresTypes";
import { usePublicQuery } from "../../hooks/usePublicQuery";
import { ProcedureResponseSchema } from "../../schemas/appointments/proceduresInfo.schema";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";
import { useValidateAppointment } from "../../hooks/useValidateAppointment";
import { useEffect } from "react";
import { SessionStore } from "../../stores/sessionStore";

type AppointmentForFormProps = {
  consulate: ConsulatesType;
  setView?: (step: number) => void;
  selectedOption: string | undefined;
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: "none",
    padding: "0.25rem 0.5rem",
    minHeight: "3rem",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#e2e8f0",
    borderRadius: "9999px",
    padding: "2px 6px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

type ChipProps = {
  label: string;
  onRemove: () => void;
};

const Chip = ({ label, onRemove }: ChipProps) => (
  <div className="mt-2 inline-flex items-center px-3 py-1 mr-2 mb-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-full">
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="ml-2 text-white bg-gray-400 rounded-full hover:bg-gray-500 w-4 h-4 text-center flex items-center justify-center"
    >
      &times;
    </button>
  </div>
);

// Log Chip component to avoid unused variable warning
console.log("Chip component available:", Chip);

export const AppointmentForForm = ({
  consulate,
  setView,
  selectedOption,
  setSelectedOption,
}: AppointmentForFormProps) => {
  const queryClient = useQueryClient();
  const { control, setValue, watch } = useFormContext();
  const countryOptions: CountriesInfoType = queryClient.getQueryData([
    "countriesInfo",
  ])!;
  const { country } = SchedulingsStore();
  const procedureWatcher = watch("tramites");
  const { logTraceabilityEvent } = useTraceabilityLog();
  const { validateAppointment, isPending } = useValidateAppointment();

  const { data: procedures } = usePublicQuery<ProceduresResponseType>({
    key: ["procedures"],
    url: `/Procedure/by-office/${consulate.id}`,
    schema: ProcedureResponseSchema,
  });

  useEffect(() => {
    if (selectedOption === "Para mis dependientes" ||
        selectedOption === "Para mí y mis dependientes") {
      setValue("dependientesCount", 1);
    } else {
      setValue("dependientesCount", 0);
    }
  }, [selectedOption, setValue]);

  const handleContinue = async () => {
    if (procedureWatcher === undefined || !selectedOption) {
      toast.error("Completa el formulario", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className:
          "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
      return;
    }

    // Validación para dependientes
    const dependentsCount = watch("dependientesCount") || 0;
    if (
      (selectedOption === "Para mis dependientes" || 
       selectedOption === "Para mí y mis dependientes") && 
      dependentsCount === 0
    ) {
      toast.error("Debes seleccionar al menos un dependiente", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className:
          "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
      return;
    }

    // Validación de cita activa para el trámite
    try {
      const { activeUser } = SessionStore.getState();
      if (activeUser) {
        const validationResult = await validateAppointment(
          procedureWatcher.id,
          selectedOption === "Para mí" ? 1 : selectedOption === "Para mis dependientes" ? 2 : 3,
          activeUser.id
        );

        if (!validationResult.canContinue) {
          toast.error(validationResult.reason, {
            icon: (
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-500"
              />
            ),
            autoClose: 5000,
            draggable: true,
            progress: undefined,
            hideProgressBar: true,
            className:
              "border-l-5 border-red-500 bg-white text-black shadow-md",
          });
          return;
        }
      }
    } catch (error) {
      console.error("Error en validación de cita:", error);
      // Si hay error en la validación, continuamos para no bloquear al usuario
    }

    // Log cuando se continúa al siguiente paso
    logTraceabilityEvent({
      procedure: "agendamiento",
      procedureStatus: "continuar_seleccion_tipo",
      modifiedFields: {
        selectedOption,
        selectedProcedure: procedureWatcher,
        dependentsCount,
        officeId: consulate.id,
        officeName: consulate.name
      },
      observations: `Usuario continuó con tipo: ${selectedOption}, procedimiento: ${procedureWatcher?.name}, dependientes: ${dependentsCount}`
    });

    setView?.(3);
  };

  return (
    <section
      id="appointment-for-form"
      aria-label="appointment-for-form"
      className="w-full"
    >
      <div className="border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md w-full  px-4 py-3 justify-center flex flex-col shadow-lg">
        <h3 className="font-medium text-md flex items-center gap-1">
          {countryOptions?.data?.filter((c) => c.id === country)?.[0].name}
        </h3>
        <h3 className="font-medium text-md">{consulate.name}</h3>
        <p className="text-sm text-gray-600">Dirección: {consulate.address}</p>
      </div>

      <div className="mt-6 w-full">
        <h2 className="font-medium text-lg">
          Selecciona para quién es la cita
        </h2>
        <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center mt-4">
          <div
            onClick={() => {
              setSelectedOption("Para mí");
              setValue("dependientesCount", 0);
            }}
            className={`flex items-center gap-5 w-[330px] min-h-[80px] pl-6 p-2 rounded-full border-2 md:min-w-[30%] lg:max-h-[80px] hover:bg-gray-200 hover:cursor-pointer 
            ${
              selectedOption === "Para mí"
                ? "border-blue-500 bg-gray-200"
                : "border-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span>
              <h3 className="text-md font-medium">Para mí</h3> <p></p>
            </span>
          </div>
          <div
            onClick={() => {
              setSelectedOption("Para mis dependientes");
              setValue("dependientesCount", 1);
            }}
            className={`flex items-center gap-5 w-[330px] min-h-[80px] pl-6 p-2 rounded-full border-2 md:min-w-[30%] lg:max-h-[80px] hover:bg-gray-200 hover:cursor-pointer 
            ${
              selectedOption === "Para mis dependientes"
                ? "border-blue-500 bg-gray-200"
                : "border-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faSmile} size="2x" />
            <span>
              <h3 className="text-md font-medium">Para mis dependientes</h3>{" "}
              <p className="text-gray-500 text-sm">
                {"(Menores de edad, adultos mayores, otros)"}
              </p>
            </span>
          </div>
          <div
            onClick={() => {
              setSelectedOption("Para mí y mis dependientes");
              setValue("dependientesCount", 1);
            }}
            className={`flex items-center gap-5 w-[330px] min-h-[80px] pl-6 p-2 rounded-full border-2 md:min-w-[30%] lg:max-h-[80px] hover:bg-gray-200 hover:cursor-pointer 
            ${
              selectedOption === "Para mí y mis dependientes"
                ? "border-blue-500 bg-gray-200"
                : "border-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faPeopleGroup} size="2x" />
            <span>
              <h3 className="text-md font-medium">
                Para mí y mis dependientes
              </h3>{" "}
              <p className="text-gray-500 text-sm">
                {"(Incluye al solicitante y dependientes)"}
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h2 className="font-medium text-lg">Selecciona el trámite</h2>
        <div className="relative w-full mt-4">
          <label
            htmlFor="tramites"
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            Trámite <span className="text-red-500">*</span>
          </label>
          <Controller
            name="tramites"
            control={control}
            rules={{
              required: "El trámite es obligatorio",
              validate: (value) => {
                if (!value) return "Por favor, selecciona un trámite";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  id="tramites"
                  options={procedures?.data || []}
                  menuPortalTarget={document.body}
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  value={field.value}
                  onChange={(selected) => {
                    field.onChange(selected);
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => String(option.id)}
                  placeholder="Seleccione un trámite"
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

      {(selectedOption === "Para mis dependientes" ||
        selectedOption === "Para mí y mis dependientes") && (
        <div className="mt-6 w-full">
          <h2 className="font-medium text-lg">
            Número de dependientes
          </h2>
          <div className="relative w-full mt-4">
            <label
              htmlFor="dependientesCount"
              className="absolute left-8 -top-3.5 bg-gray-50 px-1 py-0.5 text-sm text-gray-600 z-10"
            >
              Cantidad <span className="text-red-500">*</span>
            </label>
            <Controller
              name="dependientesCount"
              control={control}
              rules={{
                required: "La cantidad es obligatoria",
                validate: (value) => {
                  if (!value || value < 1) return "Debe ser al menos 1";
                  if (value > 3) return "El máximo permitido es 3 dependientes";
                  return true;
                },
              }}
              render={({ field, fieldState }) => {
                // Log fieldState to avoid unused variable warning
                console.log("Field state:", fieldState);
                return (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() => {
                          const currentValue = field.value || 0;
                          if (currentValue > 0) {
                            field.onChange(currentValue - 1);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="text-gray-700 text-sm"
                        />
                      </span>

                      <input
                        {...field}
                        type="text"
                        disabled
                        value={field.value || 0}
                        className="max-w-[50px] text-center border border-gray-300 rounded px-2 py-2"
                      />

                      <span
                        onClick={() => {
                          const currentValue = field.value || 0;
                          if (currentValue < 3) {
                            field.onChange(currentValue + 1);
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                          (field.value || 0) >= 3 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-gray-700 text-sm"
                        />
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      )}
      <div className="w-full flex flex-row gap-5 items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={() => {
            setView?.(1);
          }}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={isPending}
          className={`border-2 font-medium py-2 px-4 rounded-full duration-150 ${
            isPending
              ? "bg-gray-400 border-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#3466cc] border-[#3466cc] text-white hover:cursor-pointer hover:bg-[#3467cce8]"
          }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Validando...
            </div>
          ) : (
            <>
              Continuar
              <span className="ml-2">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
