import * as dotenv from "dotenv";
dotenv.config();
export const jwt={
  acsses:process.env.ACSESS_TOKEN,
  refresh:process.env.REFRESH_TOKEN,
  salt:process.env.SALT
}