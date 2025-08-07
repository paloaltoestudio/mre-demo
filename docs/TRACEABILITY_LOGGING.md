# Sistema de Logs de Trazabilidad - Módulo de Agendamiento

## Descripción
Sistema de registro de logs para rastrear las acciones del usuario en el módulo de agendamiento de citas. Los logs se registran únicamente cuando el usuario continúa al siguiente paso, cancela el proceso, o cuando se agota el timeout.

## Archivos Creados

### 1. Schema de Validación
**Archivo:** `src/schemas/traceability/traceability.schema.ts`
- Define la estructura de datos para los logs de trazabilidad
- Incluye validación para todos los campos requeridos del API

### 2. Tipos TypeScript
**Archivo:** `src/types/traceability/traceabilityTypes.ts`
- Define los tipos `CreateTraceabilityLogRequest`, `TraceabilityLogResponse` y `TraceabilityEvent`
- Proporciona tipado fuerte para la funcionalidad

### 3. Hook Personalizado
**Archivo:** `src/hooks/useTraceabilityLog.ts`
- Hook que maneja la mutación para crear logs de trazabilidad
- Incluye función para obtener la IP del usuario
- Manejo de errores sin mostrar notificaciones al usuario

## Archivos Modificados

### 1. SelectAppointmentForm.tsx
- **Logs implementados:**
  - Continuar al siguiente paso (incluye selección de país, ciudad y oficina)

### 2. AppointmentForForm.tsx
- **Logs implementados:**
  - Continuar al siguiente paso (incluye selección de tipo de cita, trámite y dependientes)

### 3. SelectDateForm.tsx
- **Logs implementados:**
  - Continuar al siguiente paso (incluye selección de fecha y hora)

### 4. Summary.tsx
- **Logs implementados:**
  - Confirmación de cita (evento final)

### 5. CancelBtn.tsx
- **Logs implementados:**
  - Cancelación del proceso por el usuario
  - Error en la cancelación

### 6. BookingTimerExpirationHandler.tsx
- **Logs implementados:**
  - Timeout expirado automáticamente
  - Error en el manejo del timeout

## Eventos Registrados

### SelectAppointmentForm
1. **`continuar_seleccion_lugar`** - Cuando el usuario continúa después de seleccionar país, ciudad y oficina

### AppointmentForForm
1. **`continuar_seleccion_tipo`** - Cuando el usuario continúa después de seleccionar tipo de cita, trámite y dependientes

### SelectDateForm
1. **`continuar_seleccion_fecha`** - Cuando el usuario continúa después de seleccionar fecha y hora

### Summary
1. **`confirmacion_cita`** - Cuando el usuario confirma y agenda la cita (evento final)

### CancelBtn
1. **`cancelacion_proceso`** - Cuando el usuario cancela el proceso de agendamiento
2. **`error_cancelacion`** - Cuando hay un error al cancelar el proceso

### BookingTimerExpirationHandler
1. **`timeout_expirado`** - Cuando se agota el tiempo de reserva automáticamente
2. **`error_timeout`** - Cuando hay un error al manejar el timeout

## Estructura del Payload

```json
{
  "procedure": "agendamiento",
  "user": "id_del_usuario",
  "timestamp": "2025-08-07T16:16:28.606Z",
  "modifiedFields": "JSON con campos modificados",
  "procedureStatus": "estado_del_procedimiento",
  "observations": "observaciones_del_evento",
  "ip": "ip_del_usuario"
}
```

## API Endpoint
- **URL:** `POST /Traceability/CreateTraceabilityLog`
- **Método:** POST
- **Headers:** Content-Type: application/json

## Características Técnicas

### Obtención de IP
- Utiliza el servicio `https://api.ipify.org?format=json`
- Fallback a "unknown" si hay error

### Manejo de Errores
- Los errores se registran en consola pero no se muestran al usuario
- No interrumpe el flujo normal de la aplicación

