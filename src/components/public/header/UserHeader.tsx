import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useActiveUser } from "../../../hooks/useActiveUser";
import { ENV_CONFIG } from "../../../configs/environment";
import { SessionStore } from "../../../stores/sessionStore";

export const UserHeader = () => {
  const { activeUser, hasActiveUser, clearActiveUser, clearTokenExpiration } = useActiveUser();

  const handleLogout = () => {
    clearActiveUser();
    clearTokenExpiration();
    // Redirigir a la aplicación externa de autenticación
    window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
  };

  if (!hasActiveUser) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center items-center pt-2 md:pt-0 md:items-center gap-2 md:gap-3 md:absolute md:right-5 md:top-1/2 md:transform md:-translate-y-1/2">
    {/* <div className="flex flex-row items-center justify-center gap-2"> */}
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] bg-[#1c3e70] rounded-full flex items-center justify-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-white text-[18px]"
          />
        </div>
        <span className="text-gray-800 text-xs md:text-sm font-medium">
          {SessionStore?.getState?.()?.official ? (
            <span className="text-[10px] md:text-xs text-blue-700 font-semibold hidden md:block">(Por funcionario)</span>
          ) : null}
          {activeUser?.firstName} {activeUser?.lastName}
        </span>
      </div>
      
      
      {!SessionStore?.getState?.()?.official && (
        <>
          <div className="hidden md:block w-px h-6 bg-gray-300"></div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors duration-200 text-xs md:text-sm font-medium"
            title="Cerrar sesión"
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-xs md:text-sm"
            />
            <span>Cerrar Sesión</span>
          </button>
        </>
      )}
      
    </div>
  );
}; 