# Instrucciones para Frontend - Flujo de Citas como Invitado

## 📋 Resumen del Flujo

El flujo completo para crear una cita como paciente invitado consta de 5 pasos:

1. **Seleccionar Especialidad** → Obtener tipos de servicio
2. **Seleccionar Tipo de Servicio** → Obtener disponibilidades
3. **Seleccionar Disponibilidad** → Mostrar información del dentista
4. **Registrar Datos del Paciente Invitado**
5. **Confirmar y Crear la Cita**

---

## 🔗 Endpoints del Backend

### Base URL
```
http://localhost:3000/api
```

---

## 📝 Paso a Paso - Implementación

### Paso 1: Cargar Especialidades

**Endpoint:** `GET /especialidad`

**Descripción:** Obtener todas las especialidades disponibles para mostrar en un dropdown/selector.

**Ejemplo de uso:**
```javascript
const cargarEspecialidades = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/especialidad');
    const data = await response.json();
    
    if (data.success) {
      // data.data contiene el array de especialidades
      setEspecialidades(data.data);
    } else {
      console.error('Error al cargar especialidades:', data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ortodoncia",
      "description": "Corrección de la posición de los dientes",
      "is_active": true
    },
    {
      "id": 2,
      "name": "Endodoncia",
      "description": "Tratamiento de conductos",
      "is_active": true
    }
  ]
}
```

---

### Paso 2: Cargar Tipos de Servicio por Especialidad

**Endpoint:** `GET /service-type/especialidad/:especialidad_id`

**Descripción:** Cuando el usuario selecciona una especialidad, cargar los tipos de servicio disponibles.

