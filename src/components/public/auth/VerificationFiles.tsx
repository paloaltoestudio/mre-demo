import { type FileRejection } from "react-dropzone";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { resources } from "../../../mocks/authMocks/FilesMock";
import { DropzoneComponent } from "./DropzoneComponent";

export const VerificationFiles = () => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      console.log("Archivos aceptados:", acceptedFiles);
      console.log("Archivos rechazados:", fileRejections);
    },
    []
  );

  return (
    <div className="w-full p-5">
      <h2 className="border-b-2 border-b-gray-300 pb-2 font-medium">
        Cargue de documentos para validación de identidad
      </h2>
      <div className="w-full grid grid-cols-2 gap-7 mt-10">
        {resources.map((item, index) => (
          <div
            key={item.text + index}
            className="hover:cursor-pointer flex gap-3 border-gray-300 border-2 p-3 rounded-md hover:bg-gray-100"
          >
            <span className="">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="1x"
                color="#3466cc"
              />
            </span>
            <DropzoneComponent text={item.text} onDrop={onDrop} identi={"10"}/>
            <span className="ml-auto text-[#3466cc] underline">
              Cargar archivo
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
