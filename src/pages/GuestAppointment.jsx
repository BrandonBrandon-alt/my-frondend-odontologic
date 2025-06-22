import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services';
import { Button, Alert } from '../components';
import { 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

// Componentes de cada paso
import SelectorEspecialidad from '../components/appointment/SelectorEspecialidad';
import SelectorTipoServicio from '../components/appointment/SelectorTipoServicio';
import SelectorDisponibilidad from '../components/appointment/SelectorDisponibilidad';
import FormularioPaciente from '../components/appointment/FormularioPaciente';
import ConfirmacionCita from '../components/appointment/ConfirmacionCita';

function GuestAppointment() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Estados para los datos
  const [especialidades, setEspecialidades] = useState([]);
  const [tiposServicio, setTiposServicio] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [datosPaciente, setDatosPaciente] = useState({});

  // Cargar especialidades al iniciar
  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getEspecialidades();
      if (response.success) {
        setEspecialidades(response.data);
      } else {
        setError('Error al cargar especialidades');
      }
    } catch (error) {
      setError('Error al cargar especialidades');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarTiposServicio = async (especialidadId) => {
    try {
      setLoading(true);
      const response = await appointmentService.getTiposServicio(especialidadId);
      if (response.success) {
        setTiposServicio(response.data);
      } else {
        setError('Error al cargar tipos de servicio');
      }
    } catch (error) {
      setError('Error al cargar tipos de servicio');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarDisponibilidades = async (especialidadId) => {
    try {
      setLoading(true);
      const response = await appointmentService.getDisponibilidades(especialidadId);
      if (response.success) {
        setDisponibilidades(response.data);
      } else {
        setError('Error al cargar disponibilidades');
      }
    } catch (error) {
      setError('Error al cargar disponibilidades');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSiguiente = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      switch (paso) {
        case 1: // Especialidad seleccionada
          if (!selecciones.especialidadId) {
            setError('Por favor selecciona una especialidad');
            return;
          }
          await cargarTiposServicio(selecciones.especialidadId);
          setPaso(2);
          break;

        case 2: // Tipo de servicio seleccionado
          if (!selecciones.tipoServicioId) {
            setError('Por favor selecciona un tipo de servicio');
            return;
          }
          await cargarDisponibilidades(selecciones.especialidadId);
          setPaso(3);
          break;

        case 3: // Disponibilidad seleccionada
          if (!selecciones.disponibilidadId) {
            setError('Por favor selecciona una disponibilidad');
            return;
          }
          setPaso(4);
          break;

        case 4: // Datos del paciente completados
          if (!validarDatosPaciente()) {
            return;
          }
          
          console.log('Datos del paciente a enviar:', datosPaciente);
          
          try {
            const paciente = await appointmentService.createGuestPatient(datosPaciente);
            if (paciente.success) {
              setSelecciones(prev => ({ ...prev, pacienteId: paciente.data.id }));
              setPaso(5);
            } else {
              // Mostrar errores específicos del backend
              if (paciente.errors && paciente.errors.length > 0) {
                const errorMessages = paciente.errors.map(err => err.message || err).join(', ');
                setError(`Error de validación: ${errorMessages}`);
              } else {
                setError(paciente.message || 'Error al crear paciente invitado');
              }
            }
          } catch (error) {
            console.error('Error completo:', error);
            if (error.response?.data) {
              const backendError = error.response.data;
              if (backendError.errors && backendError.errors.length > 0) {
                const errorMessages = backendError.errors.map(err => err.message || err).join(', ');
                setError(`Error de validación: ${errorMessages}`);
              } else {
                setError(backendError.message || 'Error al crear paciente invitado');
              }
            } else {
              setError('Error al crear paciente invitado');
            }
          }
          break;

        case 5: // Confirmar y crear cita
          try {
            // Obtener la disponibilidad seleccionada
            const disponibilidadSeleccionada = disponibilidades.find(disp => disp.id === selecciones.disponibilidadId);
            
            const cita = await appointmentService.createGuestAppointment({
              guest_patient_id: selecciones.pacienteId,
              disponibilidad_id: selecciones.disponibilidadId,
              service_type_id: selecciones.tipoServicioId,
              disponibilidad: disponibilidadSeleccionada,
              notes: datosPaciente.notes || ""
            });
            
            if (cita.success) {
              setMessage(`¡Cita creada exitosamente! ID: ${cita.data.id}`);
              setTimeout(() => {
                navigate('/login');
              }, 3000);
            } else {
              // Mostrar errores específicos del backend
              if (cita.errors && cita.errors.length > 0) {
                const errorMessages = cita.errors.map(err => err.message || err).join(', ');
                setError(`Error de validación: ${errorMessages}`);
              } else {
                setError(cita.message || 'Error al crear la cita');
              }
            }
          } catch (error) {
            console.error('Error completo en creación de cita:', error);
            if (error.response?.data) {
              const backendError = error.response.data;
              if (backendError.errors && backendError.errors.length > 0) {
                const errorMessages = backendError.errors.map(err => err.message || err).join(', ');
                setError(`Error de validación: ${errorMessages}`);
              } else {
                setError(backendError.message || 'Error al crear la cita');
              }
            } else {
              setError('Error al crear la cita');
            }
          }
          break;
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validarDatosPaciente = () => {
    const { name, email, phone } = datosPaciente;
    
    if (!name || !phone) {
      setError('Por favor completa todos los campos obligatorios');
      return false;
    }

    if (name.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return false;
    }

    if (name.length > 100) {
      setError('El nombre no puede exceder 100 caracteres');
      return false;
    }

    // Validar email solo si se proporciona (es opcional según el esquema)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Por favor ingresa un email válido');
        return false;
      }
    }

    // Validar teléfono según el patrón del backend
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      setError('El teléfono debe tener un formato válido (ej: +573001234567 o 3001234567)');
      return false;
    }

    return true;
  };

  const handleAnterior = () => {
    if (paso > 1) {
      setPaso(paso - 1);
      setError('');
      setMessage('');
    }
  };

  const pasos = [
    { numero: 1, titulo: 'Especialidad', icono: UserIcon },
    { numero: 2, titulo: 'Servicio', icono: CalendarIcon },
    { numero: 3, titulo: 'Horario', icono: ClockIcon },
    { numero: 4, titulo: 'Datos', icono: UserIcon },
    { numero: 5, titulo: 'Confirmar', icono: CheckCircleIcon },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background-light py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Crear Cita como Invitado
          </h1>
          <p className="text-text-dark">
            Completa los siguientes pasos para agendar tu cita
          </p>
        </div>

        {/* Indicador de pasos */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {pasos.map((pasoInfo, index) => (
              <div key={pasoInfo.numero} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    paso >= pasoInfo.numero
                      ? 'bg-primary border-primary text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {paso > pasoInfo.numero ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <pasoInfo.icono className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    paso >= pasoInfo.numero ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {pasoInfo.titulo}
                </span>
                {index < pasos.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      paso > pasoInfo.numero ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        <AnimatePresence>
          {error && <Alert type="error" message={error} />}
          {message && <Alert type="success" message={message} />}
        </AnimatePresence>

        {/* Contenido del paso actual */}
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          {paso === 1 && (
            <SelectorEspecialidad
              especialidades={especialidades}
              onSelect={(id) => setSelecciones(prev => ({ ...prev, especialidadId: id }))}
              selected={selecciones.especialidadId}
            />
          )}

          {paso === 2 && (
            <SelectorTipoServicio
              tiposServicio={tiposServicio}
              onSelect={(id) => setSelecciones(prev => ({ ...prev, tipoServicioId: id }))}
              selected={selecciones.tipoServicioId}
            />
          )}

          {paso === 3 && (
            <SelectorDisponibilidad
              disponibilidades={disponibilidades}
              onSelect={(id) => setSelecciones(prev => ({ ...prev, disponibilidadId: id }))}
              selected={selecciones.disponibilidadId}
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
              especialidades={especialidades}
              tiposServicio={tiposServicio}
              disponibilidades={disponibilidades}
            />
          )}
        </motion.div>

        {/* Botones de navegación */}
        <div className="flex justify-between">
          <Button
            onClick={handleAnterior}
            disabled={paso <= 1 || loading}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleSiguiente}
            disabled={loading}
            className="flex items-center"
          >
            {loading ? (
              'Cargando...'
            ) : paso === 5 ? (
              <>
                Crear Cita
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Siguiente
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default GuestAppointment; 