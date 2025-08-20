import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import env from "env-var";

export default {
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  PORT: env.get("PORT").required().asPortNumber(),
};
