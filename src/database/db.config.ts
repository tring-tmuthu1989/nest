import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { registerAs } from "@nestjs/config";
import { config } from 'dotenv';
config()
const configService = new ConfigService();



export default registerAs("typeOrmConfig", async () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  let data;
  data = {
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    database: configService.get<string>('DATABASE_NAME'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    entities: [join(__dirname, '..', '..', '**', '**','*.entity.{ts,js}')],
    migrations: [join(__dirname, 'database','/migrations','*.{ts,js}')],
    migrationsTableName: 'typeorm_migrations',
  };
  console.log(data)
  return {
    type: 'postgres',
    ...data,
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/../migrations',
    },
    synchronize: false,
    logging: !!process.env.DB_LOGGING,
    pool: {
      max: 25,
      min: 1,
      maxWaitingClients: 10,
      idleTimeoutMillis: 300000,
    },
  };
});
