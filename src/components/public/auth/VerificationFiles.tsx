import {
  useDropzone,
  // type DropEvent,
  type FileRejection,
} from "react-dropzone";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { resources } from "../../../mocks/authMocks/FilesMock";

export const VerificationFiles = () => {
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      // event: DropEvent
    ) => {
      console.log("Archivos aceptados:", acceptedFiles);
      console.log("Archivos rechazados:", fileRejections);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [],
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div className="w-full p-5">
      <h2 className="border-b-2 border-b-gray-300 py-5 font-medium">
        Cargue de documentos para validación de identidad
      </h2>
      <div className="w-full grid grid-cols-2 gap-7 mt-10">
        {resources.map((item, index) => (
          <div
            {...getRootProps()}
            className="hover:cursor-pointer flex gap-3 border-gray-300 border-2 p-3 rounded-md hover:bg-gray-100"
            key={index}
          >
            <span className="">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="1x"
                color="#3466cc"
              />
            </span>

            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta el archivo aquí...</p>
            ) : (
              <p>{item.text}</p>
            )}
            <span className="ml-auto text-[#3466cc] underline">
              Cargar archivo
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
