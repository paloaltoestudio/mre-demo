# Guía del Store Global de Usuario Activo

## Descripción

El store global de usuario activo permite acceder a la información del usuario autenticado desde cualquier parte de la aplicación. Esto elimina la necesidad de pasar props entre componentes y mantiene la información del usuario consistente en toda la aplicación.

## Estructura del Store

### Campos Disponibles

```typescript
type SessionStates = {
  // ... otros campos
  activeUser: ResponseTokenType | null; // Usuario activo
  userId: number | null; // ID del usuario activo
}
```

### Acciones Disponibles

```typescript
type SessionActions = {
  // ... otras acciones
  setActiveUser: (activeUser: ResponseTokenType) => void; // Establecer usuario activo
  clearActiveUser: () => void; // Limpiar usuario activo
  setUserId: (userId: number) => void; // Establecer ID del usuario
}
```

## Hook Personalizado: `useActiveUser`

Para facilitar el uso del store global, hemos creado un hook personalizado:

```typescript
import { useActiveUser } from "../hooks/useActiveUser";

const { activeUser, setActiveUser, clearActiveUser, hasActiveUser } = useActiveUser();
```

### Valores Retornados

- `activeUser`: El usuario activo (ResponseTokenType | null)
- `setActiveUser`: Función para establecer el usuario activo
- `clearActiveUser`: Función para limpiar el usuario activo
- `hasActiveUser`: Boolean que indica si hay un usuario activo

## Ejemplos de Uso

### 1. Obtener Información del Usuario

```typescript
import { useActiveUser } from "../hooks/useActiveUser";

const MyComponent = () => {
  const { activeUser, hasActiveUser } = useActiveUser();

  if (!hasActiveUser) {
    return <div>No hay usuario activo</div>;
  }

  return (
    <div>
      <h1>Hola {activeUser.firstName} {activeUser.lastName}</h1>
      <p>Documento: {activeUser.documentNumber}</p>
      <p>Email: {activeUser.email}</p>
    </div>
  );
};
```

### 2. Establecer Usuario Activo

```typescript
import { useActiveUser } from "../hooks/useActiveUser";

const LoginComponent = () => {
  const { setActiveUser } = useActiveUser();

  const handleLogin = async (credentials) => {
    const userData = await loginAPI(credentials);
    setActiveUser(userData); // Guarda en el store global
  };

  return (
    // ... formulario de login
  );
};
```

### 3. Limpiar Usuario Activo (Logout)

```typescript
import { useActiveUser } from "../hooks/useActiveUser";

const LogoutButton = () => {
  const { clearActiveUser } = useActiveUser();

  const handleLogout = () => {
    clearActiveUser(); // Limpia el store global
    // ... otras acciones de logout
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};
```

### 4. Verificar si Hay Usuario Activo

```typescript
import { useActiveUser } from "../hooks/useActiveUser";

const ProtectedRoute = ({ children }) => {
  const { hasActiveUser } = useActiveUser();

  if (!hasActiveUser) {
    return <Navigate to="/login" />;
  }

  return children;
};
```

## Migración de Estado Local a Store Global

### Antes (Estado Local)

```typescript
const [activeUser, setActiveUser] = useState<ResponseTokenType>();

useEffect(() => {
  const userData = await fetchUser();
  setActiveUser(userData);
}, []);
```

### Después (Store Global)

```typescript
const { activeUser, setActiveUser } = useActiveUser();

useEffect(() => {
  const userData = await fetchUser();
  setActiveUser(userData); // Se guarda globalmente
}, []);
```

## Ventajas del Store Global

1. **Acceso Global**: El usuario está disponible en cualquier componente
2. **Persistencia**: Los datos se mantienen al navegar entre pantallas
3. **Consistencia**: Un solo lugar para la información del usuario
4. **Simplicidad**: No necesitas pasar props entre componentes
5. **Performance**: Evita re-renders innecesarios

## Tipos de Datos

El usuario activo tiene el tipo `ResponseTokenType` que incluye:

```typescript
type ResponseTokenType = {
  id: number;
  documentNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  officeId: number;
  acceptsDataProcessing: boolean;
  acceptsTermsAndConditions: boolean;
  acceptanceDate: Date;
}
```

## Componente de Ejemplo

Hemos creado un componente de ejemplo `UserProfile.tsx` que muestra cómo usar el store global:

```typescript
import { UserProfile } from "../components/UserProfile";

// Usar en cualquier componente
<UserProfile />
```

Este componente muestra toda la información del usuario activo y permite cerrar sesión.

## Notas Importantes

1. **Persistencia**: El store usa localStorage, por lo que los datos persisten entre sesiones
2. **Tipado**: Todos los tipos están correctamente definidos para TypeScript
3. **Reactividad**: Los componentes se actualizan automáticamente cuando cambia el usuario activo
4. **Limpieza**: Usa `clearActiveUser()` para limpiar los datos al hacer logout 