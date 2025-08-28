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
import type { ResponseDependentsType } from "../../types/dashboard/DependentInformation";
import type { DependentDocument } from "../../types/dashboard/editAppointmentTypes";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: "none",
    padding: "0.25rem 0.5rem",
    minHeight: "1rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

type DependentsCardProps = {
  aggregate?: number;
};

export const DependentsCard = ({ aggregate }: DependentsCardProps) => {
  const { control, setValue } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: boolean;
  }>({});

  // Función para convertir archivo a base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remover el prefijo "data:application/pdf;base64," o similar
        const base64 = base64String.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Función para obtener la extensión del archivo
  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[], key: string) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        try {
          const base64 = await convertFileToBase64(file);
          const extension = getFileExtension(file.name);
          
          // Crear el objeto DependentDocument
          const documentData: DependentDocument = {
            base64,
            extension
          };

          // Guardar en el formulario usando setValue
          setValue(`dependent-${aggregate}-${key}`, documentData);
          
          // Actualizar el estado visual
          setUploadedFiles((prev) => ({ ...prev, [key]: true }));
          
          console.log(`Archivo ${key} convertido y guardado para dependiente ${aggregate}:`, {
            extension,
            base64Length: base64.length
          });
        } catch (error) {
          console.error(`Error al convertir archivo ${key}:`, error);
        }
      }
      console.log("Archivos aceptados:", acceptedFiles);
      console.log("Archivos rechazados:", fileRejections);
    },
    [aggregate, setValue]
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
                menuPortalTarget={document.body}
                styles={{
                  ...customStyles,
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                value={field.value}
                onChange={(selected) => field.onChange(selected)}
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
                  menuPortalTarget={document.body}
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

      <div className="border-t-1 pt-5 border-gray-300 w-full grid grid-cols-3 gap-4 mt-5">
        {resources.map((item, index) => (
          <div
            key={`${index}${aggregate}`}
            className="hover:cursor-pointer flex flex-col gap-2 border-gray-300 border-2 p-3 rounded-md hover:bg-gray-100"
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={uploadedFiles[item.key] ? faCheckCircle : faCloudArrowUp}
                size="1x"
                color={uploadedFiles[item.key] ? "green" : "#3466cc"}
              />
            </div>
            <span className="text-xs text-center text-gray-600 font-medium">
              {item.text}
            </span>
            <DropzoneComponent
              text={item.text}
              onDrop={(acceptedFiles, fileRejections) =>
                handleDrop(acceptedFiles, fileRejections, item.key)
              }
              identi={`${index}${aggregate}`}
            />
            <div className="text-center">
              {uploadedFiles[item.key] ? (
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-xs text-green-600 font-medium">
                    Archivo cargado
                  </span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    color={"#7e7e7e"}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      // Limpiar el archivo del formulario
                      setValue(`dependent-${aggregate}-${item.key}`, undefined);
                      setUploadedFiles((prev) => ({ ...prev, [item.key]: false }));
                    }}
                  />
                </div>
              ) : (
                <span
                  className="text-xs text-[#3466cc] underline cursor-pointer"
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
