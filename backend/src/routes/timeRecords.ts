import { Router } from 'express';
import { TimeRecordController } from '../controllers/TimeRecordController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { TimeRecordDto } from '../dtos/TimeRecordDto';

const router = Router();
const timeRecordController = new TimeRecordController();

/**
 * @swagger
 * /api/time-records/users/{userCode}/current:
 *   get:
 *     summary: Obtém o registro de ponto atual do usuário
 *     description: Retorna o registro de ponto do dia atual para o usuário especificado
 *     tags: [TimeRecords]
 *     parameters:
 *       - in: path
 *         name: userCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário
 *     responses:
 *       200:
 *         description: Registro de ponto atual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timeRecord:
 *                   $ref: '#/components/schemas/TimeRecord'
 *                   nullable: true
 *                 workedHours:
 *                   type: object
 *                   properties:
 *                     hours:
 *                       type: integer
 *                     minutes:
 *                       type: integer
 *                     seconds:
 *                       type: integer
 *       400:
 *         description: Código de usuário não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/users/:userCode/current', (req, res) => 
  timeRecordController.getCurrentTimeRecord(req, res)
);

/**
 * @swagger
 * /api/time-records/users/{userCode}/history:
 *   get:
 *     summary: Obtém os registros de ponto anteriores do usuário
 *     description: Retorna os registros de ponto de dias anteriores para o usuário especificado
 *     tags: [TimeRecords]
 *     parameters:
 *       - in: path
 *         name: userCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário
 *     responses:
 *       200:
 *         description: Lista de registros de ponto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/TimeRecord'
 *                   - type: object
 *                     properties:
 *                       workedHours:
 *                         type: object
 *                         properties:
 *                           hours:
 *                             type: integer
 *                           minutes:
 *                             type: integer
 *                           seconds:
 *                             type: integer
 *       400:
 *         description: Código de usuário não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/users/:userCode/history', (req, res) => 
  timeRecordController.getPreviousTimeRecords(req, res)
);

/**
 * @swagger
 * /api/time-records/entry:
 *   post:
 *     summary: Registra a entrada do usuário
 *     description: Cria um novo registro de ponto com horário de entrada
 *     tags: [TimeRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeRecordDto'
 *     responses:
 *       201:
 *         description: Registro de entrada criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRecord'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/entry', 
  validationMiddleware(TimeRecordDto),
  (req, res) => timeRecordController.registerEntry(req, res)
);

/**
 * @swagger
 * /api/time-records/exit:
 *   post:
 *     summary: Registra a saída do usuário
 *     description: Atualiza um registro de ponto existente com horário de saída
 *     tags: [TimeRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeRecordDto'
 *     responses:
 *       200:
 *         description: Registro de saída atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timeRecord:
 *                   $ref: '#/components/schemas/TimeRecord'
 *                 workedHours:
 *                   type: object
 *                   properties:
 *                     hours:
 *                       type: integer
 *                     minutes:
 *                       type: integer
 *                     seconds:
 *                       type: integer
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Registro de ponto não encontrado ou já finalizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/exit', 
  validationMiddleware(TimeRecordDto),
  (req, res) => timeRecordController.registerExit(req, res)
);

export default router; 