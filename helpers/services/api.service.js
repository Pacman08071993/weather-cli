import axios from "axios";
import { getKeyValue } from "./storage.service.js";
import { TOKEN_DICTIONARY } from "../../weather.js";

export const getCiyCodeByName = async (city, token) => {
  try {
    const { data } = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: city,
          appid: token,
        },
      }
    );

    return { lat: data[0].lat, lon: data[0].lon };
  } catch (e) {
    throw e;
  }
};

export const getWeatherByCity = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error(
      "token is not passed, please pass it at startup on the command line"
    );
  }

  const city = process.env.City ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  const coords = await getCiyCodeByName(city, token);

  if (!coords?.lat || !coords?.lon) {
    throw new Error("city is not passed");
  }

  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: coords?.lat,
          lon: coords?.lon,
          appid: token,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
