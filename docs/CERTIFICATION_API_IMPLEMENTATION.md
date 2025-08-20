# Implementación de la API de Certificaciones

## Descripción

Se ha implementado el consumo de la API de certificaciones siguiendo el patrón establecido en el proyecto. La implementación incluye esquemas de validación, servicios, hooks personalizados y tipos TypeScript.

## Endpoint Implementado

- **URL**: `https://agendamiento-dev.devcancilleria.com.co/api/api/Certification/create`
- **Método**: `POST`
- **Ruta**: `/api/Certification/create`

## Payload de la API

```json
{
  "certificationType": "string",
  "destinationEntity": "string",
  "settledAmount": 0,
  "consecutiveNumber": "string",
  "userId": 0,
  "nationality": "string"
}
```

## Estructura de Archivos Implementados

### 1. Esquemas de Validación
- **Archivo**: `src/schemas/certifications/certification.schema.ts`
- **Propósito**: Validación de datos usando Valibot
- **Esquemas**:
  - `CreateCertificationSchema`: Para validar datos de entrada
  - `CertificationResponseSchema`: Para validar respuesta de la API

### 2. Tipos TypeScript
- **Archivo**: `src/types/certifications/certificationTypes.ts`
- **Propósito**: Definición de interfaces y tipos
- **Tipos principales**:
  - `CertificationData`: Estructura completa de una certificación
  - `CreateCertificationRequest`: Datos para crear certificación
  - `CertificationResponse`: Respuesta de la API
  - `CertificationFormData`: Datos del formulario

### 3. Servicio de API
- **Archivo**: `src/services/CertificationService.ts`
- **Propósito**: Lógica de comunicación con la API
- **Métodos**:
  - `createCertification()`: Crear nueva certificación
  - `getBaseUrl()`: Obtener URL base del endpoint

### 4. Hook Personalizado
- **Archivo**: `src/hooks/useCertification.ts`
- **Propósito**: Manejo de estado y operaciones de certificaciones
- **Funcionalidades**:
  - Estado de carga (`isLoading`)
  - Manejo de errores (`error`)
  - Estado de éxito (`success`)
  - Función para crear certificación
  - Función para resetear estado

### 5. Componente de Ejemplo
- **Archivo**: `src/components/certifications/CertificationForm.tsx`
- **Propósito**: Ejemplo de implementación del formulario
- **Características**:
  - Formulario completo con validaciones
  - Integración con el hook `useCertification`
  - Manejo de estados de carga, error y éxito
  - UI responsive con Tailwind CSS

## Uso del Servicio

### Uso Básico del Hook

```typescript
import { useCertification } from '../hooks/useCertification';

const MyComponent = () => {
  const { 
    isLoading, 
    error, 
    success, 
    createCertification, 
    resetState 
  } = useCertification();

  const handleSubmit = async (data: CertificationFormData) => {
    const certificationData = {
      ...data,
      userId: 1, // Obtener del contexto de autenticación
    };
    
    await createCertification(certificationData);
  };

  return (
    // Tu JSX aquí
  );
};
```

### Uso Directo del Servicio

```typescript
import { CertificationService } from '../services/CertificationService';

const createCertification = async () => {
  try {
    const data = {
      certificationType: "ACADEMICA",
      destinationEntity: "Universidad de Colombia",
      settledAmount: 50000,
      consecutiveNumber: "CERT-2024-001",
      userId: 1,
      nationality: "Venezolano"
    };

    const response = await CertificationService.createCertification(data);
    console.log('Certificación creada:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Validaciones Implementadas

### Esquema de Entrada
- `certificationType`: String obligatorio
- `destinationEntity`: String obligatorio
- `settledAmount`: Número obligatorio (≥ 0)
- `consecutiveNumber`: String obligatorio
- `userId`: Número obligatorio
- `nationality`: String obligatorio

### Esquema de Respuesta
- `status`: Número de estado HTTP
- `message`: Mensaje de respuesta
- `data`: Objeto con datos de la certificación creada

## Manejo de Errores

El servicio implementa manejo robusto de errores:

1. **Validación de entrada**: Usando esquemas de Valibot
2. **Validación de respuesta**: Verificación del formato de respuesta
3. **Errores de red**: Captura de errores de Axios
4. **Errores de validación**: Mensajes descriptivos para el usuario

## Estados del Hook

- **`isLoading`**: `true` durante la petición HTTP
- **`error`**: Mensaje de error si algo falla
- **`success`**: `true` si la operación es exitosa
- **`createCertification`**: Función para crear certificación
- **`resetState`**: Función para limpiar estados

## Integración con el Proyecto

La implementación sigue las convenciones del proyecto:

- ✅ **Esquemas de validación**: Usando Valibot como en otros módulos
- ✅ **Servicios**: Patrón de clase estática como `RegistryService`
- ✅ **Hooks personalizados**: Patrón establecido en el proyecto
- ✅ **Tipos TypeScript**: Interfaces bien definidas
- ✅ **Manejo de errores**: Consistente con otros servicios
- ✅ **UI/UX**: Usando Tailwind CSS y React Hook Form

## Próximos Pasos

1. **Integrar con autenticación**: Obtener `userId` del contexto de usuario
2. **Agregar más endpoints**: Listar, actualizar, eliminar certificaciones
3. **Implementar paginación**: Para listas de certificaciones
4. **Agregar filtros**: Por tipo, fecha, estado, etc.
5. **Implementar cache**: Para mejorar el rendimiento

## Notas Técnicas

- **Base URL**: Configurada en `src/configs/axios.ts`
- **Validación**: Usando Valibot para esquemas
- **Estado**: Manejo local con React hooks
- **Error Handling**: Propagación de errores de Axios
- **TypeScript**: Tipos estrictos para mejor mantenibilidad
