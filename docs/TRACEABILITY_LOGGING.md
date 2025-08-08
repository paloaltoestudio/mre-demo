# Sistema de Logs de Trazabilidad - Módulo de Agendamiento

## Descripción
Sistema de registro de logs para rastrear las acciones del usuario en el módulo de agendamiento de citas. Los logs se registran únicamente cuando el usuario continúa al siguiente paso, cancela el proceso, reagenda citas, cancela citas existentes, archiva citas, o cuando se agota el timeout.

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

### 7. ReschedulingForm.tsx
- **Logs implementados:**
  - Reagendamiento exitoso
  - Error en el reagendamiento

### 8. ReschedulingResume.tsx
- **Logs implementados:**
  - Reagendamiento exitoso desde resumen
  - Error en el reagendamiento desde resumen

### 9. Appointments.tsx
- **Logs implementados:**
  - Archivado exitoso de citas
  - Error en el archivado

### 10. VerificationViews.tsx
- **Logs implementados:**
  - Cancelación exitosa de citas
  - Error en la cancelación

## Eventos Registrados

### SelectAppointmentForm
1. **`continuar_seleccion_lugar`** - Cuando el usuario continúa después de seleccionar país, ciudad y oficina

### AppointmentForForm
2. **`continuar_seleccion_tipo`** - Cuando el usuario continúa después de seleccionar tipo de cita, trámite y dependientes

### SelectDateForm
3. **`continuar_seleccion_fecha`** - Cuando el usuario continúa después de seleccionar fecha y hora

### Summary
4. **`confirmacion_cita`** - Cuando el usuario confirma la cita (evento final)

### CancelBtn
5. **`cancelacion_proceso`** - Cuando el usuario cancela el proceso de agendamiento
6. **`error_cancelacion`** - Error al cancelar el proceso

### BookingTimerExpirationHandler
7. **`timeout_expirado`** - Cuando se agota el timeout automáticamente
8. **`error_timeout`** - Error al manejar el timeout

### ReschedulingForm
9. **`reagendamiento_exitoso`** - Cuando se reagenda exitosamente una cita
10. **`error_reagendamiento`** - Error al reagendar una cita

### ReschedulingResume
11. **`reagendamiento_exitoso_resumen`** - Cuando se reagenda exitosamente desde el resumen
12. **`error_reagendamiento_resumen`** - Error al reagendar desde el resumen

### Appointments
13. **`archivado_exitoso`** - Cuando se archiva exitosamente una cita
14. **`error_archivado`** - Error al archivar una cita

### VerificationViews
15. **`cancelacion_exitosa`** - Cuando se cancela exitosamente una cita
16. **`error_cancelacion`** - Error al cancelar una cita

## Estructura del Payload

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
    "appointmentDate": "2025-08-08T14:00:00.000Z",
    "appointmentDateLocal": "2025-08-08 14:00",
    "selectedProcedure": {
      "id": 1,
      "name": "Pasaporte"
    },
    "selectedOption": "Para mí y mis dependientes",
    "dependentsCount": 2,
    "dependentsInfo": [
      {
        "names": "Juan",
        "lastNames": "Pérez",
        "document": "12345678",
        "typeDocument": "CC"
      }
    ],
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "officeAddress": "Calle de la Princesa, 1",
    "countryId": 1,
    "countryName": "Colombia",
    "cityId": 2,
    "cityName": "Madrid",
    "userInfo": {
      "firstName": "Luis",
      "lastName": "Díaz",
      "documentNumber": "987654321"
    }
  },
  "observations": "Usuario confirmó cita para Pasaporte en Consulado de Colombia en Madrid el 08/08/2025 a las 14:00"
}
```

### Reagendamiento Exitoso
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "reagendamiento_exitoso",
  "modifiedFields": {
    "appointmentOldId": 12345,
    "availabilityBlockId": 67890,
    "oldDate": "2025-08-08",
    "oldTime": "14:00",
    "newDate": "2025-08-09",
    "newTime": "15:00",
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "procedureId": 1,
    "procedureName": "Pasaporte",
    "userInfo": {
      "firstName": "Luis",
      "lastName": "Díaz",
      "documentNumber": "987654321"
    }
  },
  "observations": "Usuario reagendó cita 12345 de 2025-08-08 14:00 a nueva fecha/hora"
}
```

### Cancelación Exitosa
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "cancelacion_exitosa",
  "modifiedFields": {
    "appointmentId": 12345,
    "appointmentStatus": "Agendada",
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "procedureId": 1,
    "procedureName": "Pasaporte",
    "userInfo": {
      "firstName": "Luis",
      "lastName": "Díaz",
      "documentNumber": "987654321"
    }
  },
  "observations": "Usuario canceló cita 12345 con estado Agendada"
}
```

### Archivado Exitoso
```json
{
  "procedure": "agendamiento",
  "procedureStatus": "archivado_exitoso",
  "modifiedFields": {
    "appointmentId": 12345,
    "appointmentStatus": "Cancelada",
    "officeId": 123,
    "officeName": "Consulado de Colombia en Madrid",
    "procedureId": 1,
    "procedureName": "Pasaporte",
    "userInfo": {
      "firstName": "Luis",
      "lastName": "Díaz",
      "documentNumber": "987654321"
    }
  },
  "observations": "Usuario archivó cita 12345 con estado Cancelada"
}
```

## Beneficios del Sistema

1. **Trazabilidad Completa**: Registro de todas las acciones importantes del usuario
2. **Auditoría**: Facilita la auditoría de procesos y decisiones
3. **Debugging**: Ayuda a identificar problemas y errores
4. **Análisis**: Permite análisis de comportamiento del usuario
5. **Cumplimiento**: Cumple con requisitos de trazabilidad
6. **Mantenimiento**: Facilita el mantenimiento y soporte

## Consideraciones Técnicas

- Los logs se envían de forma asíncrona sin bloquear la UI
- Los errores en el logging no afectan la funcionalidad principal
- Se incluye información contextual relevante en cada log
- Los logs incluyen timestamps y IP del usuario
- Se mantiene la privacidad del usuario en los logs 