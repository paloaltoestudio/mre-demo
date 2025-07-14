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
  setCity: Dispatch<SetStateAction<string | undefined>>;
};

export const useGeocod = ({
  latLng,
  countries,
  setAddress,
  setCountry,
  setValue,
  setCity,
}: useGeocodProps) => {
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK") {
      if (results?.[0]) {
        const addressComponent = results[0].address_components;
        const formattedCountry = countries?.filter(
          (c) =>
            c.name.toLowerCase() ===
            addressComponent
              .find((component) => component.types.includes("country"))
              ?.long_name.toLowerCase()
        )[0];
        const cityComponent =
          addressComponent.find((c) => c.types.includes("locality")) ||
          addressComponent.find((c) =>
            c.types.includes("administrative_area_level_2")
          ) ||
          addressComponent.find((c) => c.types.includes("sublocality")) ||
          addressComponent.find((c) => c.types.includes("sublocality_level_1"));

        setAddress(results[0].formatted_address);
        setCountry(formattedCountry?.id || 0);
        setValue("country", formattedCountry?.id || 0);
        setCity(cityComponent?.long_name.toLowerCase() || "");
      } else {
        console.warn("No se encontraron resultados");
      }
    } else {
      console.error("Geocoder falló debido a:", status);
    }
  });
};

// export const useSetPosition = (
//   address: string
// ): { lat: number; lng: number } => {
//   const geocoder = new window.google.maps.Geocoder();
//   let position = { lat: 0, lng: 0 };

//   geocoder.geocode({ address }, (results, status) => {
//     if (status === "OK" && results?.[0]) {
//       const location = results[0].geometry.location;
//       const lat = location.lat();
//       const lng = location.lng();

//       position = { lat, lng };
//     } else {
//       console.error("Error al geocodificar la dirección:", status);
//     }
//   });

//   return position;
// };
export const useSetPosition = (
  address: string,
  setMarkerPosition: Dispatch<SetStateAction<{ lat: number; lng: number }>>,
  setMapLocation: Dispatch<SetStateAction<{ lat: number; lng: number }>>
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        resolve({ lat, lng });
      } else {
        const fallback = { lat: 6.2442, lng: -75.5812 };
        setMarkerPosition(fallback);
        setMapLocation(fallback);
      }
    });
  });
};
