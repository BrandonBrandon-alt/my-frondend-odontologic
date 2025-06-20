# Estructura de Componentes

Esta carpeta contiene todos los componentes de la aplicación organizados por categorías.

## 📁 Estructura

```
src/components/
├── ui/                    # Componentes de UI básicos
│   ├── Button/           # Botones reutilizables
│   ├── Input/            # Campos de entrada
│   ├── Alert/            # Alertas y notificaciones
│   ├── LoadingSpinner/   # Indicadores de carga
│   └── index.js          # Exportaciones de UI
├── forms/                # Componentes de formularios
│   ├── Form/             # Contenedor de formularios
│   ├── FormField/        # Campos de formulario con validación
│   └── index.js          # Exportaciones de formularios
├── layout/               # Componentes de layout
│   ├── Navbar/           # Barra de navegación
│   └── index.js          # Exportaciones de layout
├── features/             # Componentes específicos del dominio
│   ├── Card/             # Tarjetas de información
│   └── index.js          # Exportaciones de features
├── layouts/              # Componentes legacy (mantener compatibilidad)
│   └── ProtectedRoute.jsx
├── index.js              # Exportaciones principales
└── README.md             # Esta documentación
```

## 🎯 Categorías

### UI Components (`/ui`)
Componentes básicos de interfaz de usuario reutilizables:

- **Button**: Botones con múltiples variantes (primary, secondary, outline, ghost)
- **Input**: Campos de entrada con soporte para iconos y validación
- **Alert**: Alertas con diferentes tipos (success, error, warning, info)
- **LoadingSpinner**: Indicadores de carga personalizables

### Form Components (`/forms`)
Componentes especializados para formularios:

- **Form**: Contenedor de formularios con manejo de estado
- **FormField**: Campos de formulario con validación integrada

### Layout Components (`/layout`)
Componentes de estructura y navegación:

- **Navbar**: Barra de navegación principal
- **ProtectedRoute**: Rutas protegidas por autenticación

### Feature Components (`/features`)
Componentes específicos del dominio de la aplicación:

- **Card**: Tarjetas para mostrar información

## 📖 Uso

### Importación

```javascript
// Importar componentes específicos
import { Button, Input, Alert } from './components/ui';
import { Form, FormField } from './components/forms';
import { Navbar } from './components/layout';
import { Card } from './components/features';

// O importar todo desde el índice principal
import { Button, Input, Form, Navbar, Card } from './components';
```

### Ejemplos de Uso

#### Button
```javascript
<Button variant="primary" size="md" loading={isLoading}>
  Guardar Cambios
</Button>
```

#### Input
```javascript
<Input
  label="Email"
  name="email"
  type="email"
  error={errors.email}
  startIcon={<EnvelopeIcon className="h-5 w-5" />}
  required
/>
```

#### Alert
```javascript
<Alert
  type="success"
  title="¡Éxito!"
  message="Los cambios se guardaron correctamente"
  dismissible
  onDismiss={() => setShowAlert(false)}
/>
```

#### Form
```javascript
<Form onSubmit={handleSubmit} loading={isSubmitting}>
  <FormField
    label="Nombre"
    name="name"
    error={errors.name}
    required
  />
  <Button type="submit" fullWidth>
    Enviar
  </Button>
</Form>
```

#### Card
```javascript
<Card
  title="Información del Paciente"
  subtitle="Datos personales"
  icon={<UserIcon className="h-6 w-6" />}
  variant="elevated"
>
  <p>Contenido de la tarjeta...</p>
</Card>
```

## 🔧 Convenciones

1. **Nomenclatura**: Usar PascalCase para nombres de componentes
2. **Archivos**: Un componente por carpeta con `index.jsx`
3. **Exportaciones**: Usar archivos `index.js` para exportaciones
4. **Documentación**: Incluir JSDoc en todos los componentes
5. **Props**: Usar destructuring y valores por defecto
6. **Estilos**: Usar Tailwind CSS con clases condicionales

## 🚀 Próximos Pasos

1. Migrar componentes legacy a la nueva estructura
2. Agregar más componentes UI (Modal, Dropdown, etc.)
3. Implementar sistema de temas
4. Agregar Storybook para documentación visual
5. Crear tests unitarios para cada componente 