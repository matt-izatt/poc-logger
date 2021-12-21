import winston from "winston";
import { cloudWatchTransport, fileTransport, consoleTransport } from "./logger.js";

// Create logger
const logger = winston.createLogger();

logger.add(cloudWatchTransport);
logger.add(fileTransport);
logger.add(consoleTransport);


// Test logger
class ServerError extends Error {
  constructor(message) {
    super(message);
    this.id = Date.now();
    this.httpCode = 500;
  }
}


logger.error("UserCreateFail", new ServerError());
logger.info("UserCreateSuccess", {meta: {
  id: "0001",
  createdAt: new Date().toISOString()
}});
logger.debug("This is just a message with no metadata");

const myObject = {
  first: "property",
  second: {
    nested: "property"
  }
};

logger.log({
  level: "info",
  message: "MyObject:",
  uuid: "1111111",
  sessionId: "000001",
  meta: myObject
});

const myList = [
  {
    name: "Bob"
  },
  {
    name: "Alice"
  },  
  {
    name: "Jeremy"
  }
];

logger.log({
  level: "info",
  message: "MyList:",
  uuid: "1111111",
  sessionId: "000001",
  meta: myList
});