import { SessionStore } from "../stores/sessionStore";

/**
 * Hook personalizado para acceder al usuario activo desde cualquier componente
 * @returns {Object} activeUser - El usuario activo del store global
 * @returns {Function} setActiveUser - Función para actualizar el usuario activo
 * @returns {Function} clearActiveUser - Función para limpiar el usuario activo
 * @returns {boolean} hasActiveUser - Indica si hay un usuario activo
 * @returns {Date | null} tokenExpiration - Fecha de expiración del token
 * @returns {Function} setTokenExpiration - Función para establecer la expiración
 * @returns {Function} clearTokenExpiration - Función para limpiar la expiración
 */
export const useActiveUser = () => {
  const { 
    activeUser, 
    setActiveUser, 
    clearActiveUser, 
    tokenExpiration,
    setTokenExpiration,
    clearTokenExpiration 
  } = SessionStore();
  
  return {
    activeUser,
    setActiveUser,
    clearActiveUser,
    hasActiveUser: activeUser !== null,
    tokenExpiration,
    setTokenExpiration,
    clearTokenExpiration,
  };
}; 