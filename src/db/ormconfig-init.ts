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
    entities: [`${dir}/**/entities/*.entity.${ext}`],
    migrations: [`${dir}/**/migrations/*.${ext}`],
    cli: {
      migrationsDir: `${dir}/db/migrations`,
    },
    extra: { ssl: { rejectUnauthorized: false } },
  };
  console.log(path.join(__dirname, "../../"));
  await writeFile(path.join(__dirname, "../../ormconfig.json"), JSON.stringify(opt, null, 4));
};

initOrmConfig().then(() => console.log("ormconfig.json have been generated"));
