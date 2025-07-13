import axiosInstance from '../utils/axiosInstance';

const APPOINTMENT_BASE_PATH = '/appointments';
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

  // ======================= CREAR CITA COMO INVITADO (UNIFICADO) =======================
  createGuestAppointment: async (appointmentData) => {
    try {
      const payload = {
        guest_patient: {
          name: appointmentData.datosPaciente.name,
          email: appointmentData.datosPaciente.email,
          phone: appointmentData.datosPaciente.phone,
        },
        disponibilidad_id: appointmentData.disponibilidadId,
        service_type_id: appointmentData.serviceTypeId,
        preferred_date: appointmentData.preferredDate,
        notes: appointmentData.notes || null,
      };
      // Agregar captchaToken si está presente
      if (appointmentData.captchaToken) {
        payload.captchaToken = appointmentData.captchaToken;
      }
      console.log('Payload unificado enviado al backend:', payload);
      const response = await axiosInstance.post(`${APPOINTMENT_BASE_PATH}/guest`, payload);
      console.log('Respuesta del backend (cita unificada):', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en createGuestAppointment (unificado):', error);
      console.error('Datos del error:', error.response?.data);
      throw error;
    }
  },

  // ======================= CREAR CITA PARA PACIENTE AUTENTICADO =======================
  createPatientAppointment: async (appointmentData) => {
    try {
      const payload = {
        patient_id: appointmentData.user_id,
        disponibilidad_id: appointmentData.disponibilidad_id,
        service_type_id: appointmentData.service_type_id,
        preferred_date: appointmentData.preferred_date,
        notes: appointmentData.notes || null,
      };
      
      console.log('Payload para paciente autenticado enviado al backend:', payload);
      console.log('URL del endpoint:', `${APPOINTMENT_BASE_PATH}/patient`);
      
      const response = await axiosInstance.post(`${APPOINTMENT_BASE_PATH}/patient`, payload);
      console.log('Respuesta del backend (cita paciente autenticado):', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en createPatientAppointment:', error);
      console.error('Status del error:', error.response?.status);
      console.error('Datos del error:', error.response?.data);
      console.error('Headers del error:', error.response?.headers);
      console.error('URL que falló:', error.config?.url);
      console.error('Método que falló:', error.config?.method);
      console.error('Payload que se envió:', error.config?.data);
      
      // Si el backend no está implementado aún, devolver un error más descriptivo
      if (error.response?.status === 500) {
        throw new Error('El endpoint para crear citas de pacientes registrados aún no está implementado en el backend. Por favor, contacta al administrador.');
      }
      
      throw error;
    }
  },
}; 