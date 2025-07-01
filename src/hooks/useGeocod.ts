import type { Dispatch, SetStateAction } from "react";
import type { CountriesInfoType } from "../types/dashboard/countryInfo";
import type { FieldValues, UseFormSetValue } from "react-hook-form";

type useGeocodProps = {
  latLng: {
    lat: number;
    lng: number;
  };
  countries: CountriesInfoType["data"];
  setAddress: Dispatch<SetStateAction<string>>;
  setCountry: (country: number) => void;
  setValue: UseFormSetValue<FieldValues>;
};

export const useGeocod = ({
  latLng,
  countries,
  setAddress,
  setCountry,
  setValue,
}: useGeocodProps) => {
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK") {
      if (results?.[0]) {
        const formattedCountry = countries?.filter(
          (c) =>
            c.name ===
            results[0].address_components.find((component) =>
              component.types.includes("country")
            )?.long_name
        )[0];
        setAddress(results[0].formatted_address);
        setCountry(formattedCountry?.id || 0);
        setValue("country", formattedCountry?.id || 0);
        console.log(
          "pais y direccion",
          formattedCountry,
          results[0].formatted_address
        );
      } else {
        console.warn("No se encontraron resultados");
      }
    } else {
      console.error("Geocoder falló debido a:", status);
    }
  });
};
