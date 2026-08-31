import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Entities from './entities';
import * as fs from 'fs';
import { IDbOptions } from '../../common';

const DB_PORT = 5432;

export const generateDataSourceOptions = (
  options?: IDbOptions,
): DataSourceOptions => {
  const sslEnabled = options?.sslEnable ?? process.env.DB_SSL === 'true';
  const sslCertPath = options?.sslCert ?? process.env.DB_SSL_CA;

  const dataSource: DataSourceOptions = {
    type: 'postgres',
    host: options?.host ?? process.env.DB_HOST ?? 'localhost',
    port: options?.port ?? (parseInt(process.env.DB_PORT || '', 10) || DB_PORT),
    username: options?.username ?? process.env.DB_USER ?? 'postgres',
    password: options?.password ?? process.env.DB_PASS ?? 'postgres',
    database: options?.database ?? process.env.DB_NAME ?? 'core_db',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true,
    entities: [...Entities],
    migrations: [__dirname + '/migrations/*-migration{.ts,.js}'],
    migrationsTransactionMode: 'each',
    ssl: sslEnabled
      ? {
          rejectUnauthorized: true,
          ca: sslCertPath ? fs.readFileSync(sslCertPath, 'utf8') : undefined,
        }
      : false,
  };
  return dataSource;
};

export default new DataSource(generateDataSourceOptions());
