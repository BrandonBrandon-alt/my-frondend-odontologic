import axiosInstance from '../utils/axiosInstance';

const APPOINTMENT_BASE_PATH = '/appointment';
const ESPECIALIDAD_BASE_PATH = '/especialidad';
const SERVICE_TYPE_BASE_PATH = '/service-type';
const DISPONIBILIDAD_BASE_PATH = '/disponibilidad';
const GUEST_PATIENT_BASE_PATH = '/guest-patient';

export const appointmentService = {
  // ======================= ESPECIALIDADES =======================
  getEspecialidades: async () => {
    try {
      const response = await axiosInstance.get(ESPECIALIDAD_BASE_PATH);
      return response.data;
    } catch (error) {
      console.error('Error en appointmentService.getEspecialidades:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= TIPOS DE SERVICIO =======================
  getTiposServicio: async (especialidadId) => {
    try {
      const response = await axiosInstance.get(`${SERVICE_TYPE_BASE_PATH}/especialidad/${especialidadId}`);
      return response.data;
    } catch (error) {
      console.error('Error en appointmentService.getTiposServicio:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= DISPONIBILIDADES =======================
  getDisponibilidades: async (especialidadId, fecha = null) => {
    try {
      let url = `${DISPONIBILIDAD_BASE_PATH}/especialidad/${especialidadId}`;
      if (fecha) {
        url += `?date=${fecha}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error en appointmentService.getDisponibilidades:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= PACIENTE INVITADO =======================
  createGuestPatient: async (datosPaciente) => {
    try {
      const payload = {
        name: datosPaciente.name,
        email: datosPaciente.email,
        phone: datosPaciente.phone
      };
      
      console.log('Payload enviado al backend:', payload);
      
      const response = await axiosInstance.post(GUEST_PATIENT_BASE_PATH, payload);
      console.log('Respuesta del backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error completo en createGuestPatient:', error);
      console.error('Datos del error:', error.response?.data);
      throw error;
    }
  },

  // ======================= CREAR CITA COMO INVITADO =======================
  createGuestAppointment: async (datosCita) => {
    try {
      // Extraer fecha y hora de la disponibilidad
      const disponibilidad = datosCita.disponibilidad;
      const preferred_date = disponibilidad?.date;
      
      // Formatear la hora a HH:MM (sin segundos) - usar la hora de inicio
      let preferred_time = disponibilidad?.start_time;
      if (preferred_time && preferred_time.includes(':')) {
        const timeParts = preferred_time.split(':');
        preferred_time = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`; // Asegurar formato HH:MM
      }
      
      console.log('Disponibilidad completa:', disponibilidad);
      console.log('Hora formateada:', preferred_time);
      
      const payload = {
        guest_patient_id: datosCita.guest_patient_id,
        disponibilidad_id: datosCita.disponibilidad_id,
        service_type_id: datosCita.service_type_id,
        preferred_date: preferred_date,
        preferred_time: preferred_time,
        notes: datosCita.notes || ""
      };
      
      console.log('Payload de cita enviado al backend:', payload);
      
      const response = await axiosInstance.post(`${APPOINTMENT_BASE_PATH}/guest`, payload);
      console.log('Respuesta del backend (cita):', response.data);
      return response.data;
    } catch (error) {
      console.error('Error completo en createGuestAppointment:', error);
      console.error('Datos del error:', error.response?.data);
      throw error;
    }
  },
}; 