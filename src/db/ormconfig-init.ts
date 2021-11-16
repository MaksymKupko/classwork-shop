import { config } from "dotenv";
import { writeFile } from "fs/promises";
import path from "path";

const initOrmConfig = async () => {
  config();

  const env = process.env.ENV;
  const dir = env === "DEV" ? "src" : "dist/src";

  const opt = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [`${dir}/**/entities/*.entity{.ts, .js}`],
    migrations: [`${dir}/**/migrations/*.entity{.ts, .js}`],
    migrationsDir: `${dir}/**/migrations`,
  };
  console.log(path.join(__dirname, "../../"));
  await writeFile(path.join(__dirname, "../../ormconfig.json"), JSON.stringify(opt, null, 4));
};

initOrmConfig().then(() => console.log("ormconfig.json have been generated"));
