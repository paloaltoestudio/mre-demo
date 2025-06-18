import Select from "react-select";
import {
  cityOptions,
  consulatesOptions,
  countryOptions,
} from "../../mocks/dashboardMocks/AppoinmentsMock";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { faArrowRight, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { CancelBtn } from "./CancelBtn";
import { toast } from "react-toastify";
// import type {
//   CountriesInfoType,
//   CountryInfoType,
// } from "../../types/dashboard/countryInfo";
// import { getPublicRequest } from "../../services/fetchingService";
// import { CountriesInfoSchema } from "../../schemas/appointments/countryInfo";

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

const containerStyle = {
  width: "100%",
  height: "100%",
};

const initialLocation = {
  lat: 6.2442,
  lng: -75.5812,
};

type SelectAppointmentFormProps = {
  setConsulate: Dispatch<SetStateAction<ConsulatesType>>;
  setView?: Dispatch<SetStateAction<number>>;
  // countries?: CountriesInfoType["data"];
};

export const SelectAppointmentForm = ({
  setConsulate,
  setView,
}: // countries,
SelectAppointmentFormProps) => {
  const [mapLocation, setMapLocation] = useState(initialLocation);
  const [markerPosition, setMarkerPosition] = useState(initialLocation);
  // const [country, setCountry] = useState<CountryInfoType>();
  const [location, setLocation] = useState<string>();
  const [showConsulates, setShowConsulates] = useState<
    ConsulatesType[] | undefined
  >();
  const [selectedOption, setSelectedOption] = useState<ConsulatesType>();

  const { control } = useFormContext();
  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const selectedCity = useWatch({
    control,
    name: "city",
  });

  // useEffect(() => {
  //   requestCities();
  //   setCountry(selectedCountry.value);
  // }, [selectedCountry]);

  useEffect(() => {
    let filtered = consulatesOptions;

    if (selectedCountry && !selectedCity) {
      filtered = consulatesOptions.filter(
        (item) => item.country === selectedCountry.value
      );
    } else if (selectedCountry && selectedCity) {
      filtered = consulatesOptions.filter(
        (item) =>
          item.country === selectedCountry.value &&
          item.city === selectedCity.value
      );
    }

    setShowConsulates(filtered);
  }, [selectedCity, selectedCountry, consulatesOptions]);

  useEffect(() => {
    if (!location) return;

    const apiKey = import.meta.env.VITE_MAPS_API_KEY;

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          const loc = data.results[0].geometry.location;
          setMapLocation(loc); // Centra el mapa
          setMarkerPosition(loc); // Posiciona el marcador
        } else {
          console.error("Error al geocodificar:", data.status);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud de geocodificación:", error);
      });
  }, [location]);

  // const requestCities = async () => {
  //   const cities = await getPublicRequest({
  //     url: `/City/by-country/${country?.id}`,
  //     schema: CountriesInfoSchema,
  //   });

  //   console.log("Cities:", cities);
  // };

  return (
    <section
      id="select-appointment-form"
      aria-label="select-appointment-form"
      className="w-full"
    >
      <h2 className="mb-4 text-lg font-semibold">¿Dónde deseas agendar?</h2>

      <div className="flex flex-row gap-5 w-full justify-between">
        <div className="relative w-[48%] xl:w-[600px]">
          <label
            htmlFor="country"
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            País <span className="text-red-500">*</span>
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
                  options={countryOptions}
                  styles={customStyles}
                  formatOptionLabel={({ label, icon }) => (
                    <div className="flex items-center gap-2">
                      <img
                        src={icon}
                        alt={label}
                        className="w-[20px] h-[15px]"
                      />
                      <span>{label}</span>
                    </div>
                  )}
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
        <div className="relative w-[48%] xl:w-[600px]">
          <Controller
            name="city"
            control={control}
            rules={{
              required: "La ciudad es obligatoria",
              validate: (value) => {
                if (!value) return "Por favor, selecciona una ciudad.";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  inputId="city"
                  options={cityOptions}
                  styles={customStyles}
                  formatOptionLabel={({ label }) => (
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                    </div>
                  )}
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
      </div>

      <div id="appointments-options" className="mt-10">
        <h2 className="mb-5 text-lg font-semibold">Oficina más cercana</h2>
        <div className="flex flex-col h-auto lg:flex-row gap-5">
          <div
            id="consulates"
            aria-label="consulates"
            className="flex flex-wrap flex-row rounded-sm gap-3 w-full lg:w-[550px] h-[400px] overflow-auto"
          >
            {showConsulates?.map((item) => (
              <div
                key={item.consulate.address}
                className={`border-2 border-gray-200 hover:bg-gray-100 hover:cursor-pointer rounded-md w-[48%]  p-2 max-h-[100px] justify-center flex flex-col ${
                  selectedOption === item
                    ? "border-blue-500 bg-gray-200"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedOption(item);
                  setLocation(item.consulate.address);
                  setConsulate(item);
                }}
              >
                <h3 className="font-medium text-md">{item.consulate.name}</h3>
                <p className="text-sm text-gray-600">
                  Dirección: {item.consulate.address}
                </p>
                <p className="text-sm text-gray-600">
                  Teléfono: {item.consulate.phone}
                </p>
              </div>
            ))}
          </div>

          <div
            id="map"
            aria-label="map"
            className="bg-slate-200 w-full h-[400px] lg:w-6/12"
          >
            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapLocation}
                zoom={14}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={() => {
            if (!selectedOption) {
              toast.error("Selecciona una oficina", {
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
            setView?.(2);
          }}
          className="bg-[#3466cc] text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8]"
        >
          Continuar
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </section>
  );
};
