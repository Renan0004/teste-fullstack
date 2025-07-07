import { Router } from 'express';
import { TimeRecordController } from '../controllers/TimeRecordController';

const router = Router();
const timeRecordController = new TimeRecordController();

// Obter registro atual do usuário
router.get('/users/:userCode/current', (req, res) => 
  timeRecordController.getCurrentTimeRecord(req, res)
);

// Obter registros anteriores do usuário
router.get('/users/:userCode/history', (req, res) => 
  timeRecordController.getPreviousTimeRecords(req, res)
);

// Registrar entrada
router.post('/entry', (req, res) => 
  timeRecordController.registerEntry(req, res)
);

// Registrar saída
router.post('/exit', (req, res) => 
  timeRecordController.registerExit(req, res)
);

export default router; 