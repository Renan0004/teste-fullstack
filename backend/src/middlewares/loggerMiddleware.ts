import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

/**
 * Middleware para logging de requisições HTTP
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Registra o início da requisição
  const start = Date.now();
  const { method, originalUrl, ip } = req;
  
  Logger.http(`Requisição iniciada: ${method} ${originalUrl} - IP: ${ip}`);
  
  // Intercepta o método send para registrar a resposta
  const oldSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Registra o fim da requisição com status e duração
    Logger.http(
      `Requisição finalizada: ${method} ${originalUrl} - Status: ${statusCode} - Duração: ${duration}ms`
    );
    
    // Chama o método original
    return oldSend.call(this, body);
  };
  
  next();
}; 