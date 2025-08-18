# Funcionalidad de Detalle de Citas

## Descripción

Se ha implementado una nueva funcionalidad que permite ver el detalle completo de cada cita individual. Esta funcionalidad incluye:

- Una página dedicada para mostrar toda la información de una cita específica
- Acceso directo desde la lista de citas mediante un botón "Ver Detalle"
- URL única para cada cita con el formato `/dashboard/appointments/:id`
- Todas las acciones disponibles según el estado de la cita (reagendar, cancelar, archivar)

## Componentes Creados

### 1. AppointmentDetail.tsx
Componente principal que renderiza el detalle de la cita. Incluye:
- Información completa de la cita
- Datos del usuario y solicitantes
- Lista de requisitos (expandible/colapsable)
- Botones de acción según el estado de la cita
- Modales para reagendar y cancelar

### 2. AppointmentDetailView.tsx
Vista que envuelve el componente de detalle.

### 3. useAppointmentDetail.ts
Hook personalizado que sigue el patrón estándar del proyecto usando `usePublicQuery` con validación de schema y manejo de errores consistente.

## Rutas

Se ha agregado una nueva ruta al router principal:
```tsx
<Route
  path="/dashboard/appointments/:id"
  element={<AppointmentDetailView />}
/>
```

## Navegación

### Desde la lista de citas
Cada tarjeta de cita ahora incluye un botón "Ver Detalle" que navega a la página específica:
```tsx
<button
  type="button"
  onClick={() => navigate(`/dashboard/appointments/${appt.appointmentId}`)}
  className="text-blue-600 text-sm py-[3px] px-3 border border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-lg min-w-[100px] duration-150 transition-colors"
>
  Ver Detalle
</button>
```

### Navegación de regreso
La página de detalle incluye un botón "Volver a citas" que regresa a la lista principal.

## Estados y Acciones

### Cita Agendada
- **Cancelar Cita**: Abre modal de cancelación
- **Reagendar**: Abre modal de reagendamiento

### Cita Cancelada
- **Archivar**: Permite archivar la cita

### Cita Atendida
- **Eliminar**: Permite eliminar la cita

### Cita Pendiente
- **Reagendar**: Abre modal de reagendamiento

## Características Técnicas

### Gestión de Estado
- Uso del hook estándar `usePublicQuery` del proyecto
- Validación de datos con schemas de Valibot
- Axios configurado con la baseURL del proyecto
- Manejo de estados de carga y error consistente
- Validación de parámetros de URL

### Responsive Design
- Diseño adaptativo para diferentes tamaños de pantalla
- Grid layout que se ajusta automáticamente
- Componentes que se adaptan al espacio disponible

### Accesibilidad
- Botones con estados hover claros
- Iconos descriptivos para cada acción
- Navegación por teclado

## Uso

1. **Acceso**: Desde la lista de citas, hacer clic en "Ver Detalle"
2. **Navegación**: La URL se actualiza automáticamente con el ID de la cita
3. **Acciones**: Usar los botones disponibles según el estado de la cita
4. **Regreso**: Usar el botón "Volver a citas" para regresar a la lista

## Consideraciones de Implementación

### API Endpoint
El hook `useAppointmentDetail` usa el patrón estándar del proyecto y espera un endpoint en:
```
GET /appointments/:id
```

**Configuración:**
- Base URL: `import.meta.env.VITE_API_URL` (configurada en axios.ts)
- Cliente: `axiosInstance` del proyecto
- Validación: `AppointmentSchema` de Valibot
- Manejo de errores: Integrado con `usePublicQuery`

### Manejo de Errores
- Errores de red se muestran como toast notifications
- Estados de error se manejan graciosamente
- Redirección automática en caso de errores críticos

### Performance
- React Query maneja el caching automáticamente
- Validación de datos con schemas optimizados
- Axios con configuración estándar del proyecto
- Tiempo de vida de datos configurado a 5 minutos
- Reintentos automáticos en caso de fallo

## Próximos Pasos

1. **Implementar endpoint real**: Conectar con la API backend
2. **Testing**: Agregar tests unitarios y de integración
3. **Analytics**: Agregar tracking de eventos para análisis
4. **Optimizaciones**: Implementar lazy loading si es necesario
