import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services';
import { Button, Alert } from '../components';
import { useRecaptchaV3 } from '../hooks/useRecaptchaV3'; // Importar el hook de reCAPTCHA v3
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

const initialState = {
  paso: 1,
  loading: false,
  error: '',
  message: '',
  especialidades: [],
  tiposServicio: [],
  disponibilidades: [],
  selecciones: {},
  datosPaciente: {},
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
    case 'SET_DATOS_PACIENTE':
      return { ...state, datosPaciente: action.payload };
    case 'RESET_MESSAGES':
      return { ...state, error: '', message: '' };
    default:
      return state;
  }
}

function GuestAppointment() {
  const navigate = useNavigate();
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
    datosPaciente,
  } = state;
  
  // Instanciar el hook de reCAPTCHA v3
  const { executeRecaptcha, isScriptLoaded } = useRecaptchaV3();

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const handleServiceError = (err, defaultMessage) => {
    console.error('Error:', err);
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

  const validarDatosPaciente = () => {
    const { name, email, phone } = datosPaciente;
    if (!name || !phone) {
      dispatch({ type: 'SET_ERROR', payload: 'Por favor completa todos los campos obligatorios' });
      return false;
    }
    if (name.length < 2) {
      dispatch({ type: 'SET_ERROR', payload: 'El nombre debe tener al menos 2 caracteres' });
      return false;
    }
    if (name.length > 100) {
      dispatch({ type: 'SET_ERROR', payload: 'El nombre no puede exceder 100 caracteres' });
      return false;
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        dispatch({ type: 'SET_ERROR', payload: 'Por favor ingresa un email válido' });
        return false;
      }
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      dispatch({ type: 'SET_ERROR', payload: 'El teléfono debe tener un formato válido (ej: +573001234567 o 3001234567)' });
      return false;
    }
    return true;
  };

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
        if (!validarDatosPaciente()) return;
        dispatch({ type: 'SET_PASO', payload: 5 });
        break;

      case 5:
        const disponibilidadSeleccionada = disponibilidades.find(disp => disp.id === selecciones.disponibilidadId);
        const tipoServicioSeleccionado = tiposServicio.find(serv => serv.id === selecciones.tipoServicioId);
        if (!disponibilidadSeleccionada || !tipoServicioSeleccionado || !validarDatosPaciente()) {
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
          if (!isScriptLoaded) {
            throw new Error('El servicio de seguridad (reCAPTCHA) no ha cargado.');
          }
          const captchaToken = await executeRecaptcha('create_guest_appointment');
          
          const date = new Date(disponibilidadSeleccionada.date);
          const userTimezoneOffset = date.getTimezoneOffset() * 60000;
          const correctedDate = new Date(date.getTime() + userTimezoneOffset);
          const year = correctedDate.getFullYear();
          const month = String(correctedDate.getMonth() + 1).padStart(2, '0');
          const day = String(correctedDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          const appointmentData = {
            datosPaciente: datosPaciente,
            disponibilidadId: selecciones.disponibilidadId,
            serviceTypeId: selecciones.tipoServicioId,
            preferredDate: formattedDate,
            notes: datosPaciente.notes || null,
            captchaToken,
          };
          
          const cita = await appointmentService.createGuestAppointment(appointmentData);
          if (cita.success) {
            dispatch({ type: 'SET_MESSAGE', payload: `¡Cita creada exitosamente! ID: ${cita.data.id}` });
            setTimeout(() => navigate('/login'), 3000);
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Crear Cita como Invitado
          </h1>
          <p className="text-text-dark">
            Completa los siguientes pasos para agendar tu cita
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
            <FormularioPaciente
              datos={datosPaciente}
              onChange={(data) => dispatch({ type: 'SET_DATOS_PACIENTE', payload: data })}
            />
          )}

          {paso === 5 && (
            <>
              <ConfirmacionCita
                selecciones={selecciones}
                datosPaciente={datosPaciente}
                especialidades={especialidades}
                tiposServicio={tiposServicio}
                disponibilidades={disponibilidades}
              />
              <p className="text-xs text-left text-gray-500 mt-4">
                This site is protected by reCAPTCHA and the Google&nbsp;
                <a href="https://policies.google.com/privacy" className="underline hover:text-primary">Privacy Policy</a> and&nbsp;
                <a href="https://policies.google.com/terms" className="underline hover:text-primary">Terms of Service</a> apply.
              </p>
            </>
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
            disabled={loading || (paso === 5 && !isScriptLoaded)}
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