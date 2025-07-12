# 🦷 Clínica Dental Sonrisa Perfecta - Frontend

Una aplicación web moderna y profesional para una clínica odontológica, desarrollada con React, Vite y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Páginas Implementadas](#-páginas-implementadas)
- [Componentes Principales](#-componentes-principales)
- [Sistema de Autenticación](#-sistema-de-autenticación)
- [Integración con Backend](#-integración-con-backend)
- [Estilos y Diseño](#-estilos-y-diseño)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura de Datos](#-estructura-de-datos)

## ✨ Características

### 🎨 **Diseño y UX**
- **Diseño responsive** optimizado para móvil y desktop
- **Animaciones suaves** con Framer Motion
- **Scrollbar personalizado** con colores de la marca
- **Sistema de alertas** profesional
- **Gradientes y efectos** visuales modernos

### 🔐 **Sistema de Autenticación**
- Registro de usuarios con validación
- Login con manejo de tokens
- Activación de cuenta por email
- Recuperación de contraseña
- Rutas protegidas por roles

### 📱 **Páginas Implementadas**
- **Home:** Landing page con hero section y servicios
- **Servicios:** Catálogo completo de tratamientos odontológicos
- **Contacto:** Formulario funcional conectado al backend
- **Acerca de:** Información de la clínica y equipo médico
- **Dashboards:** Paneles específicos por rol de usuario

### 🛠️ **Funcionalidades Avanzadas**
- **Rate limiting** en formularios
- **Validaciones** frontend y backend
- **Lazy loading** para optimización
- **Manejo de errores** robusto
- **Estados de carga** con spinners

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **React Router** - Navegación
- **Axios** - Cliente HTTP

### **UI/UX**
- **Heroicons** - Iconografía
- **CSS Variables** - Sistema de colores
- **Responsive Design** - Mobile-first
- **Custom Scrollbar** - Scrollbar personalizado

### **Estado y Datos**
- **Context API** - Estado global
- **Local Storage** - Persistencia de tokens
- **Form Validation** - Validaciones de formularios

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Formularios de autenticación
│   ├── forms/          # Componentes de formularios
│   ├── layout/         # Layout principal y navbar
│   ├── ui/             # Componentes de UI base
│   └── home/           # Componentes específicos del home
├── pages/              # Páginas de la aplicación
│   ├── dashboards/     # Paneles de control
│   ├── auth/           # Páginas de autenticación
│   └── ...             # Otras páginas
├── services/           # Servicios de API
├── context/            # Contextos de React
├── hooks/              # Custom hooks
├── utils/              # Utilidades
└── styles/             # Estilos globales
```

## 🚀 Instalación

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### **Pasos de Instalación**

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPO]
cd my-frondend-odontologic

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# 4. Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Configuración

### **Variables de Entorno (.env)**

```env
# Configuración del Backend
VITE_API_BASE_URL=http://localhost:3000/api

# Notas:
# - Cambia la URL según donde esté corriendo tu backend
# - Para desarrollo local: http://localhost:3000/api
# - Para producción: https://api.tudominio.com/api
```

### **Configuración del Backend**

El frontend está preparado para conectarse con un backend que incluya:

- **Endpoint de contacto:** `POST /api/contact/send-message`
- **Sistema de autenticación:** JWT tokens
- **Rate limiting:** 3 mensajes por hora por IP
- **Validaciones:** Frontend y backend

## 📄 Páginas Implementadas

### **🏠 Home (`/`)**
- Hero section con call-to-action
- Sección de servicios destacados
- Carrusel de testimonios
- Información de la clínica
- **Componentes:** HeroSection, ClinicCarouselSection, FeaturedServicesSection

### **🦷 Servicios (`/services`)**
- Catálogo completo de tratamientos
- Categorías organizadas (General, Estética, Ortodoncia, Especializada)
- Información detallada de cada servicio
- Precios y duraciones
- **Datos:** 16 servicios odontológicos diferentes

### **📞 Contacto (`/contact`)**
- Formulario funcional conectado al backend
- Información de la clínica (dirección, teléfonos, horarios)
- Equipo médico con especialidades
- Sistema de alertas para respuestas
- **Integración:** Backend con rate limiting y emails

### **ℹ️ Acerca de (`/about`)**
- Historia y misión de la clínica
- Equipo médico con especialidades
- Valores corporativos
- Logros y certificaciones
- **Contenido:** Datos ficticios pero realistas

### **🔐 Autenticación**
- **Registro:** `/register` - Formulario de registro
- **Login:** `/login` - Inicio de sesión
- **Activación:** `/activate-account` - Activación por email
- **Reset Password:** `/solicitar-reset` - Recuperación de contraseña

### **📊 Dashboards (Protegidos)**
- **Paciente:** `/patient-dashboard` - Panel de paciente
- **Dentista:** `/dentist-dashboard` - Panel de dentista
- **Admin:** `/admin-dashboard` - Panel de administrador

## 🧩 Componentes Principales

### **Layout y Navegación**
- **MainLayout:** Layout principal con navbar y footer
- **Navbar:** Navegación responsive con menú móvil
- **ProtectedRoute:** Rutas protegidas por roles

### **Formularios**
- **Form:** Componente base para formularios
- **FormField:** Campo de formulario con validación
- **ContactForm:** Formulario de contacto específico
- **Auth Forms:** Formularios de autenticación

### **UI Components**
- **Alert:** Sistema de alertas con tipos (success, error, warning, info)
- **Button:** Botones con variantes y estados
- **Input:** Campos de entrada con validación
- **LoadingSpinner:** Indicadores de carga
- **Card:** Componentes de tarjetas

### **Páginas Específicas**
- **Home Components:** HeroSection, ClinicCarouselSection, etc.
- **Services Components:** Categorías y cards de servicios
- **Contact Components:** Formulario e información de contacto

## 🔐 Sistema de Autenticación

### **Roles Implementados**
- **`user`:** Pacientes - Acceso a dashboard de paciente
- **`dentist`:** Dentistas - Acceso a dashboard de dentista  
- **`admin`:** Administradores - Acceso completo

### **Flujo de Autenticación**
1. **Registro:** Usuario se registra → Email de activación
2. **Activación:** Usuario activa cuenta → Puede hacer login
3. **Login:** Usuario inicia sesión → Redirigido a dashboard según rol
4. **Protección:** Rutas protegidas verifican rol y token

### **Context y Estado**
- **AuthContext:** Maneja estado global de autenticación
- **useAuth:** Hook personalizado para acceder al contexto
- **Token Management:** Almacenamiento seguro en localStorage

## 🔗 Integración con Backend

### **Servicios Implementados**
- **authService:** Login, registro, activación, reset password
- **contactService:** Envío de formulario de contacto
- **userService:** Gestión de perfiles de usuario
- **appointmentService:** Gestión de citas

### **Configuración de Axios**
- **Base URL:** Configurable desde variables de entorno
- **Interceptors:** Manejo automático de tokens
- **Error Handling:** Manejo centralizado de errores
- **Refresh Tokens:** Renovación automática de tokens

### **Endpoints Conectados**
- `POST /api/contact/send-message` - Formulario de contacto
- `POST /api/auth/login` - Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/activate` - Activación de cuenta

## 🎨 Estilos y Diseño

### **Sistema de Colores**
```css
:root {
  --color-primary: #009688;         /* Verde azulado */
  --color-primary-darker: #004D40;  /* Verde oscuro */
  --color-secondary: #B2DFDB;       /* Verde agua claro */
  --color-accent: #00B8D4;          /* Celeste acento */
  --color-background-light: #F5F5F5;/* Gris muy claro */
  --color-text-dark: #004D40;       /* Gris azulado oscuro */
  --color-success: #4caf50;         /* Verde éxito */
  --color-error: #e53935;           /* Rojo error */
}
```

### **Scrollbar Personalizado**
- **Colores:** Gradiente del primario al accent
- **Efectos:** Hover con escala y cambio de color
- **Compatibilidad:** Chrome/Safari y Firefox
- **Scroll suave:** `scroll-behavior: smooth`

### **Animaciones**
- **Framer Motion:** Transiciones suaves
- **Hover Effects:** Elevación de cards
- **Loading States:** Spinners y estados de carga
- **Stagger Animations:** Elementos aparecen secuencialmente

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Linting
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de linting automáticamente
```

## 📊 Estructura de Datos

### **Datos de la Clínica (Ficticios)**
```javascript
{
  name: "Clínica Dental Sonrisa Perfecta",
  founded: "2010",
  experience: "14 años",
  patients: "15,000+",
  address: "Calle 123 #45-67, Barrio Centro, Bogotá",
  phone: "+57 (1) 234-5678",
  email: "contacto@sonrisaperfecta.com"
}
```

### **Servicios Odontológicos**
- **Odontología General:** Limpieza, diagnóstico, caries, extracciones
- **Estética Dental:** Blanqueamiento, carillas, diseño de sonrisa
- **Ortodoncia:** Brackets metálicos, estéticos, Invisalign
- **Especialidades:** Endodoncia, periodoncia, cirugía, implantes

### **Equipo Médico**
- **4 especialistas** con diferentes especialidades
- **Experiencia:** 12-20 años cada uno
- **Educación:** Universidades prestigiosas de Colombia

## 🚀 Próximos Pasos

### **Funcionalidades Pendientes**
- [ ] Sistema de citas completo
- [ ] Panel de administración avanzado
- [ ] Galería de casos clínicos
- [ ] Blog de salud dental
- [ ] Sistema de pagos
- [ ] Chat en vivo

### **Mejoras Técnicas**
- [ ] Tests unitarios
- [ ] Optimización de performance
- [ ] PWA (Progressive Web App)
- [ ] SEO optimization
- [ ] Analytics integration

## 🤝 Contribución

### **Para Desarrolladores**
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

### **Estándares de Código**
- **ESLint:** Configurado con reglas estrictas
- **Prettier:** Formateo automático de código
- **Conventional Commits:** Estándar para mensajes de commit
- **Component Structure:** Organización clara de componentes

## 📞 Soporte

### **Contacto del Equipo**
- **Desarrollador:** [Tu nombre]
- **Email:** [tu-email@dominio.com]
- **Proyecto:** Clínica Dental Sonrisa Perfecta

### **Documentación Adicional**
- **Backend API:** [URL de la documentación del backend]
- **Diseño:** [URL de Figma/Design System]
- **Deployment:** [URL de producción]

---

**🎉 ¡La aplicación está lista para producción!**

Con todas las funcionalidades implementadas, diseño profesional y experiencia de usuario optimizada, esta aplicación web odontológica está preparada para ser desplegada y utilizada por pacientes y personal de la clínica.
