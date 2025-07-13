import axiosInstance from '../utils/axiosInstance';

export const fetchDentists = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get('/admin/dentists', {
    params: { page, limit },
  });
  return response.data; // { total, page, totalPages, data }
};
