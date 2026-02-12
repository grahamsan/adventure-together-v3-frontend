// Auto-generated API functions
import api from '@/lib/axios';
/**
 * Upload a single file to Cloudinary
 */
export const uploadControllerUploadSingle = async (payload: {

  file?: string;
}): Promise<any> => {
  const { data } = await api.post<any>(`/upload/single`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
};

/**
 * Upload multiple files to Cloudinary
 */
export const uploadControllerUploadMultiple = async (payload: {

  files?: string[];
}): Promise<any> => {
  const { data } = await api.post<any>(`/upload/multiple`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
};

