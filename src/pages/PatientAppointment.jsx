import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services';
import { Button, Alert } from '../components';
import { useAuth } from '../context/AuthContext';
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
import ConfirmacionCita from '../components/appointment/ConfirmacionCita';

const initialState = {
  paso: 1,
  loading: false,
  error: '',
  message: '',
  especialidades: [],
  tiposServicio: [],
  disponibilidades: [],
  selecciones: {},
  notas: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PASO':
      return { ...state, paso: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, message: '' };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload, error: '' };
    case 'SET_ESPECIALIDADES':
      return { ...state, especialidades: action.payload };
    case 'SET_TIPOS_SERVICIO':
      return { ...state, tiposServicio: action.payload };
    case 'SET_DISPONIBILIDADES':
      return { ...state, disponibilidades: action.payload };
    case 'SET_SELECCIONES':
      return { ...state, selecciones: { ...state.selecciones, ...action.payload } };
    case 'SET_NOTAS':
      return { ...state, notas: action.payload };
    case 'RESET_MESSAGES':
      return { ...state, error: '', message: '' };
    default:
      return state;
  }
}

function PatientAppointment() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    paso,
    loading,
    error,
    message,
    especialidades,
    tiposServicio,
    disponibilidades,
    selecciones,
    notas,
  } = state;

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/patient-appointment' } });
      return;
    }

    // Verificar si el usuario es un paciente (rol 'user')
    if (user && user.role !== 'user') {
      navigate('/unauthorized');
      return;
    }

    cargarEspecialidades();
  }, [isLoggedIn, user, navigate]);

  const handleServiceError = (err, defaultMessage) => {
    console.error('Error:', err);
    
    // Si es un error 500 específico del endpoint de pacientes, mostrar mensaje especial
    if (err.message && err.message.includes('no está implementado')) {
      dispatch({ type: 'SET_ERROR', payload: 'Esta funcionalidad estará disponible pronto. Por favor, usa la opción de "Agendar Cita como Invitado" mientras tanto.' });
      return;
    }
    
    if (err.response?.data) {
      const backendError = err.response.data;
      if (backendError.errors && backendError.errors.length > 0) {
        const errorMessages = backendError.errors.map(e => e.message || e).join(', ');
        dispatch({ type: 'SET_ERROR', payload: `Error de validación: ${errorMessages}` });
      } else {
        dispatch({ type: 'SET_ERROR', payload: backendError.message || defaultMessage });
      }
    } else {
      dispatch({ type: 'SET_ERROR', payload: err.message || defaultMessage });
    }
  };

  const cargarDatos = async (serviceCall, successAction, errorMessage) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await serviceCall();
      if (response.success) {
        dispatch({ type: successAction, payload: response.data });
        return true;
      } else {
        handleServiceError(response, errorMessage);
        return false;
      }
    } catch (err) {
      handleServiceError(err, errorMessage);
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const cargarEspecialidades = () => cargarDatos(
    appointmentService.getEspecialidades,
    'SET_ESPECIALIDADES',
    'Error al cargar especialidades'
  );

  const cargarTiposServicio = (especialidadId) => cargarDatos(
    () => appointmentService.getTiposServicio(especialidadId),
    'SET_TIPOS_SERVICIO',
    'Error al cargar tipos de servicio'
  );

  const cargarDisponibilidades = (especialidadId) => cargarDatos(
    () => appointmentService.getDisponibilidades(especialidadId),
    'SET_DISPONIBILIDADES',
    'Error al cargar disponibilidades'
  );

  const handleSiguiente = async () => {
    dispatch({ type: 'RESET_MESSAGES' });

    switch (paso) {
      case 1:
        if (!selecciones.especialidadId) {
          dispatch({ type: 'SET_ERROR', payload: 'Por favor selecciona una especialidad' });
          return;
        }
        const successTipos = await cargarTiposServicio(selecciones.especialidadId);
        if (successTipos) dispatch({ type: 'SET_PASO', payload: 2 });
        break;

      case 2:
        if (!selecciones.tipoServicioId) {
          dispatch({ type: 'SET_ERROR', payload: 'Por favor selecciona un tipo de servicio' });
          return;
        }
        const successDispo = await cargarDisponibilidades(selecciones.especialidadId);
        if (successDispo) dispatch({ type: 'SET_PASO', payload: 3 });
        break;

      case 3:
        if (!selecciones.disponibilidadId) {
          dispatch({ type: 'SET_ERROR', payload: 'Por favor selecciona una disponibilidad' });
          return;
        }
        dispatch({ type: 'SET_PASO', payload: 4 });
        break;

      case 4:
        const disponibilidadSeleccionada = disponibilidades.find(disp => disp.id === selecciones.disponibilidadId);
        const tipoServicioSeleccionado = tiposServicio.find(serv => serv.id === selecciones.tipoServicioId);
        
        if (!disponibilidadSeleccionada || !tipoServicioSeleccionado) {
          dispatch({ type: 'SET_ERROR', payload: 'Faltan datos o hay un error. Por favor, revisa los pasos anteriores.' });
          return;
        }

        const startTime = new Date(`1970-01-01T${disponibilidadSeleccionada.start_time}`);
        const endTime = new Date(`1970-01-01T${disponibilidadSeleccionada.end_time}`);
        const slotDurationInMinutes = (endTime - startTime) / (1000 * 60);
        
        if (tipoServicioSeleccionado.duration > slotDurationInMinutes) {
          dispatch({ type: 'SET_ERROR', payload: `El servicio (${tipoServicioSeleccionado.name}) requiere ${tipoServicioSeleccionado.duration} min, pero el horario solo tiene ${slotDurationInMinutes} min.` });
          return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const date = new Date(disponibilidadSeleccionada.date);
          const userTimezoneOffset = date.getTimezoneOffset() * 60000;
          const correctedDate = new Date(date.getTime() + userTimezoneOffset);
          const year = correctedDate.getFullYear();
          const month = String(correctedDate.getMonth() + 1).padStart(2, '0');
          const day = String(correctedDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          const appointmentData = {
            user_id: user.id,
            disponibilidad_id: selecciones.disponibilidadId,
            service_type_id: selecciones.tipoServicioId,
            preferred_date: formattedDate,
            preferred_time: disponibilidadSeleccionada.start_time,
            notes: notas || null,
          };
          
          // Aquí necesitarías agregar el método createPatientAppointment al servicio
          const cita = await appointmentService.createPatientAppointment(appointmentData);
          if (cita.success) {
            dispatch({ type: 'SET_MESSAGE', payload: `¡Cita creada exitosamente! ID: ${cita.data.id}` });
            setTimeout(() => navigate('/patient/dashboard'), 3000);
          } else {
            handleServiceError(cita, 'No se pudo crear la cita.');
          }
        } catch (err) {
          handleServiceError(err, 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
        break;

      default:
        break;
    }
  };

  const handleAnterior = () => {
    if (paso > 1) {
      dispatch({ type: 'SET_PASO', payload: paso - 1 });
      dispatch({ type: 'RESET_MESSAGES' });
    }
  };

  const pasos = [
    { numero: 1, titulo: 'Especialidad', icono: UserIcon },
    { numero: 2, titulo: 'Servicio', icono: CalendarIcon },
    { numero: 3, titulo: 'Horario', icono: ClockIcon },
    { numero: 4, titulo: 'Confirmar', icono: CheckCircleIcon },
  ];

  // Si no está autenticado o no es paciente, mostrar loading
  if (!isLoggedIn || !user || user.role !== 'user') {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-dark">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background-light py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Agendar Cita
          </h1>
          <p className="text-text-dark">
            Hola {user.name}, completa los siguientes pasos para agendar tu cita
          </p>
        </div>
        <nav className="flex justify-center mb-8">
          <ol className="flex flex-row gap-0 md:gap-8 w-full max-w-2xl items-center">
            {pasos.map((pasoInfo, index) => {
              const isCompleted = paso > pasoInfo.numero;
              const isActive = paso === pasoInfo.numero;
              const isPending = paso < pasoInfo.numero;
              return (
                <li key={pasoInfo.numero} className="flex-1 flex flex-col items-center relative min-w-[60px]">
                  {/* Línea de conexión izquierda */}
                  {index > 0 && (
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 -z-10 h-1 w-1/2 md:w-8 rounded bg-gradient-to-r
                        ${isCompleted ? 'from-[var(--color-primary)] to-[var(--color-primary)]' : 'from-[var(--border-primary)] to-[var(--border-primary)]'}
                      `}
                      style={{ marginLeft: '-50%' }}
                    />
                  )}
                  {/* Círculo con icono */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300
                      ${isCompleted ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white scale-100' : ''}
                      ${isActive ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-2xl scale-110 ring-4 ring-[var(--color-primary)]/30 z-10' : ''}
                      ${isPending ? 'bg-transparent border-[var(--border-primary)] text-[var(--color-primary)]/40 opacity-70' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="w-9 h-9" />
                    ) : (
                      <pasoInfo.icono className={`w-9 h-9`} />
                    )}
                  </div>
                  {/* Título del paso */}
                  <span
                    className={`mt-2 text-xs md:text-base font-bold text-center transition-colors duration-200
                      ${isActive ? 'text-[var(--color-primary)] scale-105' : 'text-[var(--color-text-secondary)] font-semibold'}
                    `}
                  >
                    {pasoInfo.titulo}
                  </span>
                  {/* Línea de conexión derecha */}
                  {index < pasos.length - 1 && (
                    <span
                      className={`absolute right-0 top-1/2 -translate-y-1/2 -z-10 h-1 w-1/2 md:w-8 rounded bg-gradient-to-r
                        ${paso > pasoInfo.numero ? 'from-[var(--color-primary)] to-[var(--color-primary)]' : 'from-[var(--border-primary)] to-[var(--border-primary)]'}
                      `}
                      style={{ marginRight: '-50%' }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <AnimatePresence>
          {message && <Alert key="success-alert" type="success" message={message} />}
          {error && <Alert key="error-alert" type="error" message={error} />}
        </AnimatePresence>
        
        {/* Botón temporal para redirigir a guest-appointment si el backend no está implementado */}
        {error && error.includes('funcionalidad estará disponible pronto') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)] rounded-lg p-4 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-[var(--color-accent)] mb-1">Alternativa temporal</h4>
                <p className="text-sm text-gray-600">Mientras se implementa esta funcionalidad, puedes usar la opción de invitado.</p>
              </div>
              <button
                onClick={() => navigate('/guest-appointment')}
                className="bg-[var(--color-accent)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-primary)] transition-colors duration-200 text-sm font-semibold whitespace-nowrap"
              >
                Ir a Agendar Cita como Invitado
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[var(--color-background)] rounded-2xl shadow-xl p-6 md:p-10 mb-6 transition-colors duration-200 border border-[var(--border-primary)]"
        >
          {paso === 1 && (
            <SelectorEspecialidad
              especialidades={especialidades}
              onSelect={(id) => dispatch({ type: 'SET_SELECCIONES', payload: { especialidadId: id } })}
              selected={selecciones.especialidadId}
            />
          )}

          {paso === 2 && (
            <SelectorTipoServicio
              tiposServicio={tiposServicio}
              onSelect={(id) => dispatch({ type: 'SET_SELECCIONES', payload: { tipoServicioId: id } })}
              selected={selecciones.tipoServicioId}
            />
          )}

          {paso === 3 && (
            <SelectorDisponibilidad
              disponibilidades={disponibilidades}
              onSelect={(id) => dispatch({ type: 'SET_SELECCIONES', payload: { disponibilidadId: id } })}
              selected={selecciones.disponibilidadId}
            />
          )}

          {paso === 4 && (
            <div className="bg-white dark:bg-[var(--color-background)] rounded-2xl shadow-xl p-6 md:p-10">
              <ConfirmacionCita
                selecciones={selecciones}
                datosPaciente={{
                  name: user.name,
                  email: user.email,
                  phone: user.phone || 'No especificado'
                }}
                especialidades={especialidades}
                tiposServicio={tiposServicio}
                disponibilidades={disponibilidades}
              />
              
              {/* Campo de notas adicional */}
              <div className="mt-6">
                <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={(e) => dispatch({ type: 'SET_NOTAS', payload: e.target.value })}
                  placeholder="Agrega cualquier información adicional que consideres importante..."
                  className="w-full px-3 py-2 border border-[var(--border-primary)] bg-[var(--color-background-light)] dark:bg-[var(--color-background)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors duration-200"
                  rows="3"
                />
              </div>
            </div>
          )}
        </motion.div>

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
            ) : paso === 4 ? (
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

export default PatientAppointment; 