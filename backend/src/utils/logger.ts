import winston from 'winston';
import path from 'path';

// Define os níveis de log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define as cores para cada nível
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Define o nível de log com base no ambiente
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'info';
};

// Adiciona as cores ao winston
winston.addColors(colors);

// Define o formato do log
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define os transportes (onde os logs serão armazenados)
const transports = [
  // Console
  new winston.transports.Console(),
  
  // Arquivo de erros
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
  }),
  
  // Arquivo com todos os logs
  new winston.transports.File({ 
    filename: path.join('logs', 'all.log') 
  }),
];

// Cria o logger
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger; 