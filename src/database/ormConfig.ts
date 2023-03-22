import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfiguration from './db.config';
ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});
const dataSourceConfig = async () => {
  return new DataSource(await dbConfiguration());
};
export default dataSourceConfig();
