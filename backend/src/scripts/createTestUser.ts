import 'reflect-metadata';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { TimeRecord } from '../models/TimeRecord';
import { Between } from 'typeorm';

async function createTestUser() {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida');

    // Cria a extensão uuid-ossp se não existir
    await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('Extensão uuid-ossp verificada');

    // Verifica se o usuário já existe
    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOne({ where: { code: '4SXXFMF' } });

    if (!user) {
      // Cria o usuário
      user = userRepository.create({
        code: '4SXXFMF',
        name: 'Usuário de Teste'
      });
      await userRepository.save(user);
      console.log('Usuário criado:', user);
    } else {
      console.log('Usuário já existe:', user);
    }

    // Cria um registro de ponto para o usuário
    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    
    // Verifica se já existe um registro para hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const existingRecord = await timeRecordRepository.findOne({
      where: {
        user_id: user.id,
        entry_time: Between(today, tomorrow)
      }
    });

    if (!existingRecord) {
      // Cria um novo registro de ponto
      const timeRecord = timeRecordRepository.create({
        user_id: user.id,
        entry_time: new Date()
      });
      await timeRecordRepository.save(timeRecord);
      console.log('Registro de ponto criado:', timeRecord);
    } else {
      console.log('Já existe um registro de ponto para hoje:', existingRecord);
    }

    console.log('Script executado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar script:', error);
    process.exit(1);
  }
}

createTestUser(); 