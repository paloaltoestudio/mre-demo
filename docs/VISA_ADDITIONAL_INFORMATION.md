# Información Adicional - Módulo de Visas

## Descripción

Se ha implementado una nueva pantalla/paso en el flujo del módulo de visas llamado "Información Adicional". Este paso incluye la sección "Información Complementaria" que se muestra condicionalmente solo para usuarios con nacionalidad venezolana.

## Características Implementadas

### 1. Nueva Pantalla: Información Adicional
- **Ubicación**: Paso 4 del wizard de visas
- **Componente**: `VisaAdditionalInformationForm.tsx`
- **Funcionalidad**: Formulario con validación condicional

### 2. Sección: Información Complementaria
- **Visibilidad**: Solo se muestra si `nacionalidad === "VENEZUELA"`
- **Campos requeridos** (todos con validación obligatoria):
  - ¿Usted tiene o ha tenido Permiso Especial de Permanencia (PEP)?*
  - ¿Usted tiene o ha tenido Permiso por Protección Temporal (PPT)?*
  - ¿Usted tiene o ha tenido Tarjeta de Movilidad Fronteriza (TMF)?*
  - ¿Usted tiene o ha tenido Salvoconducto de Permanencia (SC-2)?*

### 3. Validación Condicional
- **Para usuarios venezolanos**: Se muestran todos los campos de información complementaria
- **Para usuarios no venezolanos**: Se muestra un mensaje informativo indicando que la información solo es requerida para ciudadanos venezolanos

## Estructura Técnica

### Archivos Creados/Modificados

#### Nuevos Archivos
- `src/components/visa/VisaAdditionalInformationForm.tsx` - Componente principal
- `src/types/visa/additionalInformationTypes.ts` - Tipos TypeScript

#### Archivos Modificados
- `src/stores/visaStore.ts` - Agregados nuevos campos y setters
- `src/components/visa/VisaWizard.tsx` - Integrado nuevo paso

### Nuevos Campos en el Store

```typescript
// Información Complementaria
tienePEP: string;
tienePPT: string;
tieneTMF: string;
tieneSC2: string;
setTienePEP: (tienePEP: string) => void;
setTienePPT: (tienePPT: string) => void;
setTieneTMF: (tieneTMF: string) => void;
setTieneSC2: (tieneSC2: string) => void;
```

### Flujo de Navegación

1. **Paso 1**: Datos del documento
2. **Paso 2**: Datos de la solicitud
3. **Paso 3**: Datos del solicitante
4. **Paso 4**: **Información Adicional** ← **NUEVO**
5. **Paso 5**: Información Laboral

## Uso

### Para Usuarios Venezolanos
- Se muestran todos los campos de información complementaria
- Todos los campos son obligatorios
- Se debe seleccionar "Si" o "No" para cada pregunta

### Para Usuarios No Venezolanos
- Se muestra un mensaje informativo
- No se requieren campos adicionales
- Se puede proceder directamente al siguiente paso

## Validaciones

- **Campos requeridos**: Todos los campos de información complementaria son obligatorios para usuarios venezolanos
- **Tipo de respuesta**: Solo se aceptan valores "Si" o "No"
- **Validación condicional**: Los campos solo aparecen para usuarios venezolanos

## Estilos y UI

- **Diseño**: Consistente con el resto de la aplicación
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Labels apropiados y estructura semántica
- **Colores**: Utiliza la paleta de colores estándar de la aplicación

## Persistencia

- Los datos se guardan en el store de Zustand
- Se mantienen durante la sesión del usuario
- Se pueden recuperar al navegar entre pasos

## Consideraciones Técnicas

- **React Hook Form**: Utilizado para manejo de formularios y validaciones
- **TypeScript**: Tipos estrictos para mejor mantenibilidad
- **Zustand**: Estado global persistente
- **Componentes reutilizables**: Estructura modular y mantenible
