import axios from 'axios';
import { TimeRecord, TimeRecordWithHours } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
});

export const timeRecordService = {
  // Obter registro atual do usuário
  getCurrentTimeRecord: async (userCode: string): Promise<{ timeRecord: TimeRecord; workedHours: { hours: number; minutes: number } } | null> => {
    try {
      const response = await api.get(`/time-records/users/${userCode}/current`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter registro atual:', error);
      return null;
    }
  },

  // Obter registros anteriores do usuário
  getPreviousTimeRecords: async (userCode: string): Promise<TimeRecordWithHours[]> => {
    try {
      const response = await api.get(`/time-records/users/${userCode}/history`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter registros anteriores:', error);
      return [];
    }
  },

  // Registrar entrada
  registerEntry: async (userCode: string): Promise<TimeRecord | null> => {
    try {
      const response = await api.post('/time-records/entry', { userCode });
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
      return null;
    }
  },

  // Registrar saída
  registerExit: async (userCode: string): Promise<{ timeRecord: TimeRecord; workedHours: { hours: number; minutes: number } } | null> => {
    try {
      const response = await api.post('/time-records/exit', { userCode });
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      return null;
    }
  }
};

export default api; 