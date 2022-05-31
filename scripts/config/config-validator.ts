#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";

import { Validator } from "jsonschema";
import { encrypt, fileArgParser } from "./config-functions";
import { unlink } from "fs";

// returns result back to stdout for further processing
process.stdout.write(validateConfig().toString());

function validateConfig() {
  // read config file
  const file = fileArgParser();

  // check if json structure is as expected
  const appConfigFilePath = path.join(
    process?.env?.["INIT_CWD"] as string,
    file
  );
  try {
    const appConfig = fs.readFileSync(appConfigFilePath, "utf8");

    const v = new Validator();

    const jsonCfg = JSON.parse(appConfig);
    const maybeValid = v.validate(jsonCfg, schema());

    if (maybeValid.valid) {
      // everything fine
      console.log("Provided config file looks good. Thank you!");
      return 0;
    } else {
      console.warn(
        "Config does not match expected encrypted config data structure." +
          "Trying replace provided file with encrypted one ..."
      );

      const encryptionKey = process.env["ENCRYPTION_KEY"] as string;
      const encryptedConfigJsonString = encrypt(encryptionKey, file);

      if (encryptedConfigJsonString) {
        try {
          deleteFile(file);
        } catch (e) {
          console.error("Cannot delete file '" + file + "'. Exiting!", e);
          return 1;
        }
        try {
          writeFile(encryptedConfigJsonString, file);
        } catch (e) {
          console.error(
            "Cannot write encrypted file '" + file + "'. Exiting!",
            e
          );
          return 1;
        }
        return 0;
      } else {
        console.error(
          "Cannot write encrypted file - content is empty. Exiting!"
        );
        return 1;
      }
    }
  } catch (e) {
    console.error(
      "Cannot read file from '" + appConfigFilePath + "'. Exiting!",
      e
    );
    return 1;
  }
}

function deleteFile(filePath: string): void {
  return unlink(filePath, (err) => {
    if (err) throw err;
    console.log("Deleted unencrypted file!");
  });
}

function writeFile(content: string, filePath: string): void {
  return fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log("Created encrypted file @ " + filePath + "!");
  });
}

function schema() {
  return {
    type: "object",
    properties: {
      data: {
        type: "string",
      },
    },
    required: ["data"],
  };
}
