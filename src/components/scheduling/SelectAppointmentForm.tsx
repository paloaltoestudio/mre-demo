import Select from "react-select";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CancelBtn } from "./CancelBtn";
import type { CountriesInfoType } from "../../types/dashboard/countryInfo";
import { CountriesInfoSchema } from "../../schemas/appointments/countryInfo.schema";
import type {
  OfficeInfoType,
  OfficesInfoType,
} from "../../types/dashboard/officeInfo";
import { OfficesInfoSchema } from "../../schemas/appointments/OfficeInfo.schema";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { usePublicQuery } from "../../hooks/usePublicQuery";
import { useGeocod, useSetPosition } from "../../hooks/useGeocod";
// Log useGeocod to avoid unused import warning
console.log("useGeocod hook available:", useGeocod);
import { customStyles } from "../common/reactSelectStyles";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const initialLocation = {
  lat: 6.2442,
  lng: -75.5812,
};

type SelectAppointmentFormProps = {
  setConsulate: Dispatch<SetStateAction<OfficeInfoType>>;
  setView?: (step: number) => void;
  countries?: CountriesInfoType["data"];
};

export const SelectAppointmentForm = ({
  setConsulate,
  setView,
  countries,
}: SelectAppointmentFormProps) => {
  const [mapLocation, setMapLocation] = useState(initialLocation);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation);
  const [address, setAddress] = useState<string>("");
  // Log setAddress to avoid unused variable warning
  console.log("Address setter available:", setAddress);
  const [selectedOption, setSelectedOption] = useState<OfficeInfoType>();
  const { setCountry } = SchedulingsStore();
  const [city, setCity] = useState<string>();
  const { logTraceabilityEvent } = useTraceabilityLog();

  const { control, setValue } = useFormContext();
  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const selectedCity = useWatch({
    control,
    name: "city",
  });

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry);
      setValue("city", null), setCity("");
    }
  }, [selectedCountry]);

  const { data: citiesData } = usePublicQuery<CountriesInfoType>({
    key: ["citiesInfo", selectedCountry],
    url: `/City/by-country/${selectedCountry}`,
    schema: CountriesInfoSchema,
    options: {
      enabled: !!selectedCountry,
    },
  });

  const { data: officeData } = usePublicQuery<OfficesInfoType>({
    key: ["officeInfo", selectedCountry, selectedCity],
    url: `/Office/by-city/${selectedCity}`,
    schema: OfficesInfoSchema,
    options: {
      enabled: !!selectedCountry && !!selectedCity,
    },
  });

  useEffect(() => {
    if (!address) return;

    const apiKey = import.meta.env.VITE_MAPS_API_KEY;

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setMapLocation(location);
          setMarkerPosition(location);
        }
      })
      .catch((error) => {
        console.error("Error fetching geocode:", error);
      });
  }, [address]);

  useEffect(() => {
    if (city && citiesData?.data) {
      const cityData = citiesData.data.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      if (cityData) {
        setValue("city", cityData.id);
      }
    }
  }, [city, citiesData?.data, setValue]);

  const handleCity = async (cityName: string | undefined) => {
    if (cityName) {
      const latLng = await useSetPosition(cityName, setMarkerPosition);

      setMapLocation(latLng);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      setValue("city", selectedCity);

      const cityData = citiesData?.data?.find(
        (c) => c.id === selectedCity
      )?.name;
      setCity(cityData);
      handleCity(cityData);
    }
  }, [selectedCity]);

  const handleOfficeSelection = async (item: OfficeInfoType) => {
    setSelectedOption(item);
    setConsulate(item);

    const position = await useSetPosition(
      `${item.address}, ${city}`,
      setMarkerPosition
    );
    if (position) {
      setMarkerPosition(position);
      setMapLocation(position);
    }
  };

  const handleContinue = () => {
    // Log cuando se continúa al siguiente paso
    const countryData = countries?.find(c => c.id === selectedCountry);
    const cityData = citiesData?.data?.find(c => c.id === selectedCity);
    
    logTraceabilityEvent({
      procedure: "agendamiento",
      procedureStatus: "continuar_seleccion_lugar",
      modifiedFields: {
        selectedOffice: selectedOption ? {
          id: selectedOption.id,
          name: selectedOption.name,
          address: selectedOption.address
        } : null,
        selectedCity: selectedCity,
        selectedCountry: selectedCountry,
        countryName: countryData?.name,
        cityName: cityData?.name
      },
      observations: selectedOption 
        ? `Usuario continuó después de seleccionar oficina: ${selectedOption.name}`
        : "Usuario continuó sin seleccionar oficina"
    });

    setView?.(2);
  };

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
            render={({ field, fieldState }) => {
              const selectedCountry = countries?.find(
                (c) => c.id === field.value
              );
              return (
                <div>
                  <Select
                    inputId="country"
                    options={countries}
                    styles={customStyles}
                    className="select_react"
                    formatOptionLabel={({ name }) => (
                      <div className="flex items-center gap-2">
                        <span>{name}</span>
                      </div>
                    )}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    value={selectedCountry || null}
                    onChange={(selected) => {
                      return field.onChange(selected?.id || null);
                    }}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              );
            }}
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
            render={({ field, fieldState }) => {
              const selectedCity = citiesData?.data?.find(
                (c) => c.id === field.value
              );
              return (
                <div>
                  <Select
                    inputId="city"
                    options={citiesData?.data}
                    styles={customStyles}
                    className="select_react"
                    formatOptionLabel={({ name }) => (
                      <div className="flex items-center gap-2">
                        <span>{name}</span>
                      </div>
                    )}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    value={selectedCity || null}
                    onChange={(selected) => {
                      return field.onChange(selected?.id || null);
                    }}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>

      <div className="flex flex-row gap-5 w-full justify-between mt-5">
        <div
          id="consulates"
          aria-label="consulates"
          className="rounded-sm w-full lg:w-[550px] max-h-[230px] lg:max-h-[400px] overflow-auto"
        >
          <div className="flex flex-wrap flex-row gap-3">
            {selectedCountry && selectedCity ? (
              officeData?.data?.map((item) => (
                <div
                  key={item.name}
                  className={`border-2 border-gray-200 hover:bg-gray-100 hover:cursor-pointer rounded-md w-[48%]  p-2 min-h-[100px] justify-center flex flex-col ${
                    selectedOption === item
                      ? "border-blue-500 bg-gray-200"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleOfficeSelection(item)}
                >
                  <h3 className="font-medium text-md">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Dirección: {`${item.address}, ${item.cityName}`}
                  </p>
                </div>
              ))
            ) : (
              <div
                className={`border-2 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md flex-1 text-center  p-2 max-h-[100px] justify-center flex flex-col`}
              >
                <h3 className="font-medium text-md">Ten presente que:</h3>
                <p className="text-sm text-gray-600">
                  Para ver las oficinas disponibles, primero debes seleccionar
                  un país y una ciudad.
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          id="map"
          aria-label="map"
          className="bg-slate-200 w-full h-[400px] lg:w-6/12"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapLocation}
            zoom={12}
          >
            {markerPosition !== null && <Marker position={markerPosition} />}
          </GoogleMap>
        </div>
      </div>
      <div className="w-full flex flex-row items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={handleContinue}
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
