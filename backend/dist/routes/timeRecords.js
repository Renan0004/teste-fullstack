"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TimeRecordController_1 = require("../controllers/TimeRecordController");
const router = (0, express_1.Router)();
const timeRecordController = new TimeRecordController_1.TimeRecordController();
// Obter registro atual do usuário
router.get('/users/:userCode/current', (req, res) => timeRecordController.getCurrentTimeRecord(req, res));
// Obter registros anteriores do usuário
router.get('/users/:userCode/history', (req, res) => timeRecordController.getPreviousTimeRecords(req, res));
// Registrar entrada
router.post('/entry', (req, res) => timeRecordController.registerEntry(req, res));
// Registrar saída
router.post('/exit', (req, res) => timeRecordController.registerExit(req, res));
exports.default = router;
