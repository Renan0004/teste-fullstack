import { Request, Response, NextFunction } from 'express';

/**
 * Classe para erros HTTP personalizados
 */
export class HttpError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

/**
 * Middleware para tratamento centralizado de erros
 */
export const errorMiddleware = (
  error: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Se for um HttpError, usa o status e mensagem definidos
    if (error instanceof HttpError) {
      return res.status(error.status).json({
        status: 'error',
        message: error.message
      });
    }

    // Registra o erro no console para depuração
    console.error('Erro não tratado:', error);

    // Para outros erros, retorna 500 Internal Server Error
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  } catch (err) {
    // Fallback para erros no próprio middleware de erro
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
}; 