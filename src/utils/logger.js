import bunyan from "bunyan";
import { defaultLoggingLevel } from "../config";

const createLogger = ({ name, level, ...rest }) =>
  bunyan.createLogger({
    name,
    level: level ?? defaultLoggingLevel,
    ...rest,
  });

export default createLogger;