### Datos Capturados
- **Usuario:** ID del usuario desde SessionStore
- **Timestamp:** Fecha y hora exacta del evento
- **IP:** Dirección IP del usuario
- **Campos modificados:** JSON con los datos relevantes del evento
- **Observaciones:** Descripción legible del evento

## Ejemplos de Logs

### Continuar Selección de Lugar
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "continuar_seleccion_lugar",
  "modifiedFields": {
    "selectedOffice": {
      "id": 123,
      "name": "Consulado de Colombia en Madrid",
      "address": "Calle de la Princesa, 1"
    },
    "selectedCity": "2",
    "selectedCountry": "1",
    "countryName": "Colombia",
    "cityName": "Madrid"
  },
  "observations": "Usuario continuó después de seleccionar oficina: Consulado de Colombia en Madrid"
}
```

### Continuar Selección de Fecha
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "continuar_seleccion_fecha",
  "modifiedFields": {
    "selectedDate": 12345,
    "selectedProcedure": {
      "id": 1,
      "name": "Pasaporte"
    },
    "selectedOption": "Para mí y mis dependientes",
    "dependentsCount": 2,
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "preAppointmentId": 67890
  },
  "observations": "Usuario continuó después de seleccionar fecha/hora para Pasaporte en Consulado de Colombia en Madrid"
}
```

### Cancelación del Proceso
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "cancelacion_proceso",
  "modifiedFields": {
    "preAppointmentId": 67890,
    "action": "user_cancellation"
  },
  "observations": "Usuario canceló el proceso de agendamiento"
}
```

### Timeout Expirado
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "timeout_expirado",
  "modifiedFields": {
    "preAppointmentId": 67890,
    "timeLeft": 0,
    "action": "timeout_expiration"
  },
  "observations": "El tiempo de reserva ha caducado automáticamente"
}
```

### Confirmación de Cita
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "confirmacion_cita",
  "modifiedFields": {
    "appointmentDate": "2025-01-15T10:00:00.000Z",
    "selectedProcedure": {
      "id": 1,
      "name": "Pasaporte"
    },
    "selectedOption": "Para mí y mis dependientes",
    "dependentsCount": 2,
    "dependentsInfo": [...],
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "officeAddress": "Calle de la Princesa, 1",
    "countryId": "1",
    "countryName": "Colombia",
    "cityId": "2",
    "cityName": "Madrid",
    "userInfo": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "documentNumber": "12345678"
    }
  },
  "observations": "Usuario confirmó cita para Pasaporte en Consulado de Colombia en Madrid el 15/1/2025"
}
```

## Consideraciones de Implementación

1. **No intrusivo:** Los logs no afectan la experiencia del usuario
2. **Asíncrono:** Las llamadas al API son asíncronas y no bloquean la UI
3. **Robusto:** Manejo de errores sin interrumpir el flujo
4. **Extensible:** Fácil agregar nuevos eventos en otros componentes
5. **Tipado:** Uso completo de TypeScript para seguridad de tipos
6. **Completo:** Cubre todo el flujo desde la selección inicial hasta la confirmación final
7. **Optimizado:** Solo registra logs en momentos clave (continuar al siguiente paso)
8. **Trazabilidad completa:** Incluye cancelaciones y timeouts para auditoría completa

## Flujo Completo de Logs

1. **Selección de lugar** → `continuar_seleccion_lugar`
2. **Selección de tipo y trámite** → `continuar_seleccion_tipo`
3. **Selección de fecha** → `continuar_seleccion_fecha`
4. **Datos de dependientes** → (se registra en el paso de confirmación)
5. **Confirmación final** → `confirmacion_cita`

## Eventos de Interrupción

- **Cancelación manual** → `cancelacion_proceso`
- **Timeout automático** → `timeout_expirado`
- **Errores** → `error_cancelacion`, `error_timeout`

## Próximos Pasos

Para completar la implementación en todo el módulo de agendamiento, se pueden agregar logs en:

1. **DependentInformationForm.tsx** - Formulario de dependientes
2. **Otros componentes** - Regreso entre pasos, etc. 