import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { resources } from "../../mocks/authMocks/FilesMock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { DropzoneComponent } from "../public/auth/DropzoneComponent";
import { useCallback, useEffect, useState } from "react";
import type { FileRejection } from "react-dropzone";
import type { ResponseDocumentTypesType } from "../../types/auth/documentTypes";
import { useQueryClient } from "@tanstack/react-query";
import { usePublicQuery } from "../../hooks/usePublicQuery";
import { ResponseDependentsSchema } from "../../schemas/appointments/dependentsSchema";
import type { ResponseDependentsType } from "../../types/dashboard/dependentInformation";

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

type DependentsCardProps = {
  aggregate?: number;
};

export const DependentsCard = ({ aggregate }: DependentsCardProps) => {
  const { control } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], key: string) => {
      if (acceptedFiles.length > 0) {
        setUploadedFiles((prev) => ({ ...prev, [key]: true }));
      }
      console.log("Archivos aceptados:", acceptedFiles);
      console.log("Archivos rechazados:", fileRejections);
    },
    []
  );

  const [documentTypes, setDocumentTypes] = useState<
    ResponseDocumentTypesType["data"]
  >([]);
  const queryClient = useQueryClient();

  const { data: dependentTypes } = usePublicQuery<ResponseDependentsType>({
    key: ["/RelationshipTypes"],
    url: "/RelationshipTypes",
    schema: ResponseDependentsSchema,
  });

  useEffect(() => {
    const documents = queryClient.getQueryData<ResponseDocumentTypesType>([
      "/api-documentTypes",
    ]);
    setDocumentTypes(documents?.data || []);
  }, []);

  return (
    <div className="w-full p-5 shadow-lg border border-gray-100 rounded-lg">
      <h3 className="font-medium">
        Dependiente {aggregate ? aggregate + 1 : 1}
      </h3>
      <div className="relative w-full mt-4">
        <label
          htmlFor={`country-${aggregate}`}
          className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
        >
          Parentesco
        </label>
        <Controller
          name={`parent-${aggregate}`}
          control={control}
          rules={{
            required: "El tipo de parentesco es obligatorio",
            validate: (value) => {
              if (!value) return "Por favor, selecciona un tipo de parentesco";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <div>
              <Select
                id={`parent-${aggregate}`}
                options={dependentTypes?.data || []}
                styles={customStyles}
                value={
                  dependentTypes?.data?.find((opt) => opt.id === field.value) ||
                  null
                }
                onChange={(selected) => field.onChange(selected?.id)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => String(option.id)}
                placeholder="Seleccione un parentesco"
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
            htmlFor={`type-document-${aggregate}`}
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            Tipo de documento
          </label>

          <Controller
            name={`type-document-${aggregate}`}
            control={control}
            rules={{
              required: "El tipo de documento es obligatorio",
              validate: (value) => {
                if (!value) return "Por favor, selecciona un tipo de documento";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  id={`parent-${aggregate}`}
                  options={documentTypes}
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  value={
                    documentTypes.find((opt) => opt.id === field.value) || null
                  }
                  onChange={(selected) => field.onChange(selected?.id)}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => String(option.id)}
                  placeholder="Seleccione un tipo de documento"
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
            htmlFor={`document-number-dependent-${aggregate}`}
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            Número de documento
          </label>
          <Controller
            name={`document-number-dependent-${aggregate}`}
            control={control}
            rules={{
              required: "El número de documento es obligatorio",
              validate: (value) => {
                if (!value) return "Por favor, indique un número de documento.";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  id={`document-number-dependent-${aggregate}`}
                  type="number"
                  className="min-h-12 px-2 py-1 border focus:border-blue-500 border-gray-300 shadow-none w-full rounded"
                  {...field}
                  placeholder="Número de documento"
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
      <div className="flex justify-between gap-5">
        <div className="relative w-full mt-4">
          <label
            htmlFor={`names-${aggregate}`}
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            Nombres
          </label>

          <Controller
            name={`names-${aggregate}`}
            control={control}
            rules={{
              required: "El nombre es obligatorio",
              validate: (value) => {
                if (!value) return "Por favor, indique nombre.";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  id={`names-${aggregate}`}
                  type="text"
                  className="min-h-12 px-2 py-1 border focus:border-blue-500 border-gray-300 shadow-none w-full rounded"
                  {...field}
                  placeholder="Nombres del dependiente"
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
            htmlFor={`last-names-${aggregate}`}
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 z-10"
          >
            Apellidos
          </label>
          <Controller
            name={`last-names-${aggregate}`}
            control={control}
            rules={{
              required: "Los apellidos son obligatorios",
              validate: (value) => {
                if (!value) return "Por favor, indique un apellido";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  id={`last-names-${aggregate}`}
                  type="text"
                  className="min-h-12 px-2 py-1 border focus:border-blue-500 border-gray-300 shadow-none w-full rounded"
                  {...field}
                  placeholder="Apellidos del dependiente"
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

      <div className="border-t-1 pt-5 border-gray-300 w-full grid grid-cols-2 gap-7 mt-5">
        {resources.map((item, index) => (
          <div
            key={`${index}${aggregate}`}
            className="hover:cursor-pointer flex gap-3 border-gray-300 border-2 p-3 rounded-md hover:bg-gray-100"
          >
            <span className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={uploadedFiles[item.text] ? faCheckCircle : faCloudArrowUp}
                size="1x"
                color={uploadedFiles[item.text] ? "green" : "#3466cc"}
              />
            </span>
            <DropzoneComponent
              text={item.text}
              onDrop={(acceptedFiles, fileRejections) =>
                handleDrop(acceptedFiles, fileRejections, item.text)
              }
              identi={`${index}${aggregate}`}
            />
            <div className="ml-auto text-[#3466cc] underline flex items-center justify-center">
              {uploadedFiles[item.text] ? (
                <span className="flex gap-2 justify-center items-center">
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    size="1x"
                    color={"#3466cc"}
                    onClick={() => {
                      document
                        .getElementById(`dropzone-${index}${aggregate}`)
                        ?.click();
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    color={"#7e7e7e"}
                    onClick={() => {
                      // trash
                    }}
                  />
                </span>
              ) : (
                <span
                  onClick={() => {
                    document
                      .getElementById(`dropzone-${index}${aggregate}`)
                      ?.click();
                  }}
                >
                  Cargar archivo
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
