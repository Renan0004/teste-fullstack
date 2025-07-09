import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controle de Ponto',
      version: '1.0.0',
      description: 'API para controle de ponto de colaboradores',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        TimeRecord: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do registro de ponto'
            },
            entry_time: {
              type: 'string',
              format: 'date-time',
              description: 'Horário de entrada'
            },
            exit_time: {
              type: 'string',
              format: 'date-time',
              description: 'Horário de saída',
              nullable: true
            },
            total_minutes: {
              type: 'integer',
              description: 'Total de minutos trabalhados',
              nullable: true
            },
            total_seconds: {
              type: 'integer',
              description: 'Segundos adicionais trabalhados',
              nullable: true
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do usuário'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário'
            },
            code: {
              type: 'string',
              description: 'Código do usuário'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do usuário'
            }
          }
        },
        TimeRecordDto: {
          type: 'object',
          properties: {
            userCode: {
              type: 'string',
              description: 'Código do usuário'
            }
          },
          required: ['userCode']
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'Erro interno do servidor'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['O código do usuário é obrigatório']
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'] // Caminho para os arquivos com anotações JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 