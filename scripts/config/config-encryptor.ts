import * as dotenv from "dotenv";
import { fileArgParser, encrypt } from "./config-functions";

dotenv.config();
const encryptionKey = process.env["ENCRYPTION_KEY"] as string;
console.log(encrypt(encryptionKey, fileArgParser()));
