import * as CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import { fileArgParser, readFileAsString } from "./config-functions";

dotenv.config();

const decryptionKey = process.env["DECRYPTION_KEY"] as string;

if (decryptionKey) {
  const appConfig = JSON.parse(readFileAsString(fileArgParser()));
  const decryptedCfg = CryptoJS.AES.decrypt(
    appConfig.data,
    decryptionKey
  ).toString(CryptoJS.enc.Utf8);

  console.log(JSON.stringify(decryptedCfg));
} else {
  console.error(
    "No encryption key provided! Please set env variable 'DECRYPTION_KEY'!"
  );
}
