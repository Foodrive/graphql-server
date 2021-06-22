import bunyan from "bunyan";
import { defaultLoggingLevel } from "../config";

const createLogger = ({ name, level, ...rest }) =>
  bunyan.createLogger({
    name,
    level: defaultLoggingLevel ?? level,
    ...rest,
  });

export default createLogger;
