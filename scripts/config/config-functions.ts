import * as CryptoJS from "crypto-js";
import * as path from "path";
import * as fs from "fs";
import yargs from "yargs";
import * as dotenv from "dotenv";

export function fileArgParser(): string {
  return yargs(process.argv.slice(2))
    .options({
      file: { type: "string", demandOption: true },
    })
    .parseSync().file;
}

export function encrypt(encryptionKey: string, file: string) {
  dotenv.config();
  if (encryptionKey) {
    const appConfig = readFileAsString(file);
    const encryptedAppConfig = CryptoJS.AES.encrypt(
      appConfig,
      encryptionKey
    ).toString();

    return JSON.stringify({ data: encryptedAppConfig });
  } else {
    console.error(
      "No encryption key provided! Please set env variable 'ENCRYPTION_KEY'!"
    );
    return undefined;
  }
}

export function readFileAsString(file: string) {
  const appConfigFilePath = path.join(
    process?.env?.["INIT_CWD"] as string,
    file
  );
  // todo try catch for readFileSync
  const appConfig = fs.readFileSync(appConfigFilePath, "utf8");
  return appConfig;
}
