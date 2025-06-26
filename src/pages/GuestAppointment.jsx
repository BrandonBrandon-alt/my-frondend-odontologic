import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services';
import { Button, Alert } from '../components';
import ReCAPTCHA from "react-google-recaptcha";
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
  const [captchaToken, setCaptchaToken] = React.useState('');

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
      dispatch({ type: 'SET_ERROR', payload: defaultMessage });
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
        // Solo validar y pasar al siguiente paso, sin crear el paciente aún.
        dispatch({ type: 'SET_PASO', payload: 5 });
        break;

      case 5:
        // --- Validaciones Finales ---
        if (!captchaToken) {
          dispatch({ type: 'SET_ERROR', payload: 'Por favor completa el reCAPTCHA.' });
          return;
        }
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
        // --- Creación Unificada (Paciente + Cita) ---
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          // Ajuste de fecha para corregir problemas de zona horaria
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
            preferredDate: formattedDate, // ¡Enviar la cadena formateada!
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

        <AnimatePresence>
          {error && <Alert type="error" message={error} />}
          {message && <Alert type="success" message={message} />}
        </AnimatePresence>

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
              <div className="flex justify-center my-4">
                <ReCAPTCHA
                  sitekey="6LcH_2crAAAAAIdUCguL_3Yd8gpuumCShBddb_f7"
                  onChange={token => setCaptchaToken(token)}
                />
              </div>
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