**Ejemplo de uso:**
```javascript
const cargarTiposServicio = async (especialidadId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/service-type/especialidad/${especialidadId}`);
    const data = await response.json();
    
    if (data.success) {
      setTiposServicio(data.data);
    } else {
      console.error('Error al cargar tipos de servicio:', data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Consulta inicial",
      "description": "Primera consulta de evaluación",
      "duration": 30,
      "price": 50000,
      "especialidad_id": 1
    },
    {
      "id": 2,
      "name": "Aplicación de brackets",
      "description": "Instalación de aparatos de ortodoncia",
      "duration": 60,
      "price": 150000,
      "especialidad_id": 1
    }
  ]
}
```

---

### Paso 3: Cargar Disponibilidades por Especialidad

**Endpoint:** `GET /disponibilidad/especialidad/:especialidad_id`

**Descripción:** Obtener todas las disponibilidades (horarios) para la especialidad seleccionada.

**Parámetros opcionales:**
- `?date=YYYY-MM-DD` - Filtrar por fecha específica

**Ejemplo de uso:**
```javascript
const cargarDisponibilidades = async (especialidadId, fecha = null) => {
  try {
    let url = `http://localhost:3000/api/disponibilidad/especialidad/${especialidadId}`;
    if (fecha) {
      url += `?date=${fecha}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success) {
      setDisponibilidades(data.data);
    } else {
      console.error('Error al cargar disponibilidades:', data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "date": "2024-01-15",
      "start_time": "09:00:00",
      "end_time": "10:00:00",
      "dentist": {
        "id": 1,
        "name": "Dr. María González"
      },
      "especialidad": {
        "id": 1,
        "name": "Ortodoncia"
      }
    },
    {
      "id": 6,
      "date": "2024-01-15",
      "start_time": "14:00:00",
      "end_time": "15:00:00",
      "dentist": {
        "id": 2,
        "name": "Dr. Carlos Rodríguez"
      },
      "especialidad": {
        "id": 1,
        "name": "Ortodoncia"
      }
    }
  ]
}
```

---

### Paso 4: Crear Paciente Invitado

**Endpoint:** `POST /guest-patient`

**Descripción:** Registrar los datos del paciente invitado antes de crear la cita.

**Ejemplo de uso:**
```javascript
const crearPacienteInvitado = async (datosPaciente) => {
  try {
    const response = await fetch('http://localhost:3000/api/guest-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: datosPaciente.nombre,
        email: datosPaciente.email,
        phone: datosPaciente.telefono,
        id_number: datosPaciente.identificacion
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Retorna el paciente creado con su ID
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error;
  }
};
```

**Datos requeridos:**
```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@email.com",
  "phone": "3001234567",
  "id_number": "12345678"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@email.com",
    "phone": "3001234567",
    "id_number": "12345678",
    "created_at": "2024-01-10T10:30:00.000Z"
  }
}
```

---

### Paso 5: Crear la Cita

**Endpoint:** `POST /appointment/guest`

**Descripción:** Crear la cita usando el paciente invitado y la disponibilidad seleccionada.

**Ejemplo de uso:**
```javascript
const crearCita = async (datosCita) => {
  try {
    const response = await fetch('http://localhost:3000/api/appointment/guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guest_patient_id: datosCita.pacienteId,
        disponibilidad_id: datosCita.disponibilidadId,
        service_type_id: datosCita.tipoServicioId,
        notes: datosCita.notas || ""
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Retorna la cita creada
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};
```

**Datos requeridos:**
```json
{
  "guest_patient_id": 1,
  "disponibilidad_id": 5,
  "service_type_id": 2,
  "notes": "Dolor en muela posterior derecha"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "guest_patient_id": 1,
    "disponibilidad_id": 5,
    "service_type_id": 2,
    "notes": "Dolor en muela posterior derecha",
    "status": "scheduled",
    "created_at": "2024-01-10T10:35:00.000Z",
    "disponibilidad": {
      "id": 5,
      "date": "2024-01-15",
      "start_time": "09:00:00",
      "end_time": "10:00:00",
      "dentist": {
        "id": 1,
        "name": "Dr. María González"
      }
    },
    "service_type": {
      "id": 2,
      "name": "Aplicación de brackets",
      "duration": 60,
      "price": 150000
    }
  }
}
```

---

## 🎨 Ejemplo de Interfaz de Usuario

### Estructura Sugerida:

```jsx
// Componente principal del flujo
const CitaInvitado = () => {
  const [paso, setPaso] = useState(1);
  const [especialidades, setEspecialidades] = useState([]);
  const [tiposServicio, setTiposServicio] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [datosPaciente, setDatosPaciente] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const handleSiguiente = async () => {
    setLoading(true);
    
    try {
      switch (paso) {
        case 1: // Especialidad seleccionada
          await cargarTiposServicio(selecciones.especialidadId);
          setPaso(2);
          break;
          
        case 2: // Tipo de servicio seleccionado
          await cargarDisponibilidades(selecciones.especialidadId);
          setPaso(3);
          break;
          
        case 3: // Disponibilidad seleccionada
          setPaso(4);
          break;
          
        case 4: // Datos del paciente completados
          const paciente = await crearPacienteInvitado(datosPaciente);
          setSelecciones(prev => ({ ...prev, pacienteId: paciente.id }));
          setPaso(5);
          break;
          
        case 5: // Confirmar y crear cita
          const cita = await crearCita({
            pacienteId: selecciones.pacienteId,
            disponibilidadId: selecciones.disponibilidadId,
            tipoServicioId: selecciones.tipoServicioId,
            notas: datosPaciente.notas
          });
          
          // Mostrar confirmación de cita creada
          alert(`¡Cita creada exitosamente! ID: ${cita.id}`);
          break;
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cita-invitado">
      <div className="pasos">
        <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1. Especialidad</div>
        <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2. Servicio</div>
        <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>3. Horario</div>
        <div className={`paso ${paso >= 4 ? 'activo' : ''}`}>4. Datos</div>
        <div className={`paso ${paso >= 5 ? 'activo' : ''}`}>5. Confirmar</div>
      </div>

      <div className="contenido-paso">
        {paso === 1 && (
          <SelectorEspecialidad 
            especialidades={especialidades}
            onSelect={(id) => setSelecciones(prev => ({ ...prev, especialidadId: id }))}
          />
        )}
        
        {paso === 2 && (
          <SelectorTipoServicio 
            tiposServicio={tiposServicio}
            onSelect={(id) => setSelecciones(prev => ({ ...prev, tipoServicioId: id }))}
          />
        )}
        
        {paso === 3 && (
          <SelectorDisponibilidad 
            disponibilidades={disponibilidades}
            onSelect={(id) => setSelecciones(prev => ({ ...prev, disponibilidadId: id }))}
          />
        )}
        
        {paso === 4 && (
          <FormularioPaciente 
            datos={datosPaciente}
            onChange={setDatosPaciente}
          />
        )}
        
        {paso === 5 && (
          <ConfirmacionCita 
            selecciones={selecciones}
            datosPaciente={datosPaciente}
          />
        )}
      </div>

      <div className="botones">
        {paso > 1 && (
          <button onClick={() => setPaso(paso - 1)} disabled={loading}>
            Anterior
          </button>
        )}
        
        <button onClick={handleSiguiente} disabled={loading}>
          {loading ? 'Cargando...' : paso === 5 ? 'Crear Cita' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};
```

---

## ⚠️ Validaciones Importantes

### Frontend (Validaciones de UI):
- ✅ Campos obligatorios completos
- ✅ Formato de email válido
- ✅ Formato de teléfono válido
- ✅ Formato de identificación válido
- ✅ Selección de especialidad, servicio y disponibilidad

### Backend (Validaciones de Seguridad):
- ✅ Datos del paciente válidos
- ✅ Disponibilidad activa y disponible
- ✅ Tipo de servicio compatible con especialidad
- ✅ Sin conflictos de horarios
- ✅ Dentista activo

---

## 🚨 Manejo de Errores

### Códigos de Error Comunes:

- **400 Bad Request**: Datos inválidos o faltantes
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: Conflicto de horarios
- **500 Internal Server Error**: Error del servidor

### Ejemplo de manejo:
```javascript
const manejarError = (error) => {
  if (error.status === 400) {
    alert('Por favor, verifica los datos ingresados');
  } else if (error.status === 409) {
    alert('Este horario ya no está disponible. Por favor selecciona otro.');
  } else {
    alert('Error del servidor. Intenta nuevamente.');
  }
};
```

---

## 📱 Consideraciones de UX

1. **Indicador de progreso**: Mostrar en qué paso está el usuario
2. **Validación en tiempo real**: Validar campos mientras el usuario escribe
3. **Loading states**: Mostrar indicadores de carga
4. **Confirmación**: Mostrar resumen antes de crear la cita
5. **Navegación**: Permitir volver a pasos anteriores
6. **Responsive**: Adaptar a diferentes tamaños de pantalla

---

## 🔧 Configuración del Backend

Asegúrate de que el backend esté corriendo en:
```
http://localhost:3000
```

Y que todos los endpoints estén disponibles en:
```
http://localhost:3000/api/
```

---

## ✅ Checklist de Implementación

- [ ] Cargar especialidades al iniciar
- [ ] Implementar selector de especialidad
- [ ] Cargar tipos de servicio al seleccionar especialidad
- [ ] Implementar selector de tipo de servicio
- [ ] Cargar disponibilidades al seleccionar tipo de servicio
- [ ] Implementar selector de disponibilidad
- [ ] Crear formulario de datos del paciente
- [ ] Implementar validaciones de formulario
- [ ] Crear pantalla de confirmación
- [ ] Implementar creación de paciente invitado
- [ ] Implementar creación de cita
- [ ] Manejar errores y estados de carga
- [ ] Implementar navegación entre pasos
- [ ] Probar flujo completo

---

¡Con estas instrucciones tienes todo lo necesario para implementar el flujo completo de citas como invitado en tu frontend! 🚀 