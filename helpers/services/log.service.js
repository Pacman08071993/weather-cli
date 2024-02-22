import chalk from "chalk";
import dedent from "dedent";

export const printError = (error) => {
  console.log(`${chalk.bgRed("ERROR")} ${error}`);
};

export const printSucces = (msgSuccess) => {
  console.log(`${chalk.bgGreen("SUCCESS")} ${msgSuccess}`);
};

export const printHelp = () => {
  console.log(
    dedent(`
    ${chalk.bgCyan(" HELP ")}
    -h - for pring help
    -s - for print weather
    -t - [API_KEY] for save TOKEN
    `)
  );
};

export const printWeather = (weather) => {
  console.log(
    dedent(`
    ${chalk.gray("Город")} - ${chalk.bgGreen(weather.name)}
    ${chalk.gray("Скорость ветра")} - ${chalk.bgGray(weather.wind.speed)}
    ${chalk.gray("Минимальная темп")} - ${chalk.bgCyanBright(
      weather.main.temp_min
    )}
    ${chalk.gray("Максимальная темп")} - ${chalk.bgRed(weather.main.temp_max)}
    `)
  );
};
