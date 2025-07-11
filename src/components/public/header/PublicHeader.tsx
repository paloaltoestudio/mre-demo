import logotypeGov from "@/assets/logo.svg";
import logoCancilleria from "@/assets/LOGO-CANCILLERÍA1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

type PublicHeaderProps = {
  short: boolean;
  official?: boolean;
};

export const PublicHeader = ({
  short = false,
  official = false,
}: PublicHeaderProps) => {
  return (
    <header
      className={`w-full ${short ? "h-[7vh]" : "h-[20vh]"} shadow-lg`}
      aria-label="Encabezado público principal"
    >
      <div
        className={`w-full  bg-[#3466cc] p-1.5 ${
          short ? "flex justify-center h-full" : "h-2/6"
        }`}
      >
        <img
          src={logotypeGov}
          alt="Logo gov.co"
          title="Logo gov.co"
          className="h-full object-contain"
          loading="lazy"
        />
      </div>
      {!short && (
        <div className="w-full h-4/6 p-1.5 flex relative">
          <div className={`h-full w-full`}>
            <img
              src={logoCancilleria}
              alt="Agendamiento Cancillería"
              title="Agendamiento Cancillería"
              className="h-full object-contain mx-auto"
              loading="lazy"
            />
          </div>

          {official && (
            <div className="flex h-full justify-center items-center w-[150px]  absolute right-5">
              <div className="flex gap-2 rounded-full p-2 hover:bg-gray-100">
                <div className="w-[30px] h-[30px] bg-[#1c3e70] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-white text-[18px]"
                  />
                </div>
                <span className="text-gray-800 text-lg">Funcionario</span>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
