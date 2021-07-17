import express from "express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import schema from "../schema";
import server from "..";

const PORT = 8080;

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });
  // Set up subscription server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );
  // Listen for signals to close subscription server
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
      subscriptionServer.close();
      httpServer.close();
      process.exit(0);
    });
  });

  await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));
  return `http://localhost:${PORT}${server.graphqlPath}`;
};

startServer()
  .then((url) => {
    console.log(`Server is now listening on ${url}`);
  })
  .catch(console.log);
