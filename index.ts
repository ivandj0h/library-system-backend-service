import dotenv from "dotenv";
import { createServer } from "http";
import { AddressInfo } from "net";
import App from "@/app";

dotenv.config();

const appInstance = new App();
const port = Number(process.env.SERVICE_PORT) || 9000;

const server = createServer(appInstance.app);

const handleError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") throw error;

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const handleListening = (): void => {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(
    `🚀 Server is up and running at http://localhost:${addr.port}${
      process.env.BASE_URL || "/api/v1"
    }`
  );
};

server.listen(port);
server.on("error", handleError);
server.on("listening", handleListening);
