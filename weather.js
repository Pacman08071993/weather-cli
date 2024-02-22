#!/ust/bin/env node

import { getArgs } from "./helpers/args.js";
import {
  printSucces,
  printError,
  printHelp,
  printWeather,
} from "./helpers/services/log.service.js";
import { saveKeyValue } from "./helpers/services/storage.service.js";
import { getWeatherByCity } from "./helpers/services/api.service.js";

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const getForcast = async () => {
  try {
    const weather = await getWeatherByCity(process.env.City);
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("wrong city");
      return;
    }

    if (e?.response?.status === 401) {
      printError("wrong token");
      return;
    }

    printError(e.message);
  }
};

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token failed");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSucces("Token has been saved");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("city failed");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSucces("city has been saved");
  } catch (e) {
    printError(e.message);
  }
};

function init() {
  const args = getArgs(process.argv);
  if (args.t) {
    saveToken(args.t);
    return;
  }

  if (args.h) {
    printHelp();
    return;
  }

  if (args.s) {
    saveCity(args.s);
    return;
  }

  getForcast();
}

init();
