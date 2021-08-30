import express from "express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import * as ngrok from "ngrok";
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

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  return `http://localhost:${PORT}${server.graphqlPath}`;
};

startServer()
  .then((url) => {
    console.log(`Server is now listening on ${url}`);
  })
  .catch(console.log);

if (process.env.NODE_ENV === "development") {
  ngrok
    .connect({
      proto: "http",
      addr: PORT,
    })
    .then((url) => {
      console.log(`Serving ngrok at: ${url}/graphql`);
    })
    .catch((err) => {
      console.error("Errror while connecting Ngrok", err);
      return new Error("Ngrok Failed!");
    });
}
