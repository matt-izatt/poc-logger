import winston from "winston";

// Constants
const logColours = {
  error: "\x1b[31m",
  info: "\x1b[32m",
  debug: "\x1b[34m",
  silly: "\x1b[35m",
  timestamp: "\x1b[36m",
  reset: "\x1b[0m"
};


// Formats
function formatTimestamp(timestamp) {
  return logColours.timestamp + timestamp.toLocaleTimeString() + logColours.reset;
}

function formatLogLevel(level) {
  return logColours[level] + level.toUpperCase() + logColours.reset;
}

function padLeft(string, padding) {
  const replaceValue = "\n".padEnd(padding, " ");
  const newString = string.padStart(string.length + padding - 1, " ") 
  return newString.replace(/\n/g, replaceValue);
}

function formatStackTrace(stack) {
  return stack ? "\n\n" + padLeft(stack, 20) + "\n" : "";
}

function formatMetadata(data) {
  const formattedData = data.meta && JSON.stringify(data.meta, null, 2);
  return data.meta ? "\n\n" + padLeft(formattedData, 20) + "\n" : "";
}

const consoleFormat = winston.format.printf(({ level, message, stack, ...meta }) => {
  const padding = level === "info" ? " " : "";
  const timestamp = formatTimestamp(new Date());
  const logLevel = formatLogLevel(level);
  const stackTrace = formatStackTrace(stack);
  const metadata = formatMetadata(meta);

  return `[${timestamp}] [${logLevel}] ${padding}${message} ${stackTrace} ${metadata}`;
});


// Transports
export const cloudWatchTransport = new winston.transports.File({
  filename: "logs/cloudwatch.log",
  level: "info",
  format: winston.format.json()
});

export const fileTransport = new winston.transports.File({
  filename: "logs/file.log",
  level: "info",
  format: winston.format.json()
});

export const consoleTransport = new winston.transports.Console({
  level: "debug",
  format: consoleFormat
});
