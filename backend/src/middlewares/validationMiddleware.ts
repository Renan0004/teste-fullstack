import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Middleware para validação de dados usando class-validator
 * @param type - O tipo de classe DTO a ser validada
 * @param skipMissingProperties - Se deve ignorar propriedades ausentes
 * @returns Middleware Express
 */
export const validationMiddleware = (type: any, skipMissingProperties = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Converte o objeto plain para a instância da classe
    const dtoObj = plainToInstance(type, req.body);
    
    // Valida o objeto usando class-validator
    validate(dtoObj, { skipMissingProperties }).then((errors) => {
      // Se não houver erros, continua
      if (errors.length === 0) {
        req.body = dtoObj;
        next();
        return;
      }
      
      // Extrai as mensagens de erro
      const validationErrors = errors.map((error) => {
        return Object.values(error.constraints || {});
      }).flat();
      
      // Retorna os erros de validação
      res.status(400).json({
        status: 'error',
        message: 'Erro de validação',
        errors: validationErrors
      });
    });
  };
}; 