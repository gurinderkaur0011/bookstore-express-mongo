import logger from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";


const stream = pretty({
    customPrettifiers: {
        time: () => `[${dayjs().format()}]`,
      }
  });

const log = logger(stream);

export default log;