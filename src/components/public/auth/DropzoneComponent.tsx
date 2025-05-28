import { useDropzone, type FileRejection } from "react-dropzone";

type DropzoneProps = {
  text: string;
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  selectorClasses?: string;
  identi: string;
};

export const DropzoneComponent = ({
  text,
  onDrop,
  selectorClasses,
  identi,
}: DropzoneProps) => {
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
    <div {...getRootProps()} className="flex justify-center items-center" id={`dropzone-${identi}`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <p className={`${selectorClasses}`}>{text}</p>
      )}
    </div>
  );
};
