import { config } from "dotenv";
import { writeFile } from "fs/promises";
import path from "path";

const initOrmConfig = async () => {
  config();

  const isDev = process.env.NODE_ENV === "development";
  const dir = isDev ? "src" : "dist";
  const ext = isDev ? "ts" : "js";

  const opt = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [`${dir}/db/entities/*.entity.${ext}`],
    migrations: [`${dir}/db/migrations/*.${ext}`],
    cli: {
      migrationsDir: `${dir}/db/migrations`,
    },
    // extra: { ssl: { rejectUnauthorized: false } },
    synchronize: true,
  };

  await writeFile(path.resolve("ormconfig.json"), JSON.stringify(opt, null, 4));
};

initOrmConfig().then(() => console.log("ormconfig.json have been generated"));
