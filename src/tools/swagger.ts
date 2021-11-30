import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { EnvConfig } from "../config";

export const swagger = (routePath = "/api/docs") => {
  const router = Router();

  const swaggerJSON = readFileSync(path.resolve("swagger.json"), "utf-8");

  const swaggerObject = JSON.parse(swaggerJSON);

  swaggerObject.servers = [{ url: `http://localhost:${EnvConfig.PORT}` }, { url: EnvConfig.HEROKU_URL }];

  router.get("/", async (req: Request, res: Response) => {
    res.redirect(routePath);
  });

  router.use(routePath, swaggerUi.serve, swaggerUi.setup(swaggerObject));

  console.log("swagger setup");

  return router;
};
