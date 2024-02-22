import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const isExist = async (filePath) => {
  try {
    await promises.stat(filePath);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  try {
    let data = {};
    if (await isExist(filePath)) {
      const file = await promises.readFile(filePath);
      data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
};
