import 'reflect-metadata';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { TimeRecord } from '../models/TimeRecord';

async function checkDatabase() {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida');

    // Verifica se a tabela users existe
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    console.log('Usuários encontrados:', users.length);
    console.log('Usuários:', users);

    // Verifica se a tabela time_records existe
    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    const timeRecords = await timeRecordRepository.find();
    console.log('Registros de ponto encontrados:', timeRecords.length);
    console.log('Registros de ponto:', timeRecords);

    console.log('Script executado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar script:', error);
    process.exit(1);
  }
}

checkDatabase(); 