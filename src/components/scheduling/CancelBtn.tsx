import { useNavigate } from "react-router-dom";

export const CancelBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard/appointments")}
      className="mr-auto text-[#3466cc]  hover:text-[#343ecc] hover:underline  font-medium py-2 px-4 rounded-full hover:cursor-pointer duration-150"
    >
      Cancelar
    </button>
  );
};
