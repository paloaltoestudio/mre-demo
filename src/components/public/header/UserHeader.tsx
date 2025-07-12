import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useActiveUser } from "../../../hooks/useActiveUser";
import { ENV_CONFIG } from "../../../configs/environment";

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
    <div className="flex items-center gap-3 absolute right-5 top-1/2 transform -translate-y-1/2">
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] bg-[#1c3e70] rounded-full flex items-center justify-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-white text-[18px]"
          />
        </div>
        <span className="text-gray-800 text-sm font-medium">
          {activeUser?.firstName} {activeUser?.lastName}
        </span>
      </div>
      
      <div className="w-px h-6 bg-gray-300"></div>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
        title="Cerrar sesión"
      >
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="text-sm"
        />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
}; 