import { envs } from '../../config';
import { MongoDatabase } from '../mongo/database';

(async () => {
  MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  await main();

  await MongoDatabase.disconnect();
})();

async function main() {
  //* crear users
  //* categories
  //* products

  console.log('Seeded');
}
