import { useActiveUser } from "../hooks/useActiveUser";

/**
 * Componente de ejemplo que muestra cómo usar el store global del usuario activo
 * Este componente puede ser usado en cualquier parte de la aplicación
 */
export const UserProfile = () => {
  const { activeUser, hasActiveUser, clearActiveUser } = useActiveUser();

  if (!hasActiveUser) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800">No hay usuario activo</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Perfil del Usuario
        </h3>
        <button
          onClick={clearActiveUser}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Cerrar sesión
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Nombre completo:</span>
          <span className="text-gray-800">
            {activeUser?.firstName} {activeUser?.lastName}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Documento:</span>
          <span className="text-gray-800">{activeUser?.documentNumber}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{activeUser?.email}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Teléfono:</span>
          <span className="text-gray-800">{activeUser?.phone}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">WhatsApp:</span>
          <span className="text-gray-800">{activeUser?.whatsapp}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">ID de Usuario:</span>
          <span className="text-gray-800">{activeUser?.id}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Oficina ID:</span>
          <span className="text-gray-800">{activeUser?.officeId}</span>
        </div>
      </div>
    </div>
  );
}; 