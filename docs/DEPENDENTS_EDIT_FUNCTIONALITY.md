# Funcionalidad de Edición de Citas con Dependientes

## Descripción
Esta funcionalidad permite editar una cita previamente creada para agregar los datos de dependientes durante el flujo de agendamiento.

## Archivos Creados/Modificados

### 1. Schema de Validación
**Archivo:** `src/schemas/appointments/editAppointment.schema.ts`
- Define la estructura de datos para la petición de edición de cita
- Incluye validación para `appointmentId` y array de `dependents`
- Define el schema de respuesta esperado

### 2. Tipos TypeScript
**Archivo:** `src/types/dashboard/editAppointmentTypes.ts`
- Define los tipos `DependentData`, `EditAppointmentRequest` y `EditAppointmentResponse`
- Proporciona tipado fuerte para la funcionalidad

### 3. Hook Personalizado
**Archivo:** `src/hooks/useEditAppointment.ts`
- Hook que maneja la mutación para editar citas
- Incluye manejo de éxito y errores con notificaciones toast
- Utiliza React Query para el manejo de estado

### 4. Componente Modificado
**Archivo:** `src/components/scheduling/DependentInformationForm.tsx`
- Integra la funcionalidad de edición de citas
- Recopila datos de dependientes del formulario
- Llama al API para editar la cita antes de continuar al siguiente paso

## Flujo de Funcionamiento

1. **Creación de Pre-Cita**: En el paso de selección de fecha (`SelectDateForm.tsx`), se crea una pre-cita sin dependientes
2. **Almacenamiento del ID**: El `preAppointmentId` se almacena en `bookingTimerStore`
3. **Formulario de Dependientes**: El usuario llena los datos de dependientes en `DependentInformationForm.tsx`
4. **Edición de Cita**: Al hacer clic en "Continuar", se recopilan los datos y se llama al API para editar la cita
5. **Continuación del Flujo**: Si la edición es exitosa, se continúa al siguiente paso (Summary)

## API Endpoint
- **URL:** `PUT /api/api/Cita/editar-cita`
- **Parámetros de entrada:**
```json
{
  "appointmentId": 0,
  "dependents": [
    {
      "relationshipTypeId": 0,
      "documentTypeId": 0,
      "documentNumber": "string",
      "firstNames": "string",
      "lastNames": "string"
    }
  ]
}
```

## Manejo de Errores
- Validación de datos antes del envío
- Notificaciones toast para éxito y error
- Logs en consola para debugging
- Manejo de errores de red y validación

## Consideraciones Técnicas
- Utiliza el `preAppointmentId` almacenado en el store
- Recopila datos dinámicamente basado en el número de dependientes
- Mantiene la consistencia con el flujo existente
- Integra con el sistema de notificaciones existente